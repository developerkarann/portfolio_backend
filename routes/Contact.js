require('dotenv').config();
const express = require('express')
const router = express.Router();
const Contact = require('../model/contectSchema')
const nodemailer = require('nodemailer');

router.post('/contact', async (req, res) => {
  const { name, email, subject, description } = req.body
  try {
    if (!name || !email || !subject || !description) {
      return res.status(404).json({ status: 'error', message: 'Please fill all the fields' })
    }
    const data = await new Contact({
      name,
      email,
      subject,
      description
    })
    await data.save()
    // send email >>>

    // Connect with SMTP Server
    const transporterForUser = nodemailer.createTransport({ // For User
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    const transporterToMe = nodemailer.createTransport({// For Us
      service: 'gmail',
      auth: {
        user: process.env.MYEMAIL,
        pass: process.env.MYPASS
      }
    });
    // Send Mail and body

    // Options for getting user info/message by email
    const MyOptions = {         // For Us
      from: "karandeveloper03040@gmail.com",
      to: "karanpal03040@gmail.com",
      subject: `${name} send a message by Portfolio`,
      html: `<h3>Name: ${name}</3><br><h3>Email: ${email}</3><br><h3>Subject:  ${subject}</3><br><h3> Message:</3> <br><br> <p>${description}</p>`
    }
    // Options for sending mail to the user
    const UserOptions = {         //For USer
      from: "karanpal03040@gmail.com",
      to: email,
      subject: 'Thank you for sending message!',
      html: `
      <h3>
      Dear ${name}, <br><br>
      Thank you for reaching out to me. I have received your message and would like to acknowledge your inquiry. 
      I appreciate your interest in my services and am committed to providing you with a prompt and satisfactory response.<br>

      we will make every effort to address your concerns, or requests in a timely manner. 
      and we aim to respond to all inquiries within 24 hours.<br>

      I value your time and look forward to assisting you further. 
      If you have any urgent matters or require immediate assistance, please don't hesitate to contact me at 8869012507<br><br>

      Best regards,<br><br>

      Karan Pal<br>
      Full Stack Developer<br>
      karanpal03040@gmail.com<br>
      91+886912507<br>
      </h3>
      `
    }

    transporterForUser.sendMail(UserOptions, (error, info) => {   // For User
      if (error) {
        console.log('Error', error.message)
      } else {
        console.log('Email Sent Successfully To The User', info.response)

      }
    })
    transporterToMe.sendMail(MyOptions, (error, info) => {     // For Us 
      if (error) {
        console.log('Error', error.message)
      } else {
        console.log('Email Sent Successfully To Me', info.response)
      }
    })

    return res.status(200).json({ status: 'error', message: 'Data received' })

  } catch (error) {
    res.status(404).json({ error: error.message, message: 'Getting error while calling contact api' })
  }
})

module.exports = router;
