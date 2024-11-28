// "use client";

// import { useState, useEffect } from "react";

// const AdminDashboard = () => {
//   const [todos, setTodos] = useState<{ _id: string; name: string }[]>([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState<{
//     _id: string;
//     name: string;
//   } | null>(null);

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
//         body: JSON.stringify({ name: newTodo }),
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

//   const updateTodo = async () => {
//     if (editingTodo && editingTodo.name.trim()) {
//       const response = await fetch("/api/todos", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: editingTodo._id, name: editingTodo.name }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setTodos((prev) =>
//           prev.map((todo) =>
//             todo._id === data._id ? { ...todo, name: data.name } : todo
//           )
//         );
//         setEditingTodo(null); // Clear the editing state after saving
//       } else {
//         console.error(data.error || "Failed to update name");
//       }
//     }
//   };

//   const handleEdit = (todo: { _id: string; name: string }) => {
//     setEditingTodo(todo);
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//         Admin Dashboard - To-Do List
//       </h2>

//       {/* Add new name section */}
//       <div className="flex space-x-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter a new name"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={addTodo}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//         >
//           Add name
//         </button>
//       </div>

//       {/* Edit name section */}
//       {editingTodo && (
//         <div className="mb-4">
//           <h3 className="font-semibold text-lg text-gray-700">Edit name</h3>
//           <input
//             type="text"
//             value={editingTodo.name}
//             onChange={(e) =>
//               setEditingTodo({ ...editingTodo, name: e.target.value })
//             }
//             className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={updateTodo}
//             className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//           >
//             Save
//           </button>
//         </div>
//       )}

//       {/* Todo list */}
//       <ul className="space-y-2">
//         {todos.map((todo) => (
//           <li
//             key={todo._id}
//             className="flex justify-between items-center p-3 bg-gray-100 border border-gray-200 rounded-md"
//           >
//             <span className="text-gray-800">{todo.name}</span>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => handleEdit(todo)}
//                 className="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteTodo(todo._id)}
//                 className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
//               >
//                 Delete
//               </button>
//             </div>
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
  const [todos, setTodos] = useState<
    { _id: string; name: string; title: string; desc: string }[]
  >([]);
  const [newTodo, setNewTodo] = useState({ name: "", title: "", desc: "" });
  const [editingTodo, setEditingTodo] = useState<{
    _id: string;
    name: string;
    title: string;
    desc: string;
  } | null>(null);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (newTodo.name.trim() && newTodo.title.trim()) {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos((prev) => [...prev, data]);
      setNewTodo({ name: "", title: "", desc: "" });
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
    if (editingTodo && editingTodo.name.trim() && editingTodo.title.trim()) {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTodo._id,
          name: editingTodo.name,
          title: editingTodo.title,
          desc: editingTodo.desc,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === data._id
              ? { ...todo, name: data.name, title: data.title, desc: data.desc }
              : todo
          )
        );
        setEditingTodo(null);
      } else {
        console.error(data.error || "Failed to update task");
      }
    }
  };

  const handleEdit = (todo: {
    _id: string;
    name: string;
    title: string;
    desc: string;
  }) => {
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
      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="Enter name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter desc"
          value={newTodo.desc}
          onChange={(e) => setNewTodo({ ...newTodo, desc: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
            value={editingTodo.name}
            onChange={(e) =>
              setEditingTodo({ ...editingTodo, name: e.target.value })
            }
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editingTodo.title}
            onChange={(e) =>
              setEditingTodo({ ...editingTodo, title: e.target.value })
            }
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={editingTodo.desc}
            onChange={(e) =>
              setEditingTodo({ ...editingTodo, desc: e.target.value })
            }
            className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={updateTodo}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
            <div>
              <h4 className="font-semibold text-gray-800">{todo.name}</h4>
              <p className="text-sm text-gray-600">{todo.title}</p>
              <p className="text-sm text-gray-600">{todo.desc}</p>
            </div>
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
