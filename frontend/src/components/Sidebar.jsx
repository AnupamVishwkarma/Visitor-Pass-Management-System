import { Link } from "react-router-dom";

function Sidebar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.role || "visitor";

    const links = [
        {
            to: "/dashboard",
            label: "Dashboard",
            roles: ["admin"],
        },
        {
            to: "/visitors",
            label: "Visitors",
            roles: ["admin", "security", "employee"],
        },
        {
            to: "/appointments",
            label: "Appointments",
            roles: ["admin", "employee"],
        },
        {
            to: "/passes",
            label: "Passes",
            roles: ["admin", "security", "employee", "visitor"],
        },
        {
            to: "/pre-register",
            label: "Pre-Register",
            roles: ["admin", "security", "employee", "visitor"],
        },
        {
            to: "/staff",
            label: "Staff",
            roles: ["admin"],
        },
       
        {
            to: "/scanner",
            label: "QR Scanner",
            roles: ["admin", "security"],
        },
         {
            to: "/checklogs",
            label: "Check Logs",
            roles: ["admin", "security"],
        },
         {
            to: "/reports",
            label: "Reports",
            roles: ["admin"],
        },
    ];

    return (
        <div className="bg-dark text-white p-3"
            style={{ width: "250px", minHeight: "100vh", }}>

            <ul className="list-unstyled mt-4">
                {links
                    .filter((link) => link.roles.includes(role))
                    .map((link, index) => (
                        <li
                            key={link.to}
                            className={index === 0 ? "" : "mt-3"}
                        >
                            <Link
                                to={link.to}
                                className="text-white text-decoration-none"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Sidebar;
