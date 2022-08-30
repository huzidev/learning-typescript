import { Todo, Store } from './types';

// for updating todo
// here todos: Todo[] will takes all the data of todos in an array means it is complete list of todos therefore we've used (todos.map) function because todos will have all the data
export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((data) => ({
    ...data,
    text: data.id === id ? text : data.text,
  }));

// for check-box
export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((data) => ({
    ...data,
    done: data.id === id ? !data.done : data.done,
  }));

// for deleting todo
export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((data) => data.id !== id);

// for adding todo
export const addTodo = (todos: Todo[], text:string): Todo[] => [
    ...todos,
    {
        id: Math.max(0, Math.max(...todos.map(({id}) => id))) + 1,
        text,
        // by default done (check-box) will be false
        done: false
    },
];