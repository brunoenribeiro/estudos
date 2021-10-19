import { ApolloServer, gql, UserInputError } from 'apollo-server';

interface Todo {
  id: string;
  description: string;
  done: boolean;
}

let todos: Todo[] = [
  {
    id: 'foo',
    description: 'My first todo',
    done: false,
  }
]

const typeDefs = gql`
  type Todo {
    id: ID!
    description: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo]!
    todo(todoId: ID!): Todo
  }

  input CreateTodoInput {
    description: String!
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    toggleTodo(id: ID!, done: Boolean!): ID
    deleteTodo(id: ID!): ID
  }
`;

const resolvers = {
  Query: {
    todos() {
      return todos;
    },
    todo(_: any, { todoId }: { todoId: string }) {
      return todos.find(todo => todo.id === todoId); 
    }
  },
  Mutation: {
    createTodo(_: any, args: { input: { description: string } }) {
      const { description } = args.input;

      const newTodo = {
        id: Date.now().toString(),
        done: false,
        description,
      };

      todos.push(newTodo);

      return newTodo;
    },
    toggleTodo(_: any, { id, done }: { id: string; done: boolean }) {
      const index = todos.findIndex(todo => todo.id === id);

      if (index < 0) {
        throw new UserInputError(`Couldn't find todo with id ${id}`);
      }

      todos[index].done = done;
      return todos[index].id;
    },
    deleteTodo(_: any, { id }: { id: string }) {
      const todo = todos.find(todo => todo.id === id);
      
      if (!todo) {
        throw new UserInputError(`Couldn't find todo with id ${id}`);
      }

      todos = todos.filter(todo => todo.id !== id);
      return todo.id;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});