const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })

require('dotenv').config();

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")

const database = require("./config/database");
const systemConfig = require("./config/system");

const app = express()
const port = process.env.PORT;

database.connect();

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

// flash
app.use(cookieParser('asdasdajy'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end flash


app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')


//App local variables:
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`))


route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})