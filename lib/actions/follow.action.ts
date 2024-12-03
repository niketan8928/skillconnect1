import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongoose";
import Follow from "@/database/follow.model";
import User from "@/database/user.model";

export async function followUser(followerId: string, followingId: string) {
  try {
    await connectToDatabase();

    // Prevent self-follow
    if (followerId === followingId) {
      throw new Error("Cannot follow yourself");
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existingFollow) {
      throw new Error("Already following this user");
    }

    // Create new follow relationship
    const newFollow = await Follow.create({
      follower: followerId,
      following: followingId,
    });

    // Increment followers count
    await User.findByIdAndUpdate(followingId, {
      $inc: { followersCount: 1 },
    });

    // Increment following count
    await User.findByIdAndUpdate(followerId, {
      $inc: { followingCount: 1 },
    });

    revalidatePath("/community");

    return newFollow;
  } catch (error: any) {
    console.error("Error following user:", error);
    throw new Error(`Failed to follow user: ${error.message}`);
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  try {
    await connectToDatabase();

    // Remove follow relationship
    const deletedFollow = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!deletedFollow) {
      throw new Error("Follow relationship not found");
    }

    // Decrement followers count
    await User.findByIdAndUpdate(followingId, {
      $inc: { followersCount: -1 },
    });

    // Decrement following count
    await User.findByIdAndUpdate(followerId, {
      $inc: { followingCount: -1 },
    });

    revalidatePath("/community");

    return deletedFollow;
  } catch (error: any) {
    console.error("Error unfollowing user:", error);
    throw new Error(`Failed to unfollow user: ${error.message}`);
  }
}

export async function checkFollowStatus(
  followerId: string,
  followingId: string
) {
  try {
    await connectToDatabase();

    const followRelationship = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    return !!followRelationship;
  } catch (error: any) {
    console.error("Error checking follow status:", error);
    throw new Error(`Failed to check follow status: ${error.message}`);
  }
}

export async function getUserFollowers(userId: string) {
  try {
    await connectToDatabase();

    const followers = await Follow.find({ following: userId }).populate({
      path: "follower",
      model: User,
      select: "_id name username image",
    });

    return followers.map((f) => f.follower);
  } catch (error: any) {
    console.error("Error getting user followers:", error);
    throw new Error(`Failed to get followers: ${error.message}`);
  }
}

export async function getUserFollowing(userId: string) {
  try {
    await connectToDatabase();

    const following = await Follow.find({ follower: userId }).populate({
      path: "following",
      model: User,
      select: "_id name username image",
    });

    return following.map((f) => f.following);
  } catch (error: any) {
    console.error("Error getting user following:", error);
    throw new Error(`Failed to get following: ${error.message}`);
  }
}
