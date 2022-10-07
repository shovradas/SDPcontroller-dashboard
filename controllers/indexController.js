'use strict';

const validator = require('../validators/validator');
const userService = require('../services/userService');

exports.index = async (req, res) =>{
    return res.redirect('/login');
}

exports.loginGet = async (req, res) =>{
    return res.render('login', {
        layout: false,
        title: 'Login'
    });
}

exports.loginPost = async (req, res) =>{
    let obj = {
        username: req.body.username,
        password: req.body.password
    }

    let validationResult = validator.validate(obj, 'account', 'login');
    if(validationResult !== true){
        return res.render('login', {
            layout: false,
            title: 'Login',
            obj: obj,
            error: validationResult            
        });
    }

    let validUser = await userService.authenticate(obj.username, obj.password);    
    if(validUser){
        let user = await userService.getByUsername(obj.username);
        user.profileImg = '/img/undraw_profile.svg';
        req.session.user = user;

        console.log(user);

        return res.redirect('/dashboard');
    }
    
    return res.render('login', {
        layout: false,
        title: 'Login',
        obj: obj,
        message: {status: 'error', text: 'Invalid credentials'}
    });
    
}

exports.logout = async (req, res) =>{
    req.session.destroy((err) => { console.log('Session destroyed'); });
    return res.redirect('/login');    
}

exports.dashboard = (req, res) =>{
    res.render('dashboard', {
        title: 'Overview',
        moduleRoute: '/dashboard'
    });
}

exports.fourOFour = (req, res) =>{
    res.render('404', {layout: false, title: '404'})
}
