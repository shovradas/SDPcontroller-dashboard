'use strict';

const express = require('express');

const indexController = require('./controllers/indexController');
const accessController = require('./controllers/accessController');
const sdpidController = require('./controllers/sdpidController');
const serviceController = require('./controllers/serviceController');
const userController = require('./controllers/userController');
const groupController = require('./controllers/groupController');
const mqtttopicController = require('./controllers/mqtttopicController');

let router = express.Router();

router.get('/', indexController.index);
router.get('/login', indexController.loginGet);
router.post('/login', indexController.loginPost);
router.get('/logout', indexController.logout);
router.get('/dashboard', indexController.dashboard);
router.get('/404', indexController.fourOFour);

// routes for access
// service to client
router.get('/access/service/client', accessController.listServiceAccessToClient);
router.get('/access/service/:service_id/client/grant', accessController.grantServiceAccessToClientGet);
router.post('/access/service/:service_id/client/grant', accessController.grantServiceAccessToClientPost);
router.get('/access/:id/service/:service_id/client/revoke', accessController.revokeServiceAccessFromClientGet);
router.post('/access/:id/service/:service_id/client/revoke', accessController.revokeServiceAccessFromClientPost);
// service to group
router.get('/access/service/group', accessController.listServiceAccessToGroup);
router.get('/access/service/:service_id/group/grant', accessController.grantServiceAccessToGroupGet);
router.post('/access/service/:service_id/group/grant', accessController.grantServiceAccessToGroupPost);
router.get('/access/:id/service/:service_id/group/revoke', accessController.revokeServiceAccessFromGroupGet);
router.post('/access/:id/service/:service_id/group/revoke', accessController.revokeServiceAccessFromGroupPost);
// topic to client
router.get('/access/mqtttopic/client', accessController.listTopicAccessToClient);
router.get('/access/mqtttopic/:topic_id/client/grant', accessController.grantTopicAccessToClientGet);
router.post('/access/mqtttopic/:topic_id/client/grant', accessController.grantTopicAccessToClientPost);
router.get('/access/:id/mqtttopic/:topic_id/client/revoke', accessController.revokeTopicAccessFromClientGet);
router.post('/access/:id/mqtttopic/:topic_id/client/revoke', accessController.revokeTopicAccessFromClientPost);
// topic to group
router.get('/access/mqtttopic/group', accessController.listTopicAccessToGroup);
router.get('/access/mqtttopic/:topic_id/group/grant', accessController.grantTopicAccessToGroupGet);
router.post('/access/mqtttopic/:topic_id/group/grant', accessController.grantTopicAccessToGroupPost);
router.get('/access/:id/mqtttopic/:topic_id/group/revoke', accessController.revokeTopicAccessFromGroupGet);
router.post('/access/:id/mqtttopic/:topic_id/group/revoke', accessController.revokeTopicAccessFromGroupPost);
// topic to user
router.get('/access/mqtttopic/user', accessController.listTopicAccessToUser);
router.get('/access/mqtttopic/:topic_id/user/grant', accessController.grantTopicAccessToUserGet);
router.post('/access/mqtttopic/:topic_id/user/grant', accessController.grantTopicAccessToUserPost);
router.get('/access/:id/mqtttopic/:topic_id/user/revoke', accessController.revokeTopicAccessFromUserGet);
router.post('/access/:id/mqtttopic/:topic_id/user/revoke', accessController.revokeTopicAccessFromUserPost);


// routes for sdpid
router.get('/sdpid', sdpidController.list);
router.get('/sdpid/type/:type', sdpidController.listByType);
router.get('/sdpid/create', sdpidController.createGet);
router.post('/sdpid/create', sdpidController.createPost);
router.get('/sdpid/create/type/:type', sdpidController.createGet);
router.post('/sdpid/create/type/:type', sdpidController.createPost);
router.get('/sdpid/:id', sdpidController.detail);
router.get('/sdpid/:id/update', sdpidController.updateGet);
router.post('/sdpid/:id/update', sdpidController.updatePost);
router.get('/sdpid/:id/delete', sdpidController.deleteGet);
router.post('/sdpid/:id/delete', sdpidController.deletePost);


// routes for service
router.get('/service', serviceController.list);
router.get('/service/create', serviceController.createGet);
router.post('/service/create', serviceController.createPost);
router.get('/service/:id', serviceController.detail);
router.get('/service/:id/update', serviceController.updateGet);
router.post('/service/:id/update', serviceController.updatePost);
router.get('/service/:id/delete', serviceController.deleteGet);
router.post('/service/:id/delete', serviceController.deletePost);
router.get('/service/all/instance', serviceController.listInstance);
router.get('/service/:service_id/instance/create', serviceController.createInstanceGet);
router.post('/service/:service_id/instance/create', serviceController.createInstancePost);
router.get('/service/:service_id/instance/:id/update', serviceController.updateInstanceGet);
router.post('/service/:service_id/instance/:id/update', serviceController.updateInstancePost);
router.get('/service/:service_id/instance/:id/delete', serviceController.deleteInstanceGet);
router.post('/service/:service_id/instance/:id/delete', serviceController.deleteInstancePost);


// routes for user
router.get('/user', userController.list);
router.get('/user/create', userController.createGet);
router.post('/user/create', userController.createPost);
router.get('/user/:id', userController.detail);
router.get('/user/:id/update', userController.updateGet);
router.post('/user/:id/update', userController.updatePost);
router.get('/user/:id/delete', userController.deleteGet);
router.post('/user/:id/delete', userController.deletePost);


// routes for group
router.get('/group', groupController.list);
router.get('/group/create', groupController.createGet);
router.post('/group/create', groupController.createPost);
router.get('/group/:id', groupController.detail);
router.get('/group/:id/update', groupController.updateGet);
router.post('/group/:id/update', groupController.updatePost);
router.get('/group/:id/delete', groupController.deleteGet);
router.post('/group/:id/delete', groupController.deletePost);


// routes for mqtt
router.get('/mqtttopic', mqtttopicController.list);
router.get('/mqtttopic/create', mqtttopicController.createGet);
router.post('/mqtttopic/create', mqtttopicController.createPost);
router.get('/mqtttopic/:id', mqtttopicController.detail);
router.get('/mqtttopic/:id/update', mqtttopicController.updateGet);
router.post('/mqtttopic/:id/update', mqtttopicController.updatePost);
router.get('/mqtttopic/:id/delete', mqtttopicController.deleteGet);
router.post('/mqtttopic/:id/delete', mqtttopicController.deletePost);


router.all('*', (req, res)=>{ console.log('NO ROUTE MATCHED'); res.redirect('/404'); });

module.exports = router;