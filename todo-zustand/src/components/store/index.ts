import create from 'zustand';

// all the interfaces are defined in the types file
import { Store } from './types';
import { Todo } from './types';

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((data) => ({
    ...data,
    text: data.id === id ? text : data.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((data) => ({
    ...data,
    done: data.id === id ? !data.done : data.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((d) => d.id !== id);

const addTodo = (todos: Todo[], text:string): Todo[] => [
    ...todos,
    {
        id: Math.max(0, Math.max(...todos.map(({id}) => id))) + 1,
        text,
        done: false
    },
];

// here we've used ours interface Store in which types are defined like todos: Todo[], newTodo: string, addTodo function
const useStore = create<Store>((set) => ({
    todos: [],
    newTodo: "",
    addTodo() {
        set((state) => ({
            ...state,
            // since we are adding newTodo through addTodo function therefore todos: addTodo(state.todos, state.newTodo)
            // in addTodo we've passed 2 parameter state.todos is the initial state and state.newTodo is the new todo text that is going to be added in todos: Todo[] (array)
            todos: addTodo(state.todos, state.newTodo),
            // newTodo as a empty string first
            newTodo: ""
        }));
    },
    setNewTodo(text: string) {
        set((state) => ({
            ...state,
            // newTodo as text which is of type string
            newTodo: text
        }))
    },
    updateTodo(id: number, text: string) {
        set((state) => ({
            ...state,
            todos: updateTodo(state.todos, id, text)
        }));
    },
    toggle(id: number) {
        set((state) => ({
            ...state,
            todos: toggleTodo(state.todos, id)
        }));
    },
    remove(id: number) {
        set((state) => ({
            ...state,
            todos: removeTodo(state.todos, id)
        }));
    }
}));

export default useStore;