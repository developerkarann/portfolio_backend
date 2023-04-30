const express = require('express')
const router = express.Router();
const Contact = require('../model/contectSchema')

router.post('/contact', async (req, res) => {
    // const { name, email, subject, description } = req.body;
  
    // if (!name || email || subject || description ) {
    //   // res.send({data: "Not found please fill the data"})
    // }
    try {
        // const userContact = new Contacts({
        //   name, email, subject, description
        // })
        // await userContact.save();
        // res.status(201).json(userContact)
        // console.log(userContact);    
        
        await Contact.create({
          name: req.body.name,
          email: req.body.email,
          subject: req.body.subject,
          description: req.body.description
        })
        res.json({success: true})

    } catch (error) {
      res.json({ error: "Found some error" })
    }
  })

  module.exports = router;
