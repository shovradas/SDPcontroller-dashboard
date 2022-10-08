
'use strict';

var da = require("../dataAccess");
var sdpidService = require("../services/sdpidService");
var credentialMaker = require('../sdpCredentialMaker');
var config = require('../config.js');

var myCredentialMaker = new credentialMaker(config);

exports.generateCredential = async (sdpid, callback) => {
    let memberDetails = await sdpidService.getById(sdpid);

    return myCredentialMaker.getNewCredentials(memberDetails, async (err, data) => {
        if (err) {
            console.error(err);
            console.error("Failed to make credentials for SDP ID " + memberDetails.sdpid + ". Exiting.");
        } else {
            if (config.debug)
                console.log("Credential Maker returned without error.");

            var updated = new Date();
            var expires = new Date();
            expires.setDate(expires.getDate() + config.daysToExpiration);
            expires.setHours(0);
            expires.setMinutes(0);
            expires.setSeconds(0);
            expires.setMilliseconds(0);

            // Updating database
            let sql = `UPDATE sdpid SET encrypt_key=?, hmac_key=?, last_cred_update=?, cred_update_due=? WHERE sdpid=?`;
            await da.executeQuery(sql, [data.spa_encryption_key_base64, data.spa_hmac_key_base64, updated, expires, memberDetails.sdpid]);

            return callback(data);
        }
    });
}