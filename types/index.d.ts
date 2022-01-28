/**
 * Utility types that enhance the default Remix types by making them generic
 */
import type { Params } from 'react-router-dom';

declare interface DataFunctionArgs<Context = any> {
  requuest: Request;
  context: Context;
  params: Params;
}

declare type LoaderFunction<
  Context = EventContext<Env, any, any>,
  AppData = any
> = (
  args: DataFunctionArgs<Context>
) => Promise<Response> | Response | Promise<AppData> | AppData;

declare interface Env {
  KV: KVNamespace;
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
}
