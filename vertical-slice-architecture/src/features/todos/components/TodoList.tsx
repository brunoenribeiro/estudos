import { FC } from "react";
import { Box, Checkbox, Typography, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { useGetTodos } from '../handlers';

interface Props {
  onCheck: (todoId: string, checked: boolean) => void;
  onDelete: (todoId: string) => void;
}

const TodoList: FC<Props> = ({ onCheck, onDelete }) => {
  const { todos, loading, error } = useGetTodos();

  if (loading) {
    return <Box>Carregando...</Box>
  }

  if (error) {
    return <Box><Typography color="error">{error.message}</Typography></Box>;
  }

  return (
    <Box>
      <FormGroup>
        {todos.map(({ id, description, done }) => (
          <Box key={id}>
            <FormControlLabel
              label={description}
              control={
                <Checkbox
                  defaultChecked={done}
                  onChange={(e) => onCheck(id, e.target.checked)}
                />
              }
            />
            <Button onClick={() => onDelete(id)}>
              <DeleteForever color="error" />
            </Button>
          </Box>
        ))}
      </FormGroup>
    </Box>
  )
}

export default TodoList;
