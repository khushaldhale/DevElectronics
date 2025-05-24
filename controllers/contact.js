const contactModel = require("../models/contact");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const sendCustomMail = require("../utils/nodemailer");

exports.createContact = asyncHandler(async (req, res, next) => {

  const { fname, lname, email, contact, subject, message } = req.body;

  if (!fname || !lname || !email || !contact || !subject || !message) {
    return next(new ErrorHandler(400, "kindly provide all details"))
  }

  const contact_doc = await contactModel.create({ fname, lname, email, contact, subject, message });

  const emailBody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
    <div style="background-color: #222; color: #fff; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">Dev Electronics - Audio Solutions</h2>
      <p style="margin: 5px 0; font-size: 14px;">Enquiry about Audio Products, Maintenance, Support, or Installation</p>
    </div>
    <div style="padding: 20px; background-color: #fff;">
      <h3 style="color: #333;">New Customer Enquiry</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${fname} ${lname}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Contact Number:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${contact}</td>
        </tr>
        <tr>
          <td style="padding: 10px; vertical-align: top;"><strong>Enquiry Details:</strong></td>
          <td style="padding: 10px; white-space: pre-wrap;">${message}</td>
        </tr>
      </table>
      <p style="margin-top: 25px; font-size: 14px; color: #555;">We will review the enquiry and get back to the customer shortly.</p>
    </div>
    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      Dev Electronics | Audio Expertise & Custom Installations<br/>
      support@develectronics.com | +91-98765-43210
    </div>
  </div>
`;


  //  have to hardcode the  devdas email out here 
  sendCustomMail("Dev Electronics", "devdas.repal81@gmail.com", subject, emailBody);

  if (contact_doc) {
    return res.status(200)
      .json({
        success: true,
        message: "contact is created successfully",
        data: contact_doc
      })
  }

})