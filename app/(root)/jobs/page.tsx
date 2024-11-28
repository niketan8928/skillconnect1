"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [todos, setTodos] = useState<
    { _id: string; name: string; title: string; desc: string }[]
  >([]);
  // const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  // const addTodo = async () => {
  //   if (newTodo.trim()) {
  //     const response = await fetch("/api/todos", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name: newTodo, title: newTodo, desc: newTodo }),
  //     });
  //     const data = await response.json();
  //     setTodos((prev) => [...prev, data]);
  //     setNewTodo("");
  //   }
  // };

  // const deleteTodo = async (id: string) => {
  //   await fetch("/api/todos", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id }),
  //   });
  //   setTodos((prev) => prev.filter((todo) => todo._id !== id));
  // };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Jobs Listing
      </h2>
      {/* <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter a new name"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add name
        </button>
      </div> */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between p-3 bg-gray-100 border border-gray-200 rounded-md"
          >
            <h2 className="text-lg font-bold">{todo.name}</h2>
            <h4 className="text-sm text-gray-600 mt-1">{todo.title}</h4>
            <h4 className="text-sm text-gray-600 mt-1">{todo.desc}</h4>
            <button className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
              Apply
            </button>

            {/* <button
              onClick={() => deleteTodo(todo._id)}
              className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
            >
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
