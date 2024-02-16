import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verification from '../src/pages/Verification';
import './App.css';
import Home from './Components/layout/Home/IntroSection';
import LoginPage from './pages/Login';
import ResetPasswordPage from './pages/ResetPassword';
import SignupPage from './pages/Signup';

function App() {

    return (
        <Router>
            <ToastContainer autoClose={false} />
            <main className="flex-center w-full h-full">
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