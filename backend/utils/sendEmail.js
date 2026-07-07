const nodemailer = require("nodemailer");

const sendEmail = async ({to, subject, text}) => {
    if(!to){
        return;
    }

    const {
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        SMTP_PASS,
        EMAIL_FROM,
    } = process.env;

    if(!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS){
        console.log(`Email skipped for ${to}: ${subject}`);
        return;
    }

    try{
        const transporter = nodemailer.createTransport({
            host : SMTP_HOST,
            port : Number(SMTP_PORT),
            secure : Number(SMTP_PORT) === 465,
            auth : {
                user : SMTP_USER,
                pass : SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from : EMAIL_FROM || SMTP_USER,
            to,
            subject,
            text,
        });
    }catch(error){
        console.log("Email failed:", error.message);
    }
};

module.exports = sendEmail;
