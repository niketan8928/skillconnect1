// import Link from "next/link";
// import Image from "next/image";

// import { getTopInteractedTags } from "@/lib/actions/tag.action";

// import { Badge } from "@/components/ui/badge";
// import RenderTag from "@/components/shared/RenderTag";

// interface Props {
//   user: {
//     _id: string;
//     clerkId: string;
//     picture: string;
//     name: string;
//     username: string;
//   };
// }

// const UserCard = async ({ user }: Props) => {
//   const interactedTags = await getTopInteractedTags({
//     userId: user._id,
//   });

//   return (
//     <Link
//       href={`/profile/${user.clerkId}`}
//       className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
//     >
//       <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
//         <Image
//           src={user.picture}
//           alt="User profile picture"
//           width={100}
//           height={100}
//           className="rounded-full"
//         />
//         <div className="mt-4 text-center">
//           <h3 className="h3-bold text-dark200_light900 line-clamp-1">
//             {user.name}
//           </h3>
//           <p className="body-regular text-dark500_light500 mt-2">
//             @{user.username}
//           </p>
//         </div>

//         <div className="mt-5">
//           {interactedTags.length > 0 ? (
//             <div className="flex items-center gap-2">
//               {interactedTags.map((tag: any) => (
//                 <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
//               ))}
//             </div>
//           ) : (
//             <Badge>No tags yet</Badge>
//           )}
//         </div>
//       </article>
//     </Link>
//   );
// };

// export default UserCard;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    username: string;
    image: string;
    followersCount?: number;
  };
  currentUserId?: string;
}

const UserCard: React.FC<UserCardProps> = ({ user, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    async function checkFollow() {
      if (currentUserId && currentUserId !== user._id) {
        try {
          const response = await fetch(`/api/follow?followingId=${user._id}`);
          const data = await response.json();
          setIsFollowing(data.isFollowing);
        } catch (error) {
          console.error("Error checking follow status:", error);
        }
      }
    }
    checkFollow();
  }, [currentUserId, user._id]);

  const handleFollow = async () => {
    if (!currentUserId || currentUserId === user._id) return;

    setIsLoading(true);
    try {
      const action = isFollowing ? "unfollow" : "follow";
      const response = await fetch("/api/follow", {
        method: "POST",
        body: JSON.stringify({
          followingId: user._id,
          action,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFollowing(!isFollowing);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <div className="background-light800_dark400 flex flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900">{user.name}</h3>
          <p className="body-regular text-dark500_light500">@{user.username}</p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="flex flex-col items-center">
              <span className="small-medium text-dark400_light800">
                Followers
              </span>
              <span className="small-medium text-dark400_light800">
                {user.followersCount || 0}
              </span>
            </div>
          </div>

          {currentUserId && currentUserId !== user._id && (
            <button
              className={`${
                isFollowing
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary-500 hover:bg-primary-600"
              } mt-4 w-full rounded-lg px-4 py-2 text-white transition-colors`}
              onClick={handleFollow}
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : isFollowing
                  ? "Unfollow"
                  : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
