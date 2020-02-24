import nodemailer from "nodemailer";

function sendEmail(title, content, recipent, auth) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: auth.user,
            pass: auth.pass
        },
        proxy: auth.proxy

    });

    var mailOptions = {
        from: auth.user,
        to: recipent,
        subject: title,
        html: content
    };

    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export let emailService = {
    sendEmail:sendEmail
};


