import { FC, FormEventHandler, useState } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';

interface Props {
  onCreate: (description: string) => Promise<any>;
}

const CreateTodo: FC<Props> = ({ onCreate }) => {
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await onCreate(value);
      setValue('');
    } catch (err) {
      setErrorMsg((err as Error).message);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        required
        label="Descrição"
        placeholder="Ex: Regar as plantas"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMsg && <Typography color="error">{errorMsg}</Typography>}
    </Box>
  )
};

export default CreateTodo;
