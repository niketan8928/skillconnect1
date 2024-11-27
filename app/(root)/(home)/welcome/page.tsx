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
//     <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//         Admin Dashboard - To-Do List
//       </h2>
//       <div className="flex space-x-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter a new task"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={addTodo}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//         >
//           Add Task
//         </button>
//       </div>
//       <ul className="space-y-2">
//         {todos.map((todo) => (
//           <li
//             key={todo._id}
//             className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded-md"
//           >
//             <span className="text-gray-800">{todo.task}</span>
//             <button
//               onClick={() => deleteTodo(todo._id)}
//               className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;

"use client";

import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [todos, setTodos] = useState<{ _id: string; task: string }[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{
    _id: string;
    task: string;
  } | null>(null);

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

  const updateTodo = async () => {
    if (editingTodo && editingTodo.task.trim()) {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingTodo._id, task: editingTodo.task }),
      });
      const data = await response.json();

      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === data._id ? { ...todo, task: data.task } : todo
          )
        );
        setEditingTodo(null); // Clear the editing state after saving
      } else {
        console.error(data.error || "Failed to update task");
      }
    }
  };

  const handleEdit = (todo: { _id: string; task: string }) => {
    setEditingTodo(todo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard - To-Do List
      </h2>

      {/* Add new task section */}
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

      {/* Edit task section */}
      {editingTodo && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">Edit Task</h3>
          <input
            type="text"
            value={editingTodo.task}
            onChange={(e) =>
              setEditingTodo({ ...editingTodo, task: e.target.value })
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={updateTodo}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      )}

      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded-md"
          >
            <span className="text-gray-800">{todo.task}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(todo)}
                className="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
