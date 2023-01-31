const nodemailer = require('nodemailer');
const ejs = require('ejs');
const { google } = require('googleapis');
const path = require("path");

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;
const Mailing = {};
const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);

/**
 * Send Email
 */
Mailing.sendEmail = function (data) {
    return new Promise(async (resolve, reject) => {

        oauth2Client.setCredentials({
            refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
        });
    
        const accessToken = await oauth2Client.getAccessToken();
    
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL_ADDRESS,
                clientId: MAILING_SERVICE_CLIENT_ID,
                clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                accessToken,
            },
        });
    
        const filePath = path.resolve(`./templates/${data.template}.ejs`);
    
        let error = ejs.renderFile(filePath, data, {}, (e, content) => {
            if (e) return e;
            const mailOptions = {
                from: SENDER_EMAIL_ADDRESS,
                to: data.email,
                subject: data.subject,
                html: content,
            };
            smtpTransport.sendMail(mailOptions, (err, info) => {
                if (err) reject(err);
                resolve(info)
            });
        });
    
        if(error) reject(error);
    })
}

module.exports = Mailing;