import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// get Todos

export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    return todos;
  },
});

// Creates a new todo with the provided text. Defaults isCompleted to false.
export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const id = await ctx.db.insert("todos", {
      text,
      isCompleted: false,
    });
    return id;
  },
});

// Updates an existing todo's text only.
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, { id, text }) => {
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new ConvexError("Todo not found");
    }

    await ctx.db.patch(id, { text });
    return id;
  },
});

// Toggles a todo's completion status.
export const toggleTodoCompletion = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new ConvexError("Todo not found");
    }

    await ctx.db.patch(id, { isCompleted: !existing.isCompleted });
    return id;
  },
});

// Deletes a todo by id.
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    // If the id doesn't exist, Convex will throw; we can pre-check to provide clearer error.
    const existing = await ctx.db.get(id);
    if (!existing) {
      // No-op or throw based on preference; throwing makes failures explicit.
      throw new Error("Todo not found");
    }

    await ctx.db.delete(id);
    return id;
  },
});

// clear all todos

export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    //     Delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
