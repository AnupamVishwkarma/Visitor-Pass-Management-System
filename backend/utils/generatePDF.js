const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDF = (pass, visitor) => {
    const filePath = `pdfs/${pass.passNumber}.pdf`;
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22).text("Visitor Pass",{
        align : "center"
    });

    doc.moveDown();

    doc.fontSize(14).text(`Pass Number : ${pass.passNumber}`);
    doc.text(`Visitor Name : ${visitor.name}`);
    doc.text(`Email : ${visitor.email}`);
    doc.text(`Phone : ${visitor.phone}`);
    doc.text(`Valid Till : ${pass.validTill}`);
    doc.moveDown();

    doc.text("QR Code :");

    if (pass.qrCode) {
    doc.image(
        Buffer.from(
            pass.qrCode.split(",")[1],
            "base64"
        ),
        {
            width: 150
        }
    );
}

    doc.end();

    return filePath;
};

module.exports = generatePDF;