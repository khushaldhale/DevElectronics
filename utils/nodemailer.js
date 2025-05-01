const nodemailer = require("nodemailer");
require("dotenv").config()


const sendCustomMail = async (from, to, subject, html) => {

	const transporter = nodemailer.createTransport(
		{
			host: "smtp.gmail.com",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		}
	)

	const mail_info = await transporter.sendMail({
		from,
		to,
		subject,
		html
	}, (error, mail_info) => {
		if (error) {
			console.log("error occured while sending a mail : ", error);
			return;
		}

		console.log("mail  is sent successfuly : ", mail_info);
		return;

	})
}

module.exports = sendCustomMail; 