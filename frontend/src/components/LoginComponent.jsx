import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const authContext = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    };

    return (
        <div className='Login'>
            {showErrorMessage ? (
                <div className='errorMessage'>
                    Authenticated Failed. Please check your credentials
                </div>
            ) : null}
            <div className='LoginForm'>
                <div>
                    <label>User Name: </label>
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type='button' name='login' onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
