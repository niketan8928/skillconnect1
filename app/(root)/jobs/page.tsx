// import Filter from "@/components/shared/Filter";
// import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

// import JobFilters from "@/components/shared/Filters";
// import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
// import JobCard from "@/components/cards/JobCard";

// import { getCountryFilters, getJobs } from "@/lib/actions/job.action";

// import { JobPageFilters } from "@/constants/filters";

// import type { SearchParamsProps } from "@/types";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Jobs — skillconnect",
// };

// const Page = async ({ searchParams }: SearchParamsProps) => {
//   const CountryFilters = await getCountryFilters();

//   const result = await getJobs({
//     searchQuery: searchParams.q,
//     filter: searchParams.filter,
//     location: searchParams.location,
//     remote: searchParams.remote,
//     page: searchParams.page ? +searchParams.page : 1,
//     wage: searchParams.wage,
//     skills: searchParams.skills,
//   });

//   return (
//     <>
//       <h1 className="h1-bold text-dark100_light900">Jobs</h1>

//       <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
//         <LocalSearchbar
//           route="/jobs"
//           iconPosition="left"
//           imgSrc="/assets/icons/search.svg"
//           placeholder="Job Title, Company, or Keywords"
//           otherClasses="flex-1"
//         />
//         {CountryFilters && (
//           <Filter
//             filters={CountryFilters}
//             otherClasses="min-h-[56px] sm:min-w-[170px]"
//             jobFilter
//           />
//         )}
//       </div>

//       <JobFilters filters={JobPageFilters} jobFilter />

//       <div className="mt-10 flex w-full flex-col gap-6">
//         {result.data.length > 0 ? (
//           result.data.map((jobItem: any) => (
//             <JobCard
//               key={jobItem.job_id}
//               title={jobItem.job_title}
//               description={jobItem.job_description}
//               city={jobItem.job_city}
//               state={jobItem.job_state}
//               country={jobItem.job_country}
//               requiredSkills={jobItem.job_required_skills?.slice(0, 5) || []}
//               applyLink={jobItem.job_apply_link}
//               employerLogo={jobItem.employer_logo}
//               employerName={jobItem.employer_name}
//               employerWebsite={jobItem.employer_website}
//               employmentType={jobItem.job_employment_type?.toLowerCase()}
//               isRemote={jobItem.job_is_remote}
//               salary={{
//                 min: jobItem.job_min_salary,
//                 max: jobItem.job_max_salary,
//                 currency: jobItem.job_salary_currency,
//                 period: jobItem.job_salary_period,
//               }}
//               postedAt={jobItem.job_posted_at_datetime_utc}
//             />
//           ))
//         ) : (
//           <NoResult
//             title="No Jobs Found"
//             description="We couldn't find any jobs matching your search 🤔"
//             link="/jobs"
//             linkTitle="Explore Jobs"
//           />
//         )}
//       </div>

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

// "use client";

// import { useState, useEffect } from "react";

// const AdminDashboard = () => {
//   const [todos, setTodos] = useState<{ _id: string; task: string }[]>([]);
//   const [newTodo, setNewTodo] = useState("");

//   const fetchTodos = async () => {
//     const response = await fetch("/api/todos");
//     const data = await response.json();
//     setTodos(data);
//   };

//   const addTodo = async () => {
//     if (newTodo.trim()) {
//       const response = await fetch("/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ task: newTodo }),
//       });
//       const data = await response.json();
//       setTodos((prev) => [...prev, data]);
//       setNewTodo("");
//     }
//   };

//   const deleteTodo = async (id: string) => {
//     await fetch("/api/todos", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     setTodos((prev) => prev.filter((todo) => todo._id !== id));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div style={{ maxWidth: "600px", margin: "50px auto" }}>
//       <h2>Admin Dashboard - To-Do List</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter a new task"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//         />
//         <button onClick={addTodo}>Add Task</button>
//       </div>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo._id}>
//             {todo.task}
//             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;

"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [todos, setTodos] = useState<{ _id: string; task: string }[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTodo }),
      });
      const data = await response.json();
      setTodos((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const deleteTodo = async (id: string) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard - To-Do List
      </h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded-md"
          >
            <span className="text-gray-800">{todo.task}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
