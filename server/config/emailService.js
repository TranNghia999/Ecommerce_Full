import sgMail from '@sendgrid/mail';

// Cấu hình SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Chức năng gửi email
async function sendEmail(to, subject, text, html) {
    try {
        const msg = {
            to: to, // Người nhận
            from: process.env.EMAIL_FROM || 'noreply@yourdomain.com', // Địa chỉ gửi (phải verify trong SendGrid)
            subject: subject,
            text: text,
            html: html,
        };

        await sgMail.send(msg);
        return { success: true, messageId: 'sent' };
    } catch (error) {
        console.error('Lỗi gửi email:', error);
        return { success: false, error: error.message };
    }
}

export { sendEmail };