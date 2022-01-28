import { HeadersFunction, json } from '@remix-run/server-runtime';
import { useLoaderData } from 'remix';
import { ApiClient, HelixStream } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';

import type { LoaderFunction } from '../../types';

export const loader: LoaderFunction = async ({ context }) => {
  const {
    env: { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET },
  } = context;
  const twitch = new ApiClient({
    authProvider: new ClientCredentialsAuthProvider(
      TWITCH_CLIENT_ID,
      TWITCH_CLIENT_SECRET
    ),
  });
  const channels = (await context.env.KV.get('channels', {
    type: 'json',
  })) as string[];
  const { data } = await twitch.streams.getStreams({ userName: channels });

  return json(
    data.map(({ id, userName }) => ({ id, userName })),
    { headers: { 'Cache-Control': 'max-age=10' } }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  'Cache-Control': loaderHeaders.get('Cache-Control') ?? 'no-cache',
});

export default function Index() {
  const streams = useLoaderData<HelixStream[]>();

  return (
    <>
      {streams.map(({ id, userName }) => (
        <div key={id}>{userName}</div>
      ))}
    </>
  );
}
