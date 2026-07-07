import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">

            <span className="navbar-brand">
                Visitor Pass Management System
            </span>

            <button
                className="btn btn-danger"
                onClick={logout}
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;
