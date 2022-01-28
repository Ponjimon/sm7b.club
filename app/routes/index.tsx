import { useLoaderData } from 'remix';
import type { Env, LoaderFunction } from '../../types';

export const loader: LoaderFunction<
  EventContext<Env, any, any>,
  string[]
> = async ({ context }) => {
  return (await context.env.KV.get('channels', { type: 'json' })) as string[];
};

export default function Index() {
  const channels = useLoaderData<string[]>();
  return (
    <>
      {channels.map(channel => (
        <div key={channel}>{channel}</div>
      ))}
    </>
  );
}
