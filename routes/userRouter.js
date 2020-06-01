var express = require('express');
var userRouter = express.Router();
var User = require('../model/user');
var bodyParser = require('body-parser');
express.use(bodyParser.json());

userRouter.post('/register',(req,res,next) =>{
    User.findOne({email:req.body.email})
    .then((user) =>{
        if(user==null){
            var email = req.body.email;
            function validateEmail(email){
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
                {
                  return (true);
                }
            }
            if(validateEmail()){
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age
            });
            newUser.save()
            .then((user) =>{
                if(user!=null){
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({status: "Successfully registered"});
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json({status: "Something went wrong"});
                }
            },(err) => next(err))
            .catch((err) =>{
                next(err);
            });
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({status: "Invalid email"});
        }

        }
        else {
            var error = new Error('User with this email alredy exists');
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({err: error});
        }
    },(err) => next(err))
    .catch((err) =>{
        next(err);
    });
});