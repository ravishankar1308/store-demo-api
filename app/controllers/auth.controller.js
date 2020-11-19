const config = require("../config/auth.config");
const User = require('../models/auth.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        await res.status(400).send("Email And Password required");
        return;
    }
    const emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    if (!emailRegexp.test(req.body.email)) {
        res.status(400).send('Email Not Valid');
    } else {
        User.create({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
        }, (err, user) => {
            if (err) return res.status(500).send(err.errmsg);
            var token = jwt.sign({id: user.id}, config.secret,
                {expiresIn: 864000}
            );
           return  res.status(201).send({access_token: token,token_type:"bearer",expires_in:86400});
        });
    }
};

exports.resolve = (req, res) => {
    try {
        const token = req.body.token;
        console.log(token)
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err)
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
            const id = decoded.id;
          return   res.send({id})
        });

    } catch (e) {
        res.status(500).send(e)
    }
};

exports.signin = async (req, res) => {
    await User.findOne({email: req.body.email}, async (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(401).send('Email not found.');

        var passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send('Incorrect Password');

        var token = await jwt.sign({id: user.id}, config.secret,
            {expiresIn: 864000 }
        );

        return res.status(200).send({access_token: token,token_type:"bearer",expires_in:86400});
    });
};

exports.findAll = (req, res) => {
    const email = req.query.email;
    const limit = req.query.limit;
    const condition = email ? {email: {$regex: new RegExp(email), $options: "i"}} : {};
    User.find(condition).limit(Number(limit))
        .then(data => {
           return res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        });
};
