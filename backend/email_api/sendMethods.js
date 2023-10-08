require('dotenv').config({ path: '../.env' });
const nodeMailer = require('nodemailer');

var message = function(f, t, s, tx, h) {
  return {
    from: f,
    to: t,
    subject: s,
    text: tx,
    html: h
  };
}

class Method {
    
    config;
    transporter;

    constructor() {
    }

    setConfig(cfg) {
      this.config = cfg;
    }

    setTransporter() {
      this.transporter = nodeMailer.createTransport(this.config);
    }

    sendMail(message) { // message object

      this.transporter.sendMail(message)
      .then(() => {
       console.log('Mensaje enviado correctamente.');
      })
      .catch(e => {
       console.log('Error: ' + e);
      });

    }
    
}

class Gmail extends Method {
  
  constructor(u, p) {
    super();
   
    var cfg = {
      service: 'gmail',
      auth: {
        user: u,
        pass: p
      }
    };

    this.setConfig(cfg);
    this.setTransporter();

  }

}

var sendMail = function(method, params) {

  switch(method) {
    case 'gmail':

        // gmail reemplaza el campo from por el autenticado, por tanto este from pasado no tendrá efecto
        var msg = message(params.from, params.to, params.subject, params.text, params.html);
        var gmail = new Gmail(process.env.GMAIL_EMAIL, process.env.GMAIL_PASSWORD);

        gmail.sendMail(msg);

    default:
        return -1;
  }

}

module.exports = {sendMail}