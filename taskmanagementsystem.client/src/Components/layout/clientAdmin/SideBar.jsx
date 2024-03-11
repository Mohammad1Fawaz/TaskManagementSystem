import { Link } from 'react-router-dom';

// SideBar.jsx
const SideBar = () => {
    
    return (
        <div className="h-[92vh] w-[250px] p-3 main-text-color">
            <ul>
                <li className="p-2 w-full">
                    <Link className="mb-2" to="/">Users</Link>
                </li>
                <li className="p-2">
                    <Link className="mb-2" to="/Roles">Roles</Link>
                </li>
                <li className="p-2">
                    <Link className="mb-2" to="/">Projects</Link>
                </li>
            </ul>
        </div>
    );
}
export default SideBar;
