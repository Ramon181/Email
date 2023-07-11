require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { USER, PASS } = process.env

const app = express();
const port = 8000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: USER, // Reemplaza con tu dirección de correo
            pass: PASS, // Reemplaza con tu contraseña de correo
        },
    });

    const mailOptions = {
        from: correo,
        to: USER, // Reemplaza con la dirección de correo del destinatario
        subject: asunto,
        text: `Nombre: ${nombre}\nEmail: ${correo}\nMensaje: ${mensaje}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente');
        }
    });
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});