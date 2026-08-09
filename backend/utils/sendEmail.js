import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify Gmail SMTP configuration
transporter.verify((error, success) => {
    if (error) {
        console.error(
            "❌ Gmail SMTP configuration failed:",
            error.message
        );
    } else {
        console.log(
            "✅ Gmail SMTP server is ready"
        );
    }
});

export const sendOTPEmail = async (
    email,
    otp,
    expiryMinutes = 10
) => {
    try {
        const mailOptions = {
            from: `"AI Unified Dispatch System" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Password Reset OTP",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                ">

                    <h2 style="color: #2563eb;">
                        Password Reset
                    </h2>

                    <p>
                        We received a request to reset
                        your password.
                    </p>

                    <p>
                        Your OTP is:
                    </p>

                    <div style="
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        text-align: center;
                        padding: 20px;
                        background: #f1f5f9;
                        border-radius: 10px;
                        color: #1e293b;
                    ">
                        ${otp}
                    </div>

                    <p>
                        This OTP will expire in
                        <strong>
                            ${expiryMinutes} minutes
                        </strong>.
                    </p>

                    <p>
                        If you did not request a password
                        reset, you can safely ignore this
                        email.
                    </p>

                    <hr />

                    <p style="
                        color: #64748b;
                        font-size: 13px;
                    ">
                        AI Unified Dispatch System
                    </p>

                </div>
            `,
        };

        const info =
            await transporter.sendMail(mailOptions);

        console.log(
            "✅ OTP email sent:",
            info.messageId
        );

        return info;
    } catch (error) {
        console.error(
            "❌ OTP email sending failed:",
            error.message
        );

        throw error;
    }
};
