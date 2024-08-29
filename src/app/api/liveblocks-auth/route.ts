import env from "@/env";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: env.liveBlocks.commentSecret,
});

export async function POST(request: Request) {
  // Get the current user from your database
  const user = await currentUser();

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress!,
  );

  const {searchParams} = new URL(request?.url);

  const roomid = searchParams.get("roomId");
  session.allow(roomid!, session.FULL_ACCESS)

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}