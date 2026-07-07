import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Reports() {

    const [loading, setLoading] = useState(false);
    const [visitorSearch, setVisitorSearch] = useState("");
    const [appointmentStatus, setAppointmentStatus] = useState("");
    const [appointmentFrom, setAppointmentFrom] = useState("");
    const [appointmentTo, setAppointmentTo] = useState("");
    const [passStatus, setPassStatus] = useState("");

    const downloadReport = async (url, fileName) => {
        try {

            setLoading(true);

            const response = await api.get(url, {
                responseType: "blob",
            });

            const blob = response.data;

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = fileName;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

            alert("Report Downloaded Successfully");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to download report"
            );

        } finally {

            setLoading(false);

        }
    };

    const downloadVisitorReport = () => {
        const params = new URLSearchParams();

        if (visitorSearch) {
            params.set("search", visitorSearch);
        }

        downloadReport(
            `/reports/visitors?${params.toString()}`,
            "visitors.csv"
        );
    };

    const downloadAppointmentReport = () => {
        const params = new URLSearchParams();

        if (appointmentStatus) {
            params.set("status", appointmentStatus);
        }

        if (appointmentFrom) {
            params.set("from", appointmentFrom);
        }

        if (appointmentTo) {
            params.set("to", appointmentTo);
        }

        downloadReport(
            `/reports/appointments?${params.toString()}`,
            "appointments.csv"
        );
    };

    const downloadPassReport = () => {
        const params = new URLSearchParams();

        if (passStatus) {
            params.set("status", passStatus);
        }

        downloadReport(
            `/reports/passes?${params.toString()}`,
            "passes.csv"
        );
    };

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Reports
                </h2>

                <div className="card shadow p-3 mb-3">

                    <h5>Visitors Report</h5>

                    <p>
                        Download all visitor records in CSV format.
                    </p>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search by name, email, phone, purpose"
                        value={visitorSearch}
                        onChange={(e) =>
                            setVisitorSearch(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={downloadVisitorReport}
                        disabled={loading}
                    >
                        {loading
                            ? "Downloading..."
                            : "Download CSV"}
                    </button>

                </div>

                <div className="card shadow p-3 mb-3">

                    <h5>Appointments Report</h5>

                    <p>
                        Download appointment records with status and date filters.
                    </p>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <select
                                className="form-control"
                                value={appointmentStatus}
                                onChange={(e) =>
                                    setAppointmentStatus(e.target.value)
                                }
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={appointmentFrom}
                                onChange={(e) =>
                                    setAppointmentFrom(e.target.value)
                                }
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={appointmentTo}
                                onChange={(e) =>
                                    setAppointmentTo(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={downloadAppointmentReport}
                        disabled={loading}
                    >
                        {loading
                            ? "Downloading..."
                            : "Download CSV"}
                    </button>

                </div>

                <div className="card shadow p-3">

                    <h5>Pass Report</h5>

                    <p>
                        Download pass records by active or expired status.
                    </p>

                    <select
                        className="form-control mb-3"
                        value={passStatus}
                        onChange={(e) =>
                            setPassStatus(e.target.value)
                        }
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                    </select>

                    <button
                        className="btn btn-warning"
                        onClick={downloadPassReport}
                        disabled={loading}
                    >
                        {loading
                            ? "Downloading..."
                            : "Download CSV"}
                    </button>

                </div>

            </div>

        </Layout>
    );
}

export default Reports;
