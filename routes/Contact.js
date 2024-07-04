require('dotenv').config();
const express = require('express')
const router = express.Router();
const Contact = require('../model/contectSchema')
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

router.post('/contact', [
  body('email', 'Please enter a valid email').isEmail(),
  body('name', 'Please enter a valid name').isLength({ min: 5 }),
],
  async (req, res) => {

    const { name, email, subject, description } = req.body
    if (!name || !email || !subject || !description) {
      return res.status(422).json({ status: 'error', message: 'Please fill all the fields' })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array(), message: errors.array().map(err => err.msg).toString() });
    }
    try {
      const data = await new Contact({
        name,
        email,
        subject,
        description
      })
      await data.save()


      // send email functionality >>>


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
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });


      // Send Mail and body

      // Options for getting user info/message by email
      const MyOptions = {         // For Us
        from: "karanpal03040@gmail.com",
        to: "karandeveloper03040@gmail.com",
        subject: `${name} send a message from Portfolio`,
        html: `<h3>Client's Name: ${name}</3><br><h3>Client's Email: ${email}</3><br><h3>Subject:  ${subject}</3><br><h3> Message:</3> <p>${description}</p>`
      }
      // Options for sending mail to the user
      const UserOptions = {         //For USer
        from: "karanpal03040@gmail.com",
        to: email,
        subject: 'Thank you for sending message!',
        html: `
      <p>
      Dear ${name}, <br><br>
      Thank you for reaching out to me. I have received your message and would like to acknowledge your inquiry. <br><br>
      I appreciate your interest in my services and am committed to providing you with a prompt and satisfactory response.<br>

      we will make every effort to address your concerns, or requests in a timely manner. <br>
      and we aim to respond to all inquiries within 24 hours.<br><br>

      I value your time and look forward to assisting you further.<br><br> 
      If you have any urgent matters or require immediate assistance, please don't hesitate to contact me at 8869012507<br><br> 

      Best regards,<br><br>

      Karan Pal<br>
      Software Developer<br>
      karanpal03040@gmail.com<br>
      +91886912507<br>
      </p>
      `
      }
      await new Promise((resolve, reject) => {
        transporterForUser.sendMail(UserOptions, (error, info) => {   // For User
          if (error) {
            console.log('Error', error.message)
            reject(err);
          } else {
            // console.log('Email Sent Successfully To The User', info.response)
            resolve(info);
          }
        })
      })

      await new Promise((resolve, reject) => {
        transporterToMe.sendMail(MyOptions, (error, info) => {     // For Us 
          if (error) {
            console.log('Error', error.message)
            reject(error);
          } else {
            // console.log('Email Sent Successfully To Me', info.response)
            resolve(info);
          }
        })
      })



      return res.status(200).json({ status: 'success', message: 'Message sent successfully ❤' })
    } catch (error) {
      res.status(422).json({ error: error.message, message: 'Getting error while calling contact api' })
    }
  })

module.exports = router;
