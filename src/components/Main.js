import React from 'react';

export default function Main() {
    const [todos, setTodos] = React.useState([]);
    const [currtodo, setCurrtodo] = React.useState("");
    const [id, setId] = React.useState();
    const [editTodo, setEditTodo] = React.useState("");

    React.useEffect(() => {
        fetch("https://dummyjson.com/todos")
            .then(res => res.json())
            .then(data => setTodos(data.todos));
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        setTodos(prevTodos => ([
            {
                id: prevTodos.length + 1,
                todo: currtodo,
                completed: false
            },
            ...prevTodos
        ]));
        setCurrtodo("");
    }

    function onChange(event) {
        setCurrtodo(event.target.value);
    }

    function deleteTodo(deletetodotext) {
        const newTodos = todos.filter(todoObj => todoObj.todo !== deletetodotext);
        setTodos(newTodos);
    }

    function handleEditTodo(id) {
        const todoToEdit = todos.find(todo => todo.id === id);
        setId(id);
        setEditTodo(todoToEdit.todo);
    }

    function onChangeEdit(event) {
        setEditTodo(event.target.value);
    }

    function handleEditSubmit(event) {
        event.preventDefault();
        const newTodos = todos.map(todoObj => (
            todoObj.id === id ? { ...todoObj, todo: editTodo } : todoObj
        ));
        setId();
        setTodos(newTodos);
    }

    return (
        <div>
            <form className='input-container' onSubmit={handleSubmit}>
                <input type="text" placeholder='Type your todo' name="todo-text" onChange={onChange} value={currtodo} />
                <button type="submit">Add</button>
            </form>
            <div>
                {todos.length > 0 ? (
                    <ul>
                        {todos.map((currObj) => (
                            <div key={currObj.id}>
                                {id === currObj.id ? (
                                    <form onSubmit={handleEditSubmit}>
                                        <input type="text" value={editTodo} onChange={onChangeEdit} />
                                        <button type="submit">Save Changes</button>
                                    </form>
                                ) : (
                                    <li className='todo-box'>
                                        <div className='todo-text'>{currObj.todo}</div>
                                        <div>
                                            <button onClick={() => deleteTodo(currObj.todo)}>Delete todo</button>
                                            <button onClick={() => handleEditTodo(currObj.id)}>Edit todo</button>
                                        </div>
                                    </li>
                                )}
                                <hr />
                            </div>
                        ))}
                    </ul>
                ) : (
                    <div className="no-todos"><p>No Todos Found</p></div>
                )}
            </div>
        </div>
    );
}
