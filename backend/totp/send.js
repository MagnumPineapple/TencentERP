/***********************************
 *  Envía el TOTP generado al medio indicado(correo, sms, etc)
 ********************************
 */


const gen =  require('../totp/gen.js');
const sendMethods = require('../email_api/sendMethods.js');

// email asociado al OTP y al cual se envia el mismo OTP
var email = 'refij17203@estudys.com';
var TOTP = gen.setTOTP(email); // el email es el elemento asociado
var contexto = 'Recuperación de contraseña';

var params = {
    from: "",
    to: email,
    subject: 'Código generado | Tencent ERP', // el asunto cambiará segun contexto, depende si es recuperar contraseña, verificar, etc.
    text: "El código generado es " + TOTP.value,
    html: "<h2>" + contexto + "</h2><p> El código generado es " + TOTP.value + "</p>"
};

sendMethods.sendMail("gmail", params);
  
