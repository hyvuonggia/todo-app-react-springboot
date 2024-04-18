import './TodoApp.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ListTodosComponent from './ListTodosComponent';
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';

const AuthenticatedRoute = ({ children }) => {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
        return children;
    }
    return <Navigate to='/' />;
};

const TodoApp = () => {
    return (
        <div className='TodoApp'>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />}></Route>
                        <Route
                            path='/login'
                            element={<LoginComponent />}
                        ></Route>
                        <Route
                            path='/welcome/:username'
                            element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                            }
                        ></Route>
                        <Route
                            path='/todos'
                            element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                            }
                        ></Route>
                        <Route
                            path='/todo/:id'
                            element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            }
                        ></Route>
                        <Route
                            path='/logout'
                            element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route path='*' element={<ErrorComponent />}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
};

export default TodoApp;
