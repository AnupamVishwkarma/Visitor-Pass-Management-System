import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function PreRegister() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        address: "",
        purpose: "",
        photo: null,
    });

    const submitRegistration = async (e) => {
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

            alert("Pre-registration submitted successfully");
            setFormData({
                ...formData,
                phone: "",
                address: "",
                purpose: "",
                photo: null,
            });
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit pre-registration"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h2 className="mb-4">Pre-Register Visit</h2>

                <form onSubmit={submitRegistration}>
                    <input
                        type="text"
                        className="form-control mb-2"
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

                    <input
                        type="email"
                        className="form-control mb-2"
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

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Phone"
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
                        type="text"
                        className="form-control mb-2"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                address: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Purpose"
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
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default PreRegister;
