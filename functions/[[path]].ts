import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// @ts-ignore
import * as build from '../build';
import type { Env } from '../types';

const handleRequest = createPagesFunctionHandler<Env>({
  build,
  getLoadContext: context => context,
});

export function onRequest(context: EventContext<Env, any, any>) {
  return handleRequest(context);
}
