import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Staff() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
    });

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to load staff"
            );
        }
    };

    const createUser = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/users", formData);
            await fetchUsers();

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "employee",
            });

            alert("Staff user created successfully");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to create user"
            );
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) {
            return;
        }

        try {
            await api.delete(`/users/${id}`);
            await fetchUsers();
            alert("User deleted successfully");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="mb-4">Staff Management</h2>

                <form
                    className="mb-4"
                    onSubmit={createUser}
                >
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-3 mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-2 mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-2 mb-2">
                            <select
                                className="form-control"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value,
                                    })
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="security">Security</option>
                                <option value="employee">Employee</option>
                                <option value="visitor">Visitor</option>
                            </select>
                        </div>

                        <div className="col-md-2 mb-2">
                            <button
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Add User"}
                            </button>
                        </div>
                    </div>
                </form>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th width="120">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteUser(user._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center"
                                >
                                    No Staff Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Staff;
