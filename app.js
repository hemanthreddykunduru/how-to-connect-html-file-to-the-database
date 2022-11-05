// express installation --npm install express----//

const express = require('express')
const app = express()
const port = 3000


/* -----------------mongoDB atlas connect----------------- */
//connecting to the database by using web url of mongodb
// for mongoose npm install mongoose

const mongoose = require('mongoose')

const url = `mongodb://<user name>:<password>@ac-xnspcon-shard-00-00.4kzlic5.mongodb.net:27017,ac-xnspcon-shard-00-01.4kzlic5.mongodb.net:27017,ac-xnspcon-shard-00-02.4kzlic5.mongodb.net:27017/?ssl=true&replicaSet=atlas-i3kylc-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database❤')
    })
    .catch((err) => {
        console.error(`Error occured while connecting to the database😢. n${err}`);
    })




//--- for connecting with mongodb compass we need paste the go to mongodb page and goto 
//CONNECT>MONOGODB COMPASS>copy link 
//open the MongoDBCompass app and >Connect>NewConnection>paste at URI >connect
//data is stored in the -- "test/details" -----------------//
/*---------------------------------------------------------*/



// css, js, any other (static files)
app.use(express.static(`public`))
app.use('/css', express.static(__dirname + 'public/css'))
//----------------------------------------------------//

// set views (ejs) by using ejs to connecting html
// for installation of ejs npm install ejs
// making of .html file into .ejs is most recommended

app.set('views', './views')
app.set('view engine', 'ejs')
//--------------------------------------------------//



/* -------------saving data from html using mongoose------------- */
const bodyParser = require('body-parser')
const ejs = require('ejs')
var Schema = mongoose.Schema

app.use(bodyParser.urlencoded({ extended: true }))

//--------------------------Schema-----------------------------//
var mySchema = new mongoose.Schema({
    username:String,
    email:String,
    contact:Number,
    password:String,
    cofirmpassword:String,
});
//-----------------------------------------------------------//


//-----Detail is the folder present in test in the mongodb----------//

var comments = mongoose.model('Detail', mySchema)

app.post('', (req, res) => {
    var info = {
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    }

    var instance = new comments(info)
    instance.save(function (err) {
        if (err) {
            console.log(`Error occurred ${err}`)
        } else {
            console.log('Done!')
        }
    })
    res.render('registration')
})
/*----------------------------------------------------------------*/




/* displaying main login step html file-----or----main html */
app.get('', (req, res) => {
    res.render('index')
})
app.get('/registration', (req, res) => {
    res.render('registration')
})
//-------------------------------------------------------------//

// --------------------Listen on port 3000-------------------//
app.listen(port, () => console.info(`Listening on port ${port}`))
