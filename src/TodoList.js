import React, {useCallback} from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";
import {List} from "react-virtualized";

const TodoList = ({todo, onRemove, onToggle, onClickEdit, onEdit}) => {
    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo_index = todo[index];
            return (
                <TodoListItem
                    todo={todo_index}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onClickEdit={onClickEdit}
                    onEdit={onEdit}
                    style={style}
                />
            );
        },
        [onRemove, onToggle, onClickEdit, onEdit, todo]
    );
    return (
        <List
            className="TodoList"
            width={512}
            height={513}
            rowCount={todo.length}
            rowHeight={57}
            rowRenderer={rowRenderer}
            list={todo}
            style={{outline: "none"}}
        />
    );
};

export default React.memo(TodoList);
