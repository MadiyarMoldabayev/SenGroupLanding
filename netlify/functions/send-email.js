const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, company, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'pkz32.hoster.kz',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'info@sengroup.one',
        pass: process.env.SMTP_PASSWORD, // Should be set in Netlify environment variables
      },
    });

    // Email content
    const mailOptions = {
      from: 'info@sengroup.one',
      to: 'info@sengroup.one',
      subject: `Новое сообщение с сайта SENGROUP от ${name}`,
      html: `
        <h2>Новое сообщение с формы обратной связи</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Компания:</strong> ${company}</p>` : ''}
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
Новое сообщение с формы обратной связи

Имя: ${name}
Email: ${email}
${company ? `Компания: ${company}` : ''}

Сообщение:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};

