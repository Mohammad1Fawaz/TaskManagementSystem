import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verification from '../src/pages/Verification';
import './App.css';
import Home from './Components/layout/Home/IntroSection';
import NavBar from './Components/layout/navbar/Navbar';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ResetPasswordPage from './pages/ResetPassword';

function App() {

    return (
        <Router>
            <ToastContainer autoClose={false} />
            <main className="AppDiv w-100 h-100">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<SignupPage />} />
                    <Route path="/VerificationPage" element={<Verification />} />
                    <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;