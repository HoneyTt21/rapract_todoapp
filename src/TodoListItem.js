import React, {useCallback, useState} from "react";
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
    MdEdit,
    MdDone,
} from "react-icons/md";
import cn from "classnames";
import "./TodoListItem.scss";

const TodoListItem = ({
    todo,
    onRemove,
    onToggle,
    onClickEdit,
    onEdit,
    style,
}) => {
    const {id, text, checked, edit} = todo;

    const [value, setValue] = useState("");
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div
                    className={cn("checkbox", {checked})}
                    onClick={() => onToggle(id)}
                >
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    {edit ? (
                        <div>
                            <input
                                value={value}
                                onChange={onChange}
                                className={checked ? "checked" : "not-checked"}
                            />
                        </div>
                    ) : (
                        <div className="text">{text}</div>
                    )}
                </div>
                {edit ? (
                    <div
                        className="submit_edit"
                        onClick={() => {
                            onEdit(id, value);
                        }}
                    >
                        <MdDone />
                    </div>
                ) : (
                    <div
                        className="edit"
                        onClick={() => {
                            setValue(text);
                            onClickEdit(id);
                        }}
                    >
                        <MdEdit />
                    </div>
                )}

                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);
