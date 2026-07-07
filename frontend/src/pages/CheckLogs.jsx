import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function CheckLogs() {
    const [passes, setPasses] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPasses = async () => {
        try {
            const res = await api.get("/passes");
            setPasses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLogs = async () => {
        try {
            const res = await api.get("/checklogs");
            setLogs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const checkInVisitor = async (passNumber) => {
        try {
            setLoading(true);

            await api.post("/checklogs/checkin", {
                passNumber,
            });

            alert("Visitor Checked In Successfully");

            await fetchPasses();
            await fetchLogs();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Check In Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const checkOutVisitor = async (passNumber) => {
        try {
            setLoading(true);

            await api.post("/checklogs/checkout", {
                passNumber,
            });

            alert("Visitor Checked Out Successfully");

            await fetchPasses();
            await fetchLogs();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Check Out Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const getPassStatus = (passId) => {
        const activeLog = logs.find(
            (log) =>
                log.passId?._id === passId &&
                log.status === "checked-in"
        );

        return activeLog
            ? "checked-in"
            : "checked-out";
    };

    useEffect(() => {
        fetchPasses();
        fetchLogs();
    }, []);

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Check Logs
                </h2>

                {/* Pass Management */}

                <div className="card p-3 mb-4">

                    <h4>Pass Management</h4>

                    <table className="table table-bordered table-hover mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Visitor</th>
                                <th>Pass Number</th>
                                <th>PDF</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {passes.length > 0 ? (

                                passes.map((pass) => {

                                    const status = getPassStatus(pass._id);

                                    return (

                                        <tr key={pass._id}>

                                            <td>{pass.visitorId?.name}</td>

                                            <td>{pass.passNumber}</td>

                                            <td>
                                                {pass.pdfUrl ? (
                                                    <a
                                                        href={`http://localhost:5000/${pass.pdfUrl}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View PDF
                                                    </a>
                                                ) : (
                                                    "No PDF"
                                                )}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${
                                                        status === "checked-in"
                                                            ? "bg-success"
                                                            : "bg-secondary"
                                                    }`}
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td>

                                                {status === "checked-in" ? (

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        disabled={loading}
                                                        onClick={() =>
                                                            checkOutVisitor(
                                                                pass.passNumber
                                                            )
                                                        }
                                                    >
                                                        {loading
                                                            ? "Processing..."
                                                            : "Check Out"}
                                                    </button>

                                                ) : (

                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        disabled={loading}
                                                        onClick={() =>
                                                            checkInVisitor(
                                                                pass.passNumber
                                                            )
                                                        }
                                                    >
                                                        {loading
                                                            ? "Processing..."
                                                            : "Check In"}
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    );

                                })

                            ) : (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >
                                        No Passes Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Check Log History */}

                <div className="card p-3">

                    <h4>Check Log History</h4>

                    <table className="table table-bordered table-hover mt-3">

                        <thead className="table-dark">
                            <tr>
                                <th>Visitor</th>
                                <th>Pass Number</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {logs.length > 0 ? (

                                logs.map((log) => (

                                    <tr key={log._id}>

                                        <td>{log.visitorId?.name}</td>

                                        <td>{log.passId?.passNumber}</td>

                                        <td>
                                            {log.checkInTime
                                                ? new Date(
                                                      log.checkInTime
                                                  ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>
                                            {log.checkOutTime
                                                ? new Date(
                                                      log.checkOutTime
                                                  ).toLocaleString()
                                                : "-"}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    log.status === "checked-in"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                }`}
                                            >
                                                {log.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >
                                        No Check Logs Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default CheckLogs;