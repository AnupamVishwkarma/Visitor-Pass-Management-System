import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import api from "../services/api";
import Layout from "../components/Layout";

function QRScanner() {
  const [scanResult, setScanResult] = useState("");
  const [scanAction, setScanAction] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleScan = async (result) => {
    if (!result?.[0]?.rawValue) return;
    if (scanned) return;

    setScanned(true);

    try {
      const qrData = JSON.parse(result[0].rawValue);

      if (!qrData.passNumber) {
        throw new Error("Invalid pass QR code");
      }

      setScanResult(qrData.passNumber);

      const res = await api.post("/checklogs/scan", {
        passNumber: qrData.passNumber,
      });

      setScanAction(res.data.action);

      alert(res.data.message);

      setTimeout(() => {
        setScanned(false);
      }, 2000);
    } catch (error) {
      setScanned(false);

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "QR Scan Failed"
      );
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">QR Scanner</h2>

      <div style={{ maxWidth: "500px" }}>
        <Scanner onScan={handleScan} />
      </div>

      {scanResult && (
        <div
          className={`alert mt-3 ${
            scanAction === "checkout" ? "alert-warning" : "alert-success"
          }`}
        >
          Pass Number: {scanResult}
          {scanAction && (
            <span className="ms-2">
              ({scanAction === "checkout" ? "Checked Out" : "Checked In"})
            </span>
          )}
        </div>
      )}
    </Layout>
  );
}

export default QRScanner;
