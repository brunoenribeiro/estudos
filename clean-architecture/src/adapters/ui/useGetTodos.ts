import { useContext, useEffect, useState } from "react";
import { getTodoList as getTodoListUseCase } from '../../application/getTodoList';
import { Context } from "../services/stateService";
import { getTodoService } from "../services/todoService";

export function useGetTodos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const todoService = getTodoService();
  const stateService = useContext(Context);

  useEffect(() => {
    setLoading(true);

    getTodoListUseCase({ todoService, stateService })
      .catch((err: Error) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return {
    loading,
    error,
  }
}