import { useEffect, useState } from 'react';
import { deleteTodo, retrieveAllTodosForUsername } from '../api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';

const ListTodosComponent = () => {
    const today = new Date();

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();

    const refreshTodos = () => {
        retrieveAllTodosForUsername(username)
            .then((res) => {
                setTodos(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateTodo = (id) => {
        navigate(`/todo/${id}`);
    };

    const handleAddNewTodo = () => {
        navigate(`/todo/-1`);
    };

    useEffect(() => refreshTodos(), []);

    const handleDeleteTodo = (id) => {
        console.log(id);
        deleteTodo(username, id).then(() => {
            // Display message
            setMessage(`Delete of todo success`);
            // Update todos list
            refreshTodos();
        });
    };
    return (
        <div className='ListTodosComponent'>
            <h1>Things you want to do!</h1>
            {message && <div className='alert alert-warning'>{message}</div>}

            <table className='table'>
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>IS DONE?</th>
                        <th>TARGET DATE</th>
                        <th>DELETE</th>
                        <th>UPDATE</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className='btn btn-success'
                                    onClick={() => handleUpdateTodo(todo.id)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='btn btn-success m-3' onClick={handleAddNewTodo}>
                Add New Todo
            </div>
        </div>
    );
};

export default ListTodosComponent;
