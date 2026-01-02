import { sendEmail } from './config/emailService.js';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

async function testEmail() {
    const result = await sendEmail(
        'your-test-email@example.com', // Thay bằng email test của bạn
        'Test Email',
        'This is a test email.',
        '<h1>This is a test email.</h1>'
    );

    if (result.success) {
        console.log('✅ Email sent successfully!');
    } else {
        console.error('❌ Failed to send email:', result.error);
    }
}

testEmail();