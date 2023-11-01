<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const favoriteCoinRoutes = require('./routes/favoriteCoins');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/crypto-coin");

app.use('/users', userRoutes);
app.use('/favoriteCoins', favoriteCoinRoutes);

app.listen(3333, () => {
    console.log("Server is running");
});
=======
const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User.jsx')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
mongoose.connect("mongodb://127.0.0.1:27017/crypto-coin")

app.post("/login", (req, res) => {
    const { email, password } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        res.json("Success")
                    } else {
                        res.json("Şifre doğru değil")
                    }
                })
            }
        })
})

app.post('/register', (req, res) => {

    const { name, email, password } = req.body
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                //alert("Bu Email Zaten Mevcut!!!!!!!!!!!!")
                res.json("Bu Email Zaten Mevcut!!!")
                console.log("Bu Email Zaten Mevcut!!!!!!!!!!!!!!!")

            } else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        UserModel.create({ name, email, password: hash })
                            .then(users => res.json(users))
                            .catch(err => res.json(err))
                    }).catch(err => console.log(err.message))
            }
        })
})


app.listen(3001, () => {
    console.log("server is running")
})
>>>>>>> e210977b871f6f0dd83c3c0047e55e414d7e742d
