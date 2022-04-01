const express = require("express");
const { ClientRequest } = require("http");
const path = require('path');
const pg = require('pg');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }))
//Connecting to database
const ClientClass = pg.Client
const pgUrl = "postgres://tzkxuprx:XMT7gfi4T69oSg5nmLWDlfZKaTnsBz5l@hansken.db.elephantsql.com/tzkxuprx"
const client = new ClientClass(pgUrl)
client.connect()


//Get homepage
app.get('/', (req, res) => {
    res.render('index')
})

//Get signin page
app.get('/signin', (req, res) => {
    res.render('signin')
})

//Get signup page of specific username
app.get('/signup', (req, res) => {
    res.render('signup', { "errorMessage": "" })
})

//Get Fuel Quote page
app.get('/fuelquote/:username', (req, res) => {
    res.render('FuelQuote')
})

//Get Fuel Quote History page
app.get('/fuelquotehistory', (req, res) => {
    res.render('FuelQuoteHistory')
})

//Profile of username request
app.get('/profile/:username', (req, res) => {
    const { username } = req.params
    res.render('profile', { "username": username })
})

//Signup request
app.post('/signup', async (req, res) => {
    account = req.body
    try {
        await client.query(`INSERT INTO ACCOUNTS VALUES('${account.username}','${account.password}','${account.email}')`)
        res.redirect(`/profile/${account.username}`)
    }
    catch (e) {
        res.render('index', { "errorMessage": "Username or Email is already signed up!" })
    }
})

//Profile Management request
app.post('/profile', async (req, res) => {
    profile = req.body
    // console.log(profile)
    try {
        await client.query(`INSERT INTO PROFILES VALUES('${profile.username}','${profile.fullName}','${profile.address_1}','${profile.address_2}','${profile.city}','${profile.state}','${profile.zipcode}')`)
        res.render('FuelQuoteHistory')
    }
    catch (e) {
        console.log(e)
    }

})


//Signin request
app.post('/signin_request', async (req, res) => {
    account = req.body
    let usernameList = []
    try {
        let data = await client.query(`SELECT USERNAME FROM ACCOUNTS`)

        for (user of data.rows) {
            usernameList.push(user.username)
        }
    }
    catch (e) {
        console.log(e)
    }
    for (username of usernameList) {
        if (username == account.username) {
            let password_data = await client.query(`SELECT PASSWORD FROM ACCOUNTS WHERE USERNAME='${account.username}'`)
            let password = password_data.rows[0].password
            if (password == account.password) {
                console.log("Right!")
                res.redirect(`/fuelquote/${account.username}`)
            }
            else {
                console.log("Wrong")
            }
        }
    }
})



// getUserName()


// module.exports = getUserName()






app.listen(3000, (req, res) => {
    console.log("Listening on port 3000!")
})
