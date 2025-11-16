// Цени
const SERVICE_PRICES = {
  shpaklovka: 16,
  boya: 13,
  laminat: 18,
  plochki: 63,
  gipsokarton: 22,
  toploizolaciya: 35
};

const TRANSPORT = 60;

// Попълване на година
document.getElementById("year").textContent = new Date().getFullYear();

// КАЛКУЛАТОР
document.getElementById("calcBtn").addEventListener("click", async () => {
  const serviceLabel = document.querySelector("#serviceSelect option:checked").text;
  const service = document.getElementById("serviceSelect").value;
  const area = Number(document.getElementById("areaInput").value);
  const name = document.getElementById("clientName").value;
  const email = document.getElementById("clientEmail").value;
  const phone = document.getElementById("clientPhone").value;
  const resultBox = document.getElementById("calcResult");

  if (!area || !name || !email) {
    alert("Попълни всички полета!");
    return;
  }

  const price = SERVICE_PRICES[service] * area + TRANSPORT;

  resultBox.innerHTML = `Оферта: <b>${price} лв</b> (вкл. транспорт ${TRANSPORT} лв)`;

  // Изпращане имейл
  await fetch("/api/offer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceLabel,
      area,
      price,
      name,
      email,
      phone
    })
  });
});

// ЗАПАЗВАНЕ НА ЧАС
document.getElementById("bookingBtn").addEventListener("click", async () => {
  const name = document.getElementById("bookingName").value;
  const email = document.getElementById("bookingEmail").value;
  const phone = document.getElementById("bookingPhone").value;
  const service = document.getElementById("bookingService").value;
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  const notes = document.getElementById("bookingNotes").value;
  const result = document.getElementById("bookingResult");

  if (!name || !email || !phone || !date || !time) {
    alert("Попълни всички полета!");
    return;
  }

  await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name, email, phone, service, date, time, notes
    })
  });

  result.innerHTML = "Вашият час е запазен успешно!";
});


