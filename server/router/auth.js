const express = require('express');
const app = express()
const router = express.Router();
require("../db/conn");
const Shop = require('../model/ShopuserSchema');
const Products = require('../model/Addproduct');
const Email = require('../model/email');
const Consumer = require('../model/ConsumerUserSchema');
const bcrypt = require('bcryptjs')
const cors = require("cors");
const authenticate = require('../middleware/authenticate');
const consumerauthenticate = require('../middleware/consumerauthenticate');
const idauthenticate = require('../middleware/idauth');
const cookieParser = require('cookie-parser');
const Token = require("../model/verifytoken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const uploads = require("../middleware/upload")
app.use(cors());
app.use(cookieParser())

// Registering a school
router.post('/signup-seller', async (req, res) => {
    const { name, shop, lane, locality, state, pincode, phonenumber, email, password } = req.body;
    console.log(req.body)
    // Checking if any field is blank
    if (!name || !shop || !lane || !locality || !state || !pincode || !phonenumber || !email || !password) {
        console.log("Cannot retrieve data as field is/ are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }

    try {
        // Checking if a user with an email already exists
        const userExist = await Shop.findOne({ email: email });
        console.log(userExist)
        if (userExist) {
            return res.status(422).json({ error: "The email Id already exists" });
        }

        // Registering a new user 
        const user = new Shop(req.body);

        // Checking that registration successful or failed
        try {
            await user.save();

            res.status(201).json({ message: "User registered successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to register" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
});


// Making a School Login
router.post('/usersignin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Checking if any field is blank
        if (!email || !password) {
            console.log("Cannot cannot retrieve data as a field is blank")
            return res.status(422).json({ error: "None of the fields can be blank" });
        }

        // Checking if a user with an email exists
        const userLogin = await Shop.findOne({ email: email });


        if (userLogin) {
            const isMatch = await bcrypt.compare(password + "23945", userLogin.password)

            // Saving a JWT in cookie
            const token = await userLogin.generateAuthToken();
            console.log(token)

            console.log(isMatch)

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            })
            if (!isMatch) {
                res.status(400).json({ error: "Incorrect credential" })

            } else {
                res.json({ message: "Login successful              Your JWT: " + token })
            }

        } else {
            res.status(400).json({ error: "Incorrect credential" })
        }

    } catch (error) {
        console.log(error);
    }
});



// Get Request: Retrieve School Profile Info
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// Get Request: Retrieve School Profile Info
router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// Post Request: Add admisson form in school database
router.post('/addproduct', authenticate, async (req, res) => {
    console.log(req.body)

    const { pname, pmodel, psize, pprice, pdescription} = req.body;
    // Checking if any field is blank

    if (!pname || !pmodel || !psize || !pprice || !pdescription) {
        console.log("Cannot add data as a field is/are blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }
    try {

        // Adding a new admission form
        const product = new Products({
            pname, pmodel, psize, pprice, user: req.rootUser._id, pdescription});
        // Checking that adding successful or failed
        try {
            await product.save();

            res.status(201).json({ message: "Product added successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to add" });
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
})



router.post('/sendEmail', authenticate, async (req, res) => {
    const { cname, cemail, cmessage } = req.body;
    // Checking if any field is blank
    if (!cname || !cemail || !cmessage) {
        console.log("Cannot retrieve data as a field is blank")
        return res.status(422).json({ error: "None of the fields can be blank" });
    }
    try {

        // Adding a new admission form
        const email = new Email({
            cname, cemail, cmessage, user: req.rootUser._id});
        // Checking that adding successful or failed
        try {
            await email.save();

            res.status(201).json({ message: "Message sent successfully" });

        } catch (error) {
            res.status(500).json({ error: "Failed to send message" });
            // console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
})


// Get Request: retrieve specific admission request made by a parent (school end)
router.get('/getallitem', authenticate, idauthenticate, async (req, res) => {
    // Getting school name
    // console.log(req.rootUser)
    const shopname = await Shop.findOne(req.rootUser)
    // console.log(shopname._id)

    // Using School name to find admission request in database
    try {
        const allitem = await Products.find({ user: shopname._id })
        // console.log(allitem)
        res.status(200).json(allitem)
    } catch (error) {
        res.status(417).json({ error: "Failed to retrieve data" });
    }

})
router.get('/getsingleitem', authenticate, idauthenticate, async (req, res) => {
    // Getting school name
    const itemsid = req.cookies.itemid
    const shopname = await Shop.findOne(req.rootUser)
    // console.log(shopname._id)

    // Using School name to find admission request in database
    try {
        const singleitem = await Products.find({ user: shopname._id, _id: itemsid})
        // console.log(allitem)
        res.status(200).json(singleitem)
    } catch (error) {
        res.status(417).json({ error: "Failed to retrieve data" });
        console.log(error)
    }

})

// Logging out a user
router.get('/logout', (req, res) => {
    console.log("Logout Page");
    res.clearCookie('jwtoken', { path: "/" })
    res.clearCookie('itemid', { path: "/" })
    res.status(200).send("User Logged out")
})

router.post('/delete',  async (req, res) => {
    // Getting school name
    const itemsid = req.cookies.itemid
    console.log(itemsid)
    // console.log(shopname._id)

    // Using School name to find admission request in database
    try {
        const singleitem = await Products.deleteOne({ _id: itemsid})

        res.status(200).json("Data deleted successfully")
    } catch (error) {
        res.status(417).json({ error: "Failed to retrieve data" });
        console.log(error)
    }

})



module.exports = router;