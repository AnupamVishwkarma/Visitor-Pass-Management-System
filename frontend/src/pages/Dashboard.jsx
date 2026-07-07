import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {

    const [stats, setStats] = useState({
        totalVisitors: 0,
        pendingAppointments: 0,
        approvedAppointments: 0,
        totalPasses: 0,
        activePasses: 0,
        todayCheckIns: 0,
    });

    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {

            setLoading(true);

            const res = await api.get("/dashboard/stats");

            setStats(res.data);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load dashboard data"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="container mt-5 text-center">
                    <h4>Loading Dashboard...</h4>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Visitors</h5>
                            <h2>{stats.totalVisitors}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Pending Appointments</h5>
                            <h2>{stats.pendingAppointments}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Approved Appointments</h5>
                            <h2>{stats.approvedAppointments}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Total Passes</h5>
                            <h2>{stats.totalPasses}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Active Passes</h5>
                            <h2>{stats.activePasses}</h2>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow text-center p-3">
                            <h5>Today's Check Ins</h5>
                            <h2>{stats.todayCheckIns}</h2>
                        </div>
                    </div>

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;