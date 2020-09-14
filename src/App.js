import React, {useState, useCallback, useRef} from "react";
import ErrorBoundary from "./ErrorBoundary";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

const App = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "OM Quiz",
            checked: false,
            edit: false,
        },
        {
            id: 2,
            text: "KOR Prep",
            checked: false,
            edit: false,
        },
        {
            id: 3,
            text: "Steam refund",
            checked: true,
            edit: false,
        },
    ]);

    const nextId = useRef(4);

    const onInsert = useCallback((text) => {
        const todo = {
            id: nextId.current,
            text,
            checked: false,
            edit: false,
        };
        setTodos((todos) => todos.concat(todo));
        nextId.current += 1;
    }, []);

    const onRemove = useCallback((id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);

    const onToggle = useCallback((id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? {...todo, checked: !todo.checked} : todo
            )
        );
    }, []);

    const onClickEdit = useCallback((id) => {
        setTodos((todos) =>
            todos.map((todo) => (todo.id === id ? {...todo, edit: true} : todo))
        );
    }, []);

    const onEdit = useCallback(
        (id, value) => {
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? {...todo, text: value, edit: false} : todo
                )
            );
        },
        [todos]
    );

    return (
        <ErrorBoundary>
            <TodoTemplate>
                <TodoInsert onInsert={onInsert} />
                <TodoList
                    todo={todos}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onClickEdit={onClickEdit}
                    onEdit={onEdit}
                />
            </TodoTemplate>
        </ErrorBoundary>
    );
};

export default App;
