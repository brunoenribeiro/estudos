import { useContext, useState } from "react";
import { toggleTodoUseCase } from "../../application/toggleTodo";
import { Context } from "../services/stateService";
import { getTodoService } from "../services/todoService";

export function useToggleTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const todoService = getTodoService();
  const stateService = useContext(Context);

  const toggleTodo = async (todoId: string, done: boolean): Promise<void> => {
    setLoading (true);

    try {
      await toggleTodoUseCase({ todoService, stateService }, { todoId, done });
    } catch (err) {
      setError((err as Error));
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    toggleTodo,
  }
}