// import Filter from "@/components/shared/Filter";
// import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import UserCard from "@/components/cards/UserCard";

// import { getAllUsers } from "@/lib/actions/user.action";

// import { UserFilters } from "@/constants/filters";

// import type { SearchParamsProps } from "@/types";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Community — skillconnect",
// };

// const Page = async ({ searchParams }: SearchParamsProps) => {
//   const result = await getAllUsers({
//     searchQuery: searchParams.q,
//     filter: searchParams.filter,
//     page: searchParams.page ? +searchParams.page : 1,
//   });

//   return (
//     <>
//       <h1 className="h1-bold text-dark100_light900">All Users</h1>

//       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
//         <LocalSearchbar
//           route="/community"
//           iconPosition="left"
//           imgSrc="/assets/icons/search.svg"
//           placeholder="Search for amazing minds"
//           otherClasses="flex-1"
//         />

//         <Filter
//           filters={UserFilters}
//           otherClasses="min-h-[56px] sm:min-w-[170px]"
//         />
//       </div>

//       <section className="mt-12 flex flex-wrap gap-4">
//         {result.users.length > 0 ? (
//           result.users.map((user: any) => (
//             <UserCard key={user._id} user={user} />
//           ))
//         ) : (
//           <NoResult
//             title="No Users Found"
//             description="Be the first to break the silence! 🚀 Signup to be the first and kickstart the community. Get involved! 💡"
//             link="/sign-up"
//             linkTitle="Sign Up"
//           />
//         )}
//       </section>

//       <div className="mt-10">
//         <Pagination
//           pageNumber={searchParams?.page ? +searchParams.page : 1}
//           isNext={result.isNext}
//         />
//       </div>
//     </>
//   );
// };

// export default Page;

// import { getLoggedInUserDetails } from "@/app/(root)/profile/[id]/page";

// import Filter from "@/components/shared/Filter";
// import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
// import UserCard from "@/components/cards/UserCard";

// import { getAllUsers } from "@/lib/actions/user.action";

// import { UserFilters } from "@/constants/filters";

// import type { SearchParamsProps } from "@/types";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Community — skillconnect",
// };

// const Page = async ({ searchParams }: SearchParamsProps) => {
//   const loggedInUser = await getLoggedInUserDetails();

//   const result = await getAllUsers({
//     searchQuery: searchParams.q,
//     filter: searchParams.filter,
//     page: searchParams.page ? +searchParams.page : 1,
//   });

//   return (
//     <>
//       <h1 className="h1-bold text-dark100_light900">All Users</h1>
//       {loggedInUser && (
//         <p className="text-sm text-gray-600">
//           Logged-in as: {loggedInUser.name} (User ID: {loggedInUser.userId})
//         </p>
//       )}

//       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
//         <LocalSearchbar
//           route="/community"
//           iconPosition="left"
//           imgSrc="/assets/icons/search.svg"
//           placeholder="Search for amazing minds"
//           otherClasses="flex-1"
//         />
//         <Filter
//           filters={UserFilters}
//           otherClasses="min-h-[56px] sm:min-w-[170px]"
//         />
//       </div>

//       {/* <section className="mt-12 flex flex-wrap gap-4">
//         {result.users.length > 0 ? (
//           result.users.map((user: any) => (
//             <UserCard key={user._id} user={user} />
//           ))
//         ) : (
//           <NoResult
//             title="No Users Found"
//             description="Be the first to break the silence! 🚀 Signup to be the first and kickstart the community. Get involved! 💡"
//             link="/sign-up"
//             linkTitle="Sign Up"
//           />
//         )}
//       </section> */}
//       <section className="mt-12 flex flex-wrap gap-4">
//         {result.users.length > 0 ? (
//           result.users.map((user: any) => (
//             <div key={user._id}>
//               <UserCard user={user} />
//               <p className="text-sm text-gray-500 mt-2">User ID: {user._id}</p>
//             </div>
//           ))
//         ) : (
//           <NoResult
//             title="No Users Found"
//             description="Be the first to break the silence! 🚀 Signup to be the first and kickstart the community. Get involved! 💡"
//             link="/sign-up"
//             linkTitle="Sign Up"
//           />
//         )}
//       </section>

//       {/* <h3>user_id={user_id}</h3> */}

//       <div className="mt-10">
//         <Pagination
//           pageNumber={searchParams?.page ? +searchParams.page : 1}
//           isNext={result.isNext}
//         />
//       </div>
//     </>
//   );
// };

// export default Page;

import { getLoggedInUserDetails } from "@/app/(root)/profile/[id]/page";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import UserCard from "@/components/cards/UserCard";

import { getAllUsers } from "@/lib/actions/user.action";
import { UserFilters } from "@/constants/filters";
import type { SearchParamsProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community — skillconnect",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const loggedInUser = await getLoggedInUserDetails();

  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      {loggedInUser && (
        <p className="text-sm text-gray-600">
          Logged-in as: {loggedInUser.name} (User ID: {loggedInUser.userId})
        </p>
      )}

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user: any) => (
            <UserCard
              key={user._id}
              user={user}
              currentUserId={loggedInUser?.userId}
            />
          ))
        ) : (
          <NoResult
            title="No Users Found"
            description="Be the first to break the silence! 🚀 Signup to be the first and kickstart the community. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign Up"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
