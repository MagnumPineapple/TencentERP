const f = require('../tencent_libs/funcs.js');

/* 
Chequea si el elemento es válido, ya sea email, número, etc.
Con validez hace referencia a que exista en la BD o que este bien escrito, formateado, etc.
*/
function isValidElem() {
 // to-do por falta de bd
 return true;
}

function genOTP() {

    const TOTP_length = 10;
 
    var TOTP = "";

    while(TOTP.length < TOTP_length) {
        let randChar = f.randInt(0, 35),
            charCode = randChar <= 9 ? 48 + randChar :
                   97 + randChar - 10; 

        TOTP += String.fromCharCode(charCode);
    }

    return TOTP;
}

/* aqui se determina el contexto de la generacion del TOTP
 por ejemplo, si la petición se hace desde https://localhost/forget.html
 entonces el contexto sería "forget password" y en ese caso, para cambiar la contraseña olvidada
 el TOTP duraría solo 90 segs.
*/
function getContext() {
 // to-do, por falta de backend
 return "forget password";
}

function getDuration() {
 var contexto = getContext();

 var tiempos_posibles = {
    "forget password": 90,
    "verify": 600,
    "default": 150
 };

 return tiempos_posibles[contexto] * 1e3 || tiempos_posibles.default * 1e3; // se devuelve en ms
}

// agregar OTP generado a la BD
function setTOTP(elem) {
 
 if(!isValidElem(elem)) {
        return -1;
 }   

 /*
  TOTP se genera con la base [a-z0-9], con distrb. de prob uniforme.
  La duración se genera según el contexto, p.e para cambiar contraseña el TOTP solo dura 90 segundos,
  para otros contextos podrá durar más o menos. 
 */
 var TOTP = genOTP(elem),
     duration = getDuration();

 var data = {
     elemento: elem,
     value: TOTP,
     expirationTime: Date.now() + duration, // ms
     used: false
    };

  //console.log(data);   
 
  //to-do por falta de BD...
 // bd.write(TOTP_table, data);   

  return data;
}

// ejemplo funcional:
//setTOTP("");

module.exports = {setTOTP}