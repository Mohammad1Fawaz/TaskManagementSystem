import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerificationPage from '.././src/Components/UserForms/VerificationPage'
import Home from './Components/Home/IntroSection'
import NavBar from './Components/navbar/Navbar';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
function App() {

    return (
        <Router>
            <header>
                <NavBar />
            </header>
            <ToastContainer />
            <div className="AppDiv w-100 h-100">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/h" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<SignupPage />} />
                    <Route path="/VerificationPage" element={<VerificationPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;