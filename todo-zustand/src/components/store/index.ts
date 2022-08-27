import create from 'zustand';

// all the interfaces are defined in the types file
import { Store } from './types';

// here we've used ours interface Store in which types are defined like todos: Todo[], newTodo: string, addTodo function
const useStore = create<Store>((set) => ({

}))