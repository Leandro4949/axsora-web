const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const OWNER_EMAIL = "leobalashkov84@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_GMAIL@gmail.com",
    pass: "YOUR_APP_PASSWORD"
  }
});

// Калкулатор
app.post("/api/offer", async (req, res) => {
  const { serviceLabel, area, price, name, email, phone } = req.body;

  try {
    // към клиента
    await transporter.sendMail({
      from: "Axsora Holding",
      to: email,
      subject: "Вашата оферта",
      html: `
        <h2>Вашата оферта е готова</h2>
        <p>Услуга: ${serviceLabel}</p>
        <p>Квадратура: ${area} кв.м</p>
        <p><strong>Цена: ${price} лв</strong></p>
      `
    });

    // към собственика
    await transporter.sendMail({
      from: "Axsora Holding",
      to: OWNER_EMAIL,
      subject: "Нова оферта",
      html: `
        <h3>Клиент направи калкулация:</h3>
        <p>Име: ${name}</p>
        <p>Имейл: ${email}</p>
        <p>Телефон: ${phone}</p>
        <p>Услуга: ${serviceLabel}</p>
        <p>Цена: ${price} лв</p>
      `
    });

    res.json({ ok: true });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: true });
  }
});

// Запазване на час
app.post("/api/booking", async (req, res) => {
  const { name, email, phone, service, date, time, notes } = req.body;

  try {
    await transporter.sendMail({
      from: "Axsora Holding",
      to: email,
      subject: "Вашата резервация е получена",
      html: `
        <h2>Потвърждение</h2>
        <p>Дата: ${date}</p>
        <p>Час: ${time}</p>
      `
    });

    await transporter.sendMail({
      from: "Axsora Holding",
      to: OWNER_EMAIL,
      subject: "Нова резервация",
      html: `
        <h3>Нова заявка:</h3>
        <p>Име: ${name}</p>
        <p>Услуга: ${service}</p>
        <p>Дата: ${date}</p>
        <p>Час: ${time}</p>
      `
    });

    res.json({ ok: true });

  } catch (e) {
    res.status(500).json({ error: true });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
