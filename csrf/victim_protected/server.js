const express = require('express');
const fs = require('fs');
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');

const PORT_NUMBER = 4000;

var csrfProtection = csurf({ cookie: true });

let ORDERS = [];

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get('/', csrfProtection, function(req, res) {
    const expires = new Date(Date.now() + 900000);

    // httpOnly doesn't protect us from this attack, but sameSite does
    res.cookie(`SESSION_COOKIE`,`Maryna`, {
        expires,
        // httpOnly: true,
        // sameSite: true
    });

    fs.readFile(path.resolve(__dirname, './index.html'), 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data = `<meta content="${req.csrfToken()}" name="csrf-token" />` + data;

        res.send(data);
    });
});

app.post('/buy', csrfProtection, function(req, res) {
    // check user session
    if (req.cookies.SESSION_COOKIE === 'Maryna') {
        ORDERS.push({ ...req.body, buyer: 'Maryna' });
        res.json({status: 'success', msg: 'You ordered successfully!', payload: {
                orders: ORDERS
            } })
    } else {
        res.json({status: 'failed', msg: 'User not logged in.'})
    }
});

app.listen(PORT_NUMBER, () => {
    console.log(`Victim listening at http://victim.com:${PORT_NUMBER}`)
});
