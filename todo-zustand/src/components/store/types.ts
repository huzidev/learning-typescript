export interface Todo {
    id: number;
    text: string;
    // check-box for done
    done: boolean;
}

export interface Functions {
    // addTodo function with no-parameter
    addTodo: () => void;
    // this will update the value of newTodo therefore parameter is (text of type string)
    setNewTodo: (text: string) => void;
    // for update an existing todo (id) of the todo that we wanted to update and (text) that we wanted to add
    updateTodo: (id: number, text: string) => void
    // for clicking on check-box when todo is completed we don't want text here
    toggle: (id: number) => void
    // for deleting todo
    remove: (id: number) => void
}

export interface Store extends Functions {
    // array[] of Todo list
    todos: Todo[];
    // newTodo of type string for typing new todo
    newTodo: string;
}