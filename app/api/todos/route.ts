import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Todo from "@/database/todo.model";

export async function GET() {
  await connectToDatabase();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { task } = await req.json();
  if (!task) {
    return NextResponse.json({ error: "Task is required" }, { status: 400 });
  }

  await connectToDatabase();
  const newTodo = new Todo({ task });
  await newTodo.save();
  return NextResponse.json(newTodo);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}

export async function PUT(req: Request) {
  const { id, task } = await req.json();

  if (!id || !task) {
    return NextResponse.json(
      { error: "ID and task are required" },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const updatedTodo = await Todo.findByIdAndUpdate(id, { task }, { new: true });

  if (!updatedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTodo);
}
