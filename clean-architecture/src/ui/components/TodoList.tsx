import { FC, useContext } from "react";
import { Box, Checkbox, Typography, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { Context } from '../../adapters/services/stateService';
import { useGetTodos } from "../../adapters/ui/useGetTodos";

interface Props {
  onCheck: (todoId: string, checked: boolean) => void;
  onDelete: (todoId: string) => void;
}

const TodoList: FC<Props> = ({ onCheck, onDelete }) => {
  const { loading, error } = useGetTodos();
  const { state: { todoList } } = useContext(Context);

  if (loading) {
    return <Box>Carregando...</Box>
  }

  if (error) {
    return <Box><Typography color="error">{JSON.stringify(error)}</Typography></Box>;
  }

  return (
    <Box>
      <FormGroup>
        {todoList.map(todo => (
          <Box key={todo.id}>
            <FormControlLabel
              label={todo.description}
              control={
                <Checkbox
                  defaultChecked={todo.done}
                  onChange={(e) => onCheck(todo.id, e.target.checked)}
                />
              }
            />
            <Button onClick={() => onDelete(todo.id)}>
              <DeleteForever color="error" />
            </Button>
          </Box>
        ))}
      </FormGroup>
    </Box>
  )
}

export default TodoList;
