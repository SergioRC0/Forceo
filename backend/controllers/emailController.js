const { sendEmail } = require('../utils/emailService');

const sendEmailController = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    
    // Validar los campos requeridos
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos (to, subject, y text o html)'
      });
    }

    const result = await sendEmail({ to, subject, text, html });
    
    if (result.success) {
      res.status(200).json({
        success: true,
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { sendEmailController };