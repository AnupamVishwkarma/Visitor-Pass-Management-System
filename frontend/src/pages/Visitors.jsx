import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Visitors() {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        purpose: "",
        photo: null,
    });

    const fetchVisitors = async () => {
        try {
            const res = await api.get("/visitors");
            setVisitors(res.data);
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Failed to load visitors"
            );
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, []);

    const createVisitor = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("address", formData.address);
            data.append("purpose", formData.purpose);

            if (formData.photo) {
                data.append("photo", formData.photo);
            }

            await api.post("/visitors", data);

            alert("Visitor Added Successfully");

            await fetchVisitors();

            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                purpose: "",
                photo: null,
            });

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add visitor"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Visitors
                </h2>

                <form
                    onSubmit={createVisitor}
                    className="mb-4"
                >

                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="form-control mb-2"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control mb-2"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        className="form-control mb-2"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="form-control mb-2"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                    />

                    <input
                        id="purpose"
                        name="purpose"
                        type="text"
                        placeholder="Purpose"
                        className="form-control mb-3"
                        value={formData.purpose}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                purpose: e.target.value,
                            })
                        }
                        required
                    />

                    <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="form-control mb-3"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                photo: e.target.files[0] || null,
                            })
                        }
                    />

                    <button
                        className="btn btn-success"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Add Visitor"}
                    </button>

                </form>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Purpose</th>
                            <th>Photo</th>
                        </tr>
                    </thead>

                    <tbody>

                        {visitors.length > 0 ? (

                            visitors.map((visitor) => (

                                <tr key={visitor._id}>

                                    <td>{visitor.name}</td>

                                    <td>{visitor.email}</td>

                                    <td>{visitor.phone}</td>

                                    <td>{visitor.address || "-"}</td>

                                    <td>{visitor.purpose}</td>

                                    <td>
                                        {visitor.photo ? (
                                            <img
                                                src={`http://localhost:5000/${visitor.photo}`}
                                                alt={visitor.name}
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >
                                    No Visitors Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Visitors;
