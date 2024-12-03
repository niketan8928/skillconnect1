import { NextResponse } from "next/server";
import {
  followUser,
  unfollowUser,
  checkFollowStatus,
} from "@/lib/actions/follow.action";
import { getLoggedInUserDetails } from "@/app/(root)/profile/[id]/page";

export async function POST(request: Request) {
  try {
    const { followingId, action } = await request.json();
    const loggedInUser = await getLoggedInUserDetails();

    if (!loggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let result;
    if (action === "follow") {
      result = await followUser(loggedInUser.userId, followingId);
    } else if (action === "unfollow") {
      result = await unfollowUser(loggedInUser.userId, followingId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const followingId = searchParams.get("followingId");
    const loggedInUser = await getLoggedInUserDetails();

    if (!loggedInUser || !followingId) {
      return NextResponse.json(
        { error: "Unauthorized or Missing Parameters" },
        { status: 401 }
      );
    }

    const isFollowing = await checkFollowStatus(
      loggedInUser.userId,
      followingId
    );
    return NextResponse.json({ isFollowing });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
