import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginForm from '.././src/Components/UserForms/UserLoginForm'
import UserRegistrationForm from '.././src/Components/UserForms/UserRegistrationForm'
import VerificationPage from '.././src/Components/UserForms/VerificationPage'
import Home from '.././src/Components/Home/Home'
import Cookies from 'js-cookie';
function App() {
    useEffect(() => {
        populateWeatherData();
    }, []);

    const token = Cookies.get("token");

    useEffect(() => {
        if (token) {
            console.log("token: ", token);
        }
    }, [token])

    return (
        <Router>
            <ToastContainer />
            <div className="AppDiv w-100 h-100">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/h" element={<Home />} />
                    <Route path="/login" element={<UserLoginForm />} />
                    <Route path="/register" element={<UserRegistrationForm />} />
                    <Route path="/VerificationPage" element={<VerificationPage />} />
                </Routes>
            </div>
        </Router>
    );
    async function populateWeatherData() {
        console.log("hello");
    }
}

export default App;