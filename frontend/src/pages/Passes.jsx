import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Passes() {

    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPasses = async () => {
        try {

            setLoading(true);

            const res = await api.get("/passes");

            setPasses(res.data);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load passes"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchPasses();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="container mt-5 text-center">
                    <h4>Loading Passes...</h4>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Passes
                </h2>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>Visitor</th>
                            <th>Pass Number</th>
                            <th>Status</th>
                            <th>PDF</th>
                        </tr>
                    </thead>

                    <tbody>

                        {passes.length > 0 ? (

                            passes.map((pass) => (

                                <tr key={pass._id}>

                                    <td>
                                        {pass.visitorId?.name}
                                    </td>

                                    <td>
                                        {pass.passNumber}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                pass.status === "active"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {pass.status || "Active"}
                                        </span>

                                    </td>

                                    <td>

                                        {pass.pdfUrl ? (

                                            <a
                                                href={`http://localhost:5000/${pass.pdfUrl}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Download PDF
                                            </a>

                                        ) : (

                                            "No PDF"

                                        )}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >
                                    No Passes Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Passes;