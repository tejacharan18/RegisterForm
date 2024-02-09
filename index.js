const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = process.env.PORT || 3200;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

mongoose.connect(process.env.URL)
    .then(() => {
        console.log("Mongodb Connected");
    })
    .catch((error) => {
        console.log(`${error}`);
    })
const registerationSchema = new mongoose.Schema({
    roll: String,
    username: String,
    email: String,
    password: String,
    phone: Number

})
const Register = mongoose.model("Registration", registerationSchema);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/htmlPages/index.html");
})

app.post('/register', async (req, res) => {
    try {
        const { roll, username, email, password, phone } = req.body;
        const exist = await Register.findOne({ email: email });
        if (!exist) {
            const registerData = new Register({
                roll,
                username,
                email,
                password,
                phone

            });
            await registerData.save();
            res.redirect("/success");

        }

        else {
            console.log("eee");
        }
    }
    catch (error) {
        console.log(error);
        res.redirect("/error");
    }
})
app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/htmlPages/success.html");
})
app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/htmlPages/error.html");
})
app.listen(port, () => {

    console.log(`server Running At ${port}`);
})

