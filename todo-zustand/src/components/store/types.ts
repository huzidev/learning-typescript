export interface Todo {
    id: number;
    text: string;
    // check-box for done
    done: boolean;
}

export interface Store {
    // array[] of Todo list
    todos: Todo[];
    // newTodo of type string for typing new todo
    newTodo: string;
    // addTodo function with no-parameter
    addTodo: () => void;
    // this will update the value of newTodo therefore parameter is (text of type string)
    setNewTodo: (text: string) => void;
}