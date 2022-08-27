import create from 'zustand';

// all the interfaces are defined in the types file
import { Store } from './types';

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
    }
}));

export default useStore;