const { profile } = require("console");
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
    res.render('signin', { "error": "" })
})

//Get signup page of specific username
app.get('/signup', (req, res) => {
    res.render('signup', { "errorMessage": "" })
})

//Get Fuel Quote page
app.get('/fuelquote/:username', (req, res) => {
    const { username } = req.params
    res.render('FuelQuote', { "username": username })
})

app.get('/fuelquote/:username/:gallon/:state/:price/:discount', async (req, res) => {
    const username = req.params.username
    const gallon = req.params.gallon
    const state = req.params.state
    const price = req.params.price
    const discount = req.params.discount
    try {
        let data = await client.query(`SELECT address1,city,state from profiles where username='${username}'`)
        let address = data.rows[0].address1 + ", " + data.rows[0].city + ", " + data.rows[0].state
        res.render('FuelQuote', { "username": username, "gallon": gallon, "state": state, "price": price, "address": address, "discount": discount })
    }
    catch (e) {
        console.log(e)
    }

})
//Get Fuel Quote History page
app.get('/history/:username', async (req, res) => {
    const { username } = req.params
    try {
        let data = await client.query(`SELECT * from HISTORY WHERE username='${username}'`)
        res.render('FuelQuoteHistory', { "username": username, "data": data.rows })
    }
    catch (e) {
        console.log(e)
    }

})

//Profile of username request
app.get('/profile/:username', (req, res) => {
    const { username } = req.params
    res.render('profile', { "username": username })
})

app.get('/modifyProfile/:username', async (req, res) => {
    const { username } = req.params
    let data = await client.query(`SELECT * FROM PROFILES WHERE USERNAME='${username}'`)
    let fullname = data.rows[0].fullname
    let address1 = data.rows[0].address1
    let address2 = data.rows[0].address2
    let city = data.rows[0].city
    let state = data.rows[0].state
    let zipcode = data.rows[0].zipcode

    res.render('profile', { "username": username, "fullname": fullname, "address1": address1, "address2": address2, "city": city, "state": state, "zipcode": zipcode })
})

//Signup request
app.post('/signup', async (req, res) => {
    let account = req.body
    let password = encryption(account.password)
    try {
        await client.query(`INSERT INTO ACCOUNTS VALUES('${account.username}','${password}','${account.email}')`)
        res.redirect(`/profile/${account.username}`)
    }
    catch (e) {
        res.render('index', { "errorMessage": "Username or Email is already signed up!" })
    }
})

//Profile Management request
app.post('/profile', async (req, res) => {
    let profile = req.body
    // console.log(profile)
    try {
        await client.query(`INSERT INTO PROFILES VALUES('${profile.username}','${profile.fullName}','${profile.address_1}','${profile.address_2}','${profile.city}','${profile.state}','${profile.zipcode}')`)
        res.redirect(`/fuelquote/${profile.username}`)
    }
    catch (e) {
        console.log(e)
    }

})

app.post('/modifyProfile', async (req, res) => {
    let profile = req.body
    try {
        await client.query(`UPDATE PROFILES SET FULLNAME = '${profile.fullName}',ADDRESS1='${profile.address_1}',ADDRESS2='${profile.address_2}',CITY='${profile.city}',STATE='${profile.state}',ZIPCODE='${profile.zipcode}' WHERE USERNAME='${profile.username}'`)
        res.redirect(`/fuelquote/${profile.username}`)
    }
    catch (e) {
        console.log(e)
    }
})


//Signin request
app.post('/signin_request', async (req, res) => {
    let account = req.body
    let usernameList = []
    try {
        let data = await client.query(`SELECT USERNAME FROM ACCOUNTS`)

        for (user of data.rows) {
            usernameList.push(user.username)
        }
        for (username of usernameList) {
            if (username == account.username) {
                let password_data = await client.query(`SELECT PASSWORD FROM ACCOUNTS WHERE USERNAME='${account.username}'`)
                if (password_data.rows[0].password == encryption(account.password)) {
                    res.redirect(`/fuelquote/${username}`)
                }
                else {
                    res.render('signin', { "error": "Username or password is not correct!" })
                }
                break
            }
        }
        res.render('signin', { "error": "Username or password is not correct!" })
    }
    catch (e) {
        console.log(e)
    }

})


//Helper functions to encrypt or decrypt
function findKeyStream(plain_text, key) {
    let key_size = key.length;
    // console.log(key_size)
    let S = []
    let K = []
    for (let i = 0; i < 256; i++) {
        S.push(i)
    }
    for (let i = 0; i < 256; i++) {
        let j = i % key_size
        K.push(key.charCodeAt(j))
    }

    let j = 0
    for (let i = 0; i < 256; i++) {
        j = (j + S[i] + K[i]) % 256
        let temp = S[i]
        S[i] = S[j]
        S[j] = temp
    }

    let text_size = plain_text.length;
    let index
    let t
    let keyStream = []
    for (let i = 0; i < text_size; i++) {
        index = i
        index = (index + 1) % 256
        j = (j + S[index]) % 256
        let temp = S[index]
        S[index] = S[j]
        S[j] = temp
        t = (S[index] + S[j]) % 256
        keyStream.push(S[t])
    }
    return keyStream
}
function encryption(password) {
    let key = "project"
    let keyStream = findKeyStream(password, key)
    let encode = ""

    for (let i = 0; i < password.length; i++) {
        encode += (keyStream[i] ^ password.charCodeAt(i)).toString(16)
        encode += " "
    }
    return encode
}

function decryption(password) {
    let key = "project"
    password = encryption("Hello World!")
    let keyStream = findKeyStream(password, key)
    str_list = password.split(" ")
    str_list.splice(-1, 1)
    let plain_text = ""

    for (let i = 0; i < str_list.length; i++) {
        plain_text = plain_text + String.fromCharCode(parseInt(str_list[i], 16) ^ keyStream[i])
    }
    return plain_text
}

app.get('/checkPrice', async (req, res) => {
    try {
        let gallon = req.query.gallon
        let state = req.query.state
        let pricePerGallon = 1.50;
        let locfactor = 0.04;
        var hisfactor, gallnumTax, cumprofit, totalprice;
        // gallnum = Number(document.price.gallonsRequested.value);


        if (state == 'Texas') {
            locfactor = 0.02;
        }
        hisfactor = 0
        let discount = 0
        let data = await client.query(`SELECT COUNT(*) FROM HISTORY WHERE USERNAME='${req.query.username}'`)
        if (data.rows[0].count > 0) {
            hisfactor = 0.01
            discount = 1
        }

        gallnumTax = 0.02;
        if (gallon > 1000) {
            gallnumTax = 0.03;
        }
        cumprofit = 0.1;
        let suggestPricePerGallon = ((locfactor - hisfactor + gallnumTax + cumprofit) * pricePerGallon) + pricePerGallon;
        res.redirect(`/fuelquote/${req.query.username}/${gallon}/${state}/${suggestPricePerGallon}/${discount}`)
    }
    catch (e) {
        console.log(e)
    }

})

app.post('/placeOrder', async (req, res) => {
    let data = req.body
    let date = req.body.Month + " " + req.body.Day + ", " + req.body.Year
    try {
        await client.query(`INSERT INTO HISTORY VALUES ('${req.body.username}','${req.body.gallon}','${date}','${req.body.totalPrice}','${req.body.pricePerGallon}')`)
        res.redirect(`/history/${req.body.username}`)
    }
    catch (e) {
        console.log(e)
    }
})

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000!")
})
