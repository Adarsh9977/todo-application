import { Trash } from "lucide-react"
import type { Todo } from "@/components/todo-app"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${todo.completed ? "bg-muted/50" : "bg-card"}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox id={`todo-${todo.id}`} checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.text}
        </label>
        <Badge variant="outline" className={priorityColors[todo.priority]}>
          {todo.priority}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

