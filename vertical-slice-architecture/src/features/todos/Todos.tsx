import { FC } from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import { CreateTodo, TodoList } from './components';
import { useToggleTodo, useDeleteTodo, useCreateTodo } from './handlers';

export const Todos: FC = () => {
  const { createTodoIfUnique, loading: isCreatingTodo } = useCreateTodo();
  const { toggleTodo, loading: isTogglingTodo } = useToggleTodo();
  const { deleteTodo, loading: isDeletingTodo } = useDeleteTodo();
  
  return (
    <Box component="section">
      <Typography variant="h1">My Todo List</Typography>
      
      <Box display="flex" alignItems="center">
        <CreateTodo onCreate={(description) => createTodoIfUnique(description)} />
        
        { (isCreatingTodo || isTogglingTodo || isDeletingTodo) && (
          <CircularProgress color="inherit" size={16} />
        )}
      </Box>


      <TodoList
        onCheck={(todoId, checked) => {
          toggleTodo({ variables: { id: todoId, done: checked } });
        }}
        onDelete={(todoId) => {
          deleteTodo({ variables: { id: todoId } });
        }}
      />
    </Box>
  );
};
