/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');
const {autenticateToken} = require('../middleware/authJwt');
const jwt = require('jsonwebtoken');

// retrieve all records from database
router.get('/', autenticateToken, async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json({ succes: true, mess: "Found " + customers.length, payload: { data: customers } })
    } catch (err) {
        console.log(err);
    }
});

// save data in to database
router.post('/add', autenticateToken, async (req, res) => {
    const dateNow = Date.now();
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        istitution: req.body.istitution,
        presentation: req.body.presentation,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        created: dateNow,
        updated:dateNow,
    });
    try {
        const savedCustomer = await customer.save();
        res.json({ "success": true, mess: 'The user was created successfully', payload: {data:savedCustomer} });
    } catch (err) {
        if (err.keyPattern?.email && err.code == "11000") {
            res.status(401).json({ "success": false, mess: 'The email entered has already been used', payload: {error:err.code} });
            return;
        } else {
            console.log('error', err);
        }
    }
});

// retrieve an object for specific id
router.get('/:id', autenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.json({succes: true, mess: "The user has been creatred!", payload: {data:customer}});
    } catch (err) {
        res.json({succes: false, mess: "Error creating member!", payload: {error:err}});
    }
});

// update a specific document 
router.patch('/:id', autenticateToken, async (req, res) => {
    try {
        const dateNow = Date.now();
        const updatedCustomer = await Customer.updateOne({ _id: req.params.id }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                istitution: req.body.istitution,
                presentation: req.body.presentation,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                updated:dateNow
            }
        });
        res.json({succes: true, mess: "The user has been successfully updated", payload:{data:updatedCustomer} });
    } catch (err) {
        res.json({succes: false, mess: "Error updating data", payload: {error:err}});
    }
});

// delete specific document 
router.delete('/:id', autenticateToken, async (req, res) => {
    try {
        const deletedCustomer = await Customer.deleteOne({ _id: req.params.id });
        res.json({succes: true, mess: "The member are deleted!", payload: {data:deletedCustomer}});
    } catch (err) {
        res.json({succes: false, mess: "Error while suppressing member", payload: {error:err}});
    }
});

// retrieve an object for specific id
router.post('/login', async (req, res) => {
    try {
        Customer.findOne({ email: req.body.email }).exec(function (error, Customer) {
            if (error) {
                res.json({ succes: false, mess: error, payload: { error: 'dberror' } })
            } else if (!Customer) {
                res.json({ succes: false, mess: "Email invalid!", payload: { error: 'email' } })
            } else {
                Customer.comparePassword(req.body.password, function (matchError, isMatch) {
                    if (matchError || !isMatch) {
                        res.json({ succes: false, mess: "Password invalid!", payload: { error: 'password' } })
                    } else {
                        const token = jwt.sign({
                            _id:Customer._id, 
                            firstName:Customer.firstName,
                            lastName:Customer.lastName,
                            role:Customer.role
                            }, "klmtprtus");
                        res.json({ succes: true, mess: "You are loggedi in", payload: { "authToken": token } })
                    }
                })
            }
        })
    } catch (err) {
        res.status(500).json({ succes: false, mess: err, payload: { error: err } })
    }
});

module.exports = router;

