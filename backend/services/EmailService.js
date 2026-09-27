const nodemailer = require('nodemailer');

/**
 * Email Service
 * Sends emails with certificates attached
 */

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  
  /**
   * Send certificate email with attachments
   */
  async sendCertificateEmail(options) {
    const {
      to,
      certificateType,
      serialNumber,
      certificatePem,
      privateKeyPem,
      publicKeyPem,
      validFrom,
      validTo,
      subject
    } = options;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@certtrust.com',
      to: to,
      subject: `🔐 Your ${certificateType} Certificate - CertTrust`,
      html: this.getCertificateEmailTemplate({
        certificateType,
        serialNumber,
        validFrom,
        validTo,
        subject
      }),
      attachments: [
        {
          filename: `certificate_${serialNumber}.pem`,
          content: certificatePem,
          contentType: 'application/x-pem-file'
        },
        {
          filename: `private_key_${serialNumber}.pem`,
          content: privateKeyPem,
          contentType: 'application/x-pem-file'
        },
        {
          filename: `public_key_${serialNumber}.pem`,
          content: publicKeyPem,
          contentType: 'application/x-pem-file'
        },
        {
          filename: 'README.txt',
          content: this.getCertificateReadme(certificateType, serialNumber)
        }
      ]
    };
    
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Email failed to ${to}: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Send welcome email
   */
  async sendWelcomeEmail(to, firstName) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@certtrust.com',
      to: to,
      subject: '🎉 Welcome to CertTrust!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to CertTrust, ${firstName}!</h1>
          <p>Thank you for joining CertTrust. You can now generate and manage digital certificates.</p>
          <p>Get started by using your promo code to generate your first certificate.</p>
          <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Go to Dashboard</a>
        </div>
      `
    };
    
    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error(`Welcome email failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@certtrust.com',
      to: to,
      subject: '🔑 Password Reset Request - CertTrust',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Password Reset Request</h1>
          <p>You requested a password reset. Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
          <p style="color: #666; font-size: 12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      `
    };
    
    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error(`Password reset email failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get certificate email HTML template
   */
  getCertificateEmailTemplate(data) {
    const { certificateType, serialNumber, validFrom, validTo, subject } = data;
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; margin-top: 0;">🔐 Your Certificate is Ready!</h1>
          
          <div style="background: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af;">Certificate Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td>
                <td style="padding: 8px 0; color: #111;">${certificateType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Serial Number:</strong></td>
                <td style="padding: 8px 0; color: #111; font-family: monospace;">${serialNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #111;">${subject.commonName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Valid From:</strong></td>
                <td style="padding: 8px 0; color: #111;">${new Date(validFrom).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Valid To:</strong></td>
                <td style="padding: 8px 0; color: #111;">${new Date(validTo).toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">⚠️ Important Notice</h3>
            <p style="margin: 0; color: #78350f; font-size: 14px;">
              This certificate is for <strong>TEST/DEMO purposes only</strong>. 
              For legally qualified certificates with eIDAS compliance, please contact authorized QTSP providers.
            </p>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #111;">📎 Attached Files</h3>
            <ul style="color: #666;">
              <li><code>certificate_${serialNumber}.pem</code> - Your certificate</li>
              <li><code>private_key_${serialNumber}.pem</code> - Your private key (KEEP SECURE!)</li>
              <li><code>public_key_${serialNumber}.pem</code> - Your public key</li>
              <li><code>README.txt</code> - Installation instructions</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Need help? Contact us at support@certtrust.com<br>
              <a href="${process.env.FRONTEND_URL}" style="color: #2563eb;">Visit Dashboard</a>
            </p>
          </div>
        </div>
      </div>
    `;
  }
  
  /**
   * Get certificate README content
   */
  getCertificateReadme(certificateType, serialNumber) {
    return `
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     CertTrust Certificate - ${certificateType.padEnd(20)}                  ║
║     Serial: ${serialNumber}                                ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

CONTENTS
========
- certificate.pem  : Your X.509 certificate
- private_key.pem  : Your private key (KEEP SECURE!)
- public_key.pem   : Your public key

IMPORTANT NOTICE
================
This certificate is for TEST/DEMO purposes only.
It is NOT a legally qualified certificate under eIDAS regulation.

For legally qualified certificates (QWAC, PSD2, eIDAS), please contact
authorized QTSP providers such as:
- InfoCert (https://www.infocert.it)
- Aruba PEC (https://www.aruba.it)
- Namirial (https://www.namirial.com)
- Actalis (https://www.actalis.it)

USAGE
=====
1. Install the certificate on your server
2. Configure TLS/SSL with the private key
3. Test the connection

For more information, visit: ${process.env.FRONTEND_URL}

Generated by CertTrust - Digital Certificate Management System
    `;
  }
}

module.exports = new EmailService();
