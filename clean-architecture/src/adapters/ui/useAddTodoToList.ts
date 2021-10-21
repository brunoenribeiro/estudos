import { useState, useContext } from "react";
import { addTodoToList as addToTodoListUseCase } from "../../application/addTodoToList";
import { getTodoService } from "../services/todoService";
import { Context } from "../services/stateService";

export function useAddTodoToList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const todoService = getTodoService();
  const stateService = useContext(Context);

  const addTodoToList = async (description: string): Promise<void> => {
    setLoading(true);

    try {
      await addToTodoListUseCase({ todoService, stateService }, { description });
    } catch (err) {
      setError((err as Error));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addTodoToList,
  };
}
