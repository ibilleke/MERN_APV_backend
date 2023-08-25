import nodemailer from 'nodemailer';

const emailRegistro = async (datos) =>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
    });

    const { email, nombre, token } = datos;

    //   Enviar el email
    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "comprueba tu cuenta en APV",
        html: `<p>Bienvenido ${nombre}, verifica tu dirreción de correo electrónico.</p>
            <p>Tenemos que verificar tu dirreción de correo electrónico antes de activar tu cuenta en APV, has clic en el siguiente enlace: <a href="${process.env.URL_FRONT}/confirmar/${token}">Comprobar cuenta</a> </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

};

export default emailRegistro;