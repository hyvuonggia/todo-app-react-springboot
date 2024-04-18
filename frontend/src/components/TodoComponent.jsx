import { useParams, useNavigate } from 'react-router-dom';
import { createTodo, retrieveTodo, updateTodo } from '../api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';

const TodoComponent = () => {
    const { id } = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();
    const username = authContext.username;

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => retrieveTodoInfo(), [id]);

    const retrieveTodoInfo = () => {
        if (id != -1) {
            retrieveTodo(username, id)
                .then((response) => {
                    console.log(response);
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false,
        };
        if (id == -1) {
            createTodo(username, todo)
                .then((response) => navigate('/todos'))
                .catch((error) => console.log(error));
        } else {
            updateTodo(username, id, todo)
                .then((response) => navigate('/todos'))
                .catch((error) => console.log(error));
        }
    }

    const validate = (values) => {
        const errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date',
        };
        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters';
        }
        if (
            values.targetDate == null ||
            values.targetDate === '' ||
            !moment(values.targetDate).isValid()
        ) {
            errors.targetDate = 'Enter a valid target date ';
        }
        return errors;
    };

    return (
        <div className='container'>
            <h1>Enter Todo Details</h1>
            <div className=''>
                <Formik
                    initialValues={{ description, targetDate }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage
                                name='description'
                                component='div'
                                className='alert alert-warning'
                            />
                            <ErrorMessage
                                name='targetDate'
                                component='div'
                                className='alert alert-warning'
                            />
                            <fieldset className='form-group'>
                                <label>Description</label>
                                <Field
                                    type='text'
                                    className='form-control'
                                    name='description'
                                />
                            </fieldset>
                            <fieldset className='form-group'>
                                <label>Target Date</label>
                                <Field
                                    type='date'
                                    className='form-control'
                                    name='targetDate'
                                />
                            </fieldset>
                            <button
                                className='btn btn-success m-5'
                                type='submit'
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default TodoComponent;
