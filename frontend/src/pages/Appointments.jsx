import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [visitors, setVisitors] = useState([]);

    const [visitorId, setVisitorId] = useState("");
    const [purpose, setPurpose] = useState("");
    const [visitDate, setVisitDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [generatingPassId, setGeneratingPassId] = useState(null);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/appointments");
            setAppointments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVisitors = async () => {
        try {
            const res = await api.get("/visitors");
            setVisitors(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createAppointment = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/appointments", {
                visitorId,
                purpose,
                visitDate,
            });

            alert("Appointment Created Successfully");

            await fetchAppointments();

            setVisitorId("");
            setPurpose("");
            setVisitDate("");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create appointment"
            );
        } finally {
            setLoading(false);
        }
    };

    const approveAppointment = async (id) => {
        try {
            await api.put(`/appointments/approve/${id}`);

            alert("Appointment Approved");

            await fetchAppointments();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Approval Failed"
            );
        }
    };

    const rejectAppointment = async (id) => {
        try {
            await api.put(`/appointments/reject/${id}`);

            alert("Appointment Rejected");

            await fetchAppointments();

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Rejection Failed"
            );
        }
    };

    const generatePass = async (appointmentId) => {
        try {
            setGeneratingPassId(appointmentId);

            const res = await api.post("/passes", {
                appointmentId,
            });

            console.log("PASS CREATED:", res.data);

            alert("Pass Generated Successfully");

            await fetchAppointments();

        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Pass Generation Failed"
            );
        } finally {
            setGeneratingPassId(null);
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchVisitors();
    }, []);

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Appointments
                </h2>

                {/* Appointment Form */}

                <form
                    onSubmit={createAppointment}
                    className="mb-4"
                >

                    <select
                        id="visitorId"
                        name="visitorId"
                        className="form-control mb-2"
                        value={visitorId}
                        onChange={(e) =>
                            setVisitorId(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select Visitor
                        </option>

                        {visitors.map((visitor) => (
                            <option
                                key={visitor._id}
                                value={visitor._id}
                            >
                                {visitor.name}
                            </option>
                        ))}
                    </select>

                    <input
                        id="purpose"
                        name="purpose"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Purpose"
                        value={purpose}
                        onChange={(e) =>
                            setPurpose(e.target.value)
                        }
                        required
                    />

                    <input
                        id="visitDate"
                        name="visitDate"
                        type="date"
                        className="form-control mb-3"
                        value={visitDate}
                        onChange={(e) =>
                            setVisitDate(e.target.value)
                        }
                        required
                    />

                    <button
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Appointment"}
                    </button>

                </form>

                {/* Appointment Table */}

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>Visitor</th>
                            <th>Purpose</th>
                            <th>Visit Date</th>
                            <th>Status</th>
                            <th width="300">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {appointments.length > 0 ? (

                            appointments.map((appointment) => (

                                <tr key={appointment._id}>

                                    <td>
                                        {appointment.visitorId?.name}
                                    </td>

                                    <td>
                                        {appointment.purpose}
                                    </td>

                                    <td>
                                        {new Date(
                                            appointment.visitDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                appointment.status === "approved"
                                                    ? "bg-success"
                                                    : appointment.status === "rejected"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                            }`}
                                        >
                                            {appointment.status}
                                        </span>

                                    </td>

                                    <td>

                                        {appointment.status === "pending" && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() =>
                                                        approveAppointment(
                                                            appointment._id
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        rejectAppointment(
                                                            appointment._id
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {appointment.status === "approved" && (
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                disabled={
                                                    generatingPassId ===
                                                    appointment._id
                                                }
                                                onClick={() =>
                                                    generatePass(
                                                        appointment._id
                                                    )
                                                }
                                            >
                                                {generatingPassId ===
                                                appointment._id
                                                    ? "Generating..."
                                                    : "Generate Pass"}
                                            </button>
                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center"
                                >
                                    No Appointments Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Appointments;
