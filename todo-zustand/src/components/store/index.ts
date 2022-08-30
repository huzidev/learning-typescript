import create from 'zustand';
// all the interfaces are defined in the types file
import { Store } from './types';
import * as actions from './actions';

// here we've used ours interface Store in which types are defined like todos: Todo[], newTodo: string, addTodo function
export const useStore = create<Store>((set) => ({
    todos: [],
    newTodo: "",
    dark: false,
    add() {
        set((state) => ({
            ...state,
            // since we are adding newTodo through addTodo function therefore todos: addTodo(state.todos, state.newTodo)
            // in addTodo we've passed 2 parameter state.todos is the initial state and state.newTodo is the new todo text that is going to be added in todos: Todo[] (array)
            todos: actions.addTodo(state.todos, state.newTodo),
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
            todos: actions.updateTodo(state.todos, id, text)
        }));
    },
    toggle(id: number) {
        set((state) => ({
            ...state,
            todos: actions.toggleTodo(state.todos, id)
        }));
    },
    remove(id: number) {
        set((state) => ({
            ...state,
            todos: actions.removeTodo(state.todos, id)
        }));
    },
    darkMode() {
        set((state) => ({
            ...state,
            dark: !state.dark
        }));
    }
}));