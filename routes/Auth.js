const express = require('express')
const router = express.Router();
const Contact = require('../model/contectSchema')

router.post('/contact', async (req, res) => {
  const { name, email, subject, description } = req.body
  try {
    if (!name || !email || !subject || !description) {
      return res.status(404).json({ status: 'error', message: 'Please fill all the fields' })
    } else {
      const data = await new Contact({
        name: name,
        email: email,
        subject: subject,
        description: description
      })
      return res.status(200).json({ status: 'error', message: 'Data received' })
    }
  
  } catch (error) {
    res.status(404).json({ error: error.message, message: 'Getting error while calling contact api' })
  }
})

module.exports = router;
