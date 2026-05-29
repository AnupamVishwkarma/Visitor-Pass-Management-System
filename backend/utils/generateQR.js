const QRCode = require("qrcode");

const generateQR = async (text) => {
    try{
        return await QRCode.toDataURL(text);
    }catch(error){
        throw error;
    }
};

module.exports = generateQR;