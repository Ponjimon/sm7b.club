import { NextApiRequest, NextApiResponse } from 'next';
import {
  InteractionResponseType,
  InteractionType,
  verifyKey as verifyDiscordKey,
} from 'discord-interactions';

export const verifyKey = (clientPublicKey: string) => (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise<void>(next => {
    const timestamp =
      (req.headers['X-Signature-Timestamp'] as string) ||
      (req.headers['x-signature-timestamp'] as string) ||
      '';
    const signature =
      (req.headers['X-Signature-Ed25519'] as string) ||
      (req.headers['x-signature-ed25519'] as string) ||
      '';

    function onBodyComplete(
      rawBody: string | Uint8Array | ArrayBuffer | Buffer
    ) {
      let fail = false;
      try {
        fail = !verifyDiscordKey(
          rawBody,
          signature,
          timestamp,
          clientPublicKey
        );
      } catch (e) {
        console.warn('E', e);
        fail = true;
      }
      if (fail) {
        res.statusCode = 401;
        console.warn('[discord-interactions] Invalid signature');
        res.end('[discord-interactions] Invalid signature');
        return;
      }
      const body = JSON.parse(rawBody.toString('utf-8')) || {};
      if (body.type === InteractionType.PING) {
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            type: InteractionResponseType.PONG,
          })
        );
        return;
      }
      req.body = body;
      next();
    }

    if (req.body) {
      if (Buffer.isBuffer(req.body)) {
        onBodyComplete(req.body);
      } else if (typeof req.body === 'string') {
        onBodyComplete(Buffer.from(req.body, 'utf-8'));
      } else {
        console.warn(
          '[discord-interactions]: req.body was tampered with, probably by some other middleware. We recommend disabling middleware for interaction routes so that req.body is a raw buffer.'
        );
        // Attempt to reconstruct the raw buffer. This works but is risky
        // because it depends on JSON.stringify matching the Discord backend's
        // JSON serialization.
        onBodyComplete(Buffer.from(JSON.stringify(req.body), 'utf-8'));
      }
    } else {
      const chunks = [];
      req.on('data', chunk => {
        chunks.push(chunk);
      });
      req.on('end', () => {
        const rawBody = Buffer.concat(chunks);
        onBodyComplete(rawBody);
      });
    }
  });
};
