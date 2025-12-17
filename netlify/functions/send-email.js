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

    // Get credentials from environment variables
    const smtpUser = process.env.SMTP_USER || 'info@sengroup.one';
    const smtpPassword = process.env.SMTP_PASSWORD;

    // Validate credentials
    if (!smtpPassword) {
      console.error('SMTP_PASSWORD is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'SMTP configuration error' }),
      };
    }

    // Debug logging (without exposing password)
    console.log('SMTP User:', smtpUser);
    console.log('SMTP Password length:', smtpPassword ? smtpPassword.length : 0);

    // Try port 465 first (SSL)
    let transporter = nodemailer.createTransport({
      host: 'pkz32.hoster.kz',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
      debug: false, // Set to true for detailed logs
      logger: false,
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified on port 465');
    } catch (verifyError) {
      console.log('Port 465 failed, trying port 587 with STARTTLS');
      // If 465 fails, try 587 with STARTTLS
      transporter = nodemailer.createTransport({
        host: 'pkz32.hoster.kz',
        port: 587,
        secure: false, // false for 587
        requireTLS: true,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
        debug: false,
        logger: false,
      });
      
      try {
        await transporter.verify();
        console.log('SMTP connection verified on port 587');
      } catch (verifyError2) {
        console.error('Both ports failed:', verifyError2.message);
        throw verifyError2;
      }
    }

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

