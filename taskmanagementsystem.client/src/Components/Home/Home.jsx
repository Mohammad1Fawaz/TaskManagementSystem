// RegistrationForm.jsx
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <div className="container mt-4">           
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}
export default Home;
