"use client"

import { useState } from "react"
import { TodoItem } from "@/components/todo-item"
import { AddTodoForm } from "@/components/add-todo-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type Todo = {
  id: string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string, priority: "low" | "medium" | "high") => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      completed: false,
      priority,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <AddTodoForm onAddTodo={addTodo} />

        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground">No todos yet. Add one above!</p>
          ) : (
            todos
              .sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 }
                return priorityOrder[a.priority] - priorityOrder[b.priority]
              })
              .map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />)
          )}
        </div>
      </CardContent>
    </Card>
  )
}

