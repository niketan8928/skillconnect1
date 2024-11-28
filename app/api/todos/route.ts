import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Todo from "@/database/todo.model";

export async function GET() {
  await connectToDatabase();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const { name, title, desc } = await req.json();
  if (!name && !title && !desc) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  await connectToDatabase();
  const newTodo = new Todo({ name, title, desc });
  await newTodo.save();
  return NextResponse.json(newTodo);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "name deleted" });
}

export async function PUT(req: Request) {
  const { id, name, title, desc } = await req.json();

  if (!id || !name || !title || !desc) {
    return NextResponse.json(
      { error: "ID and name are required" },
      { status: 400 }
    );
  }

  await connectToDatabase();
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { name, title, desc },
    { new: true }
  );

  if (!updatedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTodo);
}
