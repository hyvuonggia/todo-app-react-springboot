import { useContext } from 'react';
import { AuthContext } from './security/AuthContext';

const FooterComponent = () => {
    const authContext = useContext(AuthContext);
    return (
        <footer className='footer'>
            <div className='container'>Your Footer</div>
        </footer>
    );
};

export default FooterComponent;
