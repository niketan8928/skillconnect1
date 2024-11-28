// import mongoose from "mongoose";

// const TodoSchema = new mongoose.Schema({
//   task: { type: String, required: true },
// });

// const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

// export default Todo;

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
