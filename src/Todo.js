import React from 'react'

export default function Todo({ todo, toggleTodos }) {
    function handleTodoClicked() {
        toggleTodos(todo.id);
    }

    return (
        <div>
            <label>
                <input type={"checkbox"} checked={todo.complete} onChange={handleTodoClicked} />
                {todo.name}
            </label>
        </div>
    )
}
