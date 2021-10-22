import { useState, useContext } from "react";
import { deleteFromTodoList as deleteFromTodoListUseCase } from "../../application/deleteFromTodoList";
import { getTodoService } from "../services/todoService";
import { Context } from "../services/stateService";

export function useDeleteTodoFromList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const todoService = getTodoService();
  const stateService = useContext(Context);

  const deleteTodoFromList = async (todoId: string): Promise<void> => {
    setLoading(true);

    try {
      await deleteFromTodoListUseCase({ todoService, stateService }, { todoId });
    } catch (err) {
      setError((err as Error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    deleteTodoFromList,
  };
}
