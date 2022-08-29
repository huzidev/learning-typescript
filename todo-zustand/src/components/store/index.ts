import create from 'zustand';

// all the interfaces are defined in the types file
import { Store } from './types';
import { Todo } from './types';

// for updating todo
// here todos: Todo[] will takes all the data of todos in an array means it is complete list of todos therefore we've used (todos.map) function because todos will have all the data
const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((data) => ({
    ...data,
    text: data.id === id ? text : data.text,
  }));


// for check-box
const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((data) => ({
    ...data,
    done: data.id === id ? !data.done : data.done,
  }));


// for deleting todo
const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((d) => d.id !== id);


// for adding todo
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
    add() {
        set((state) => ({
            ...state,
            // since we are adding newTodo through addTodo function therefore todos: addTodo(state.todos, state.newTodo)
            // in addTodo we've passed 2 parameter state.todos is the initial state and state.newTodo is the new todo text that is going to be added in todos: Todo[] (array)
            todos: addTodo(state.todos, state.newTodo),
            // newTodo as a empty string first otherwise the PREVIOUS text will appear while creating newTodo
            // therefore we've used newTodo="" (as empty string) after all the other functions run
            newTodo: ""
        }));
    },
    // for CREATING new todo
    setNewTodo(text: string) {
        set((state) => ({
            ...state,
            // newTodo as text which is of type string
            newTodo: text
        }))
    },
    update(id: number, text: string) {
        set((state) => ({
            ...state,
            // here state.todos brings all the previous todos because we've defined these parameters already above THAT updateTodo will takes 3 parameters
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