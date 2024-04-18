import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
    retrieveHelloWorldBean,
    retrieveHelloWorldPathVariable,
} from '../api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

const WelcomeComponent = () => {
    const { username } = useParams();
    const [message, setMessage] = useState(null);

    const authContext = useAuth()


    return (
        <div className='Welcome'>
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button
                    className='btn btn-success m-5'
                    // onClick={callHelloWorldRestApi}
                >
                    Call hello world
                </button>
            </div>
            <div className='text-info'>{message}</div>
        </div>
    );
};

export default WelcomeComponent;
