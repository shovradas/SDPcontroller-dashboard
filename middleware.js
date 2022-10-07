'use strict';

exports.authenticate = (req, res, next) => {
    res.locals.user = {
        last_name: 'Admin',
        first_name: 'Dev',
        profileImg: '/img/undraw_profile.svg'
    };
    return next();

    const urls = [
        '/',
        '/login',
        '/logout'
    ];

    if (urls.includes(req.originalUrl) && !req.session.user)
        return next();
    
    if(!req.session.user){
        return res.redirect('/login');
    }
    
    res.locals.user = req.session.user;    
    return req.originalUrl == '/login' ? res.redirect('/dashboard'): next();
}
