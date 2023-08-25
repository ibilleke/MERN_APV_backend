import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) =>{
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
        subject: "Reestablece tu contraseña",
        text: "Reestablece tu contraseña",
        html: `<p>Bienvenido ${nombre}, a solicitado a reestablecer su contraseña.</p>
            <p>Sigue el siguiente enlace para generar una nueva contraseña, has clic en el siguiente enlace: <a href="${process.env.URL_FRONT}/olvide-password/${token}">Reestablecer Contraseña</a> </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

};

export default emailOlvidePassword;