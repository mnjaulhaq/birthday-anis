// OPENING
function openSurprise() {
  document.getElementById("opening").style.display = "none";
  document.getElementById("music").play();
  confetti({ particleCount: 200, spread: 100 });
}

// COUNTDOWN
const cd = document.getElementById("countdown");
if (cd) {
  setInterval(() => {
    const target = new Date("January 28, 2026").getTime();
    const now = Date.now();
    const diff = target - now;
    cd.innerHTML =
      diff > 0
        ? Math.floor(diff / 86400000) + " hari menuju ulang tahun 🎉"
        : "Hari ini ulang tahun Anis 🎂💖";
  }, 1000);
}

// LOVE BAR
const bar = document.getElementById("loveBar");
if (bar) {
  let w = 0;
  const interval = setInterval(() => {
    if (w >= 100) clearInterval(interval);
    bar.style.width = ++w + "%";
  }, 40);
}

// PIN
function checkPin() {
  const pin = document.getElementById("pin").value;
  if (pin === "012313") {
    location.href = "message.html";
  } else {
    alert("PIN salah 💔");
  }
}

// TYPING
const text = `Anis, selamat ulang tahun ke-20.
Semoga hidupmu selalu dipeluk bahagia,
dan setiap harimu dihiasi senyum.
Terima kasih sudah menjadi Anis yang luar biasa.`;

let i = 0;
const typing = document.getElementById("typing");
if (typing) {
  const t = setInterval(() => {
    typing.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) clearInterval(t);
  }, 45);
}

// ANSWER
function answer(type) {
  if (type === "yes") {
    confetti({ particleCount: 300, spread: 120 });
    alert("Aku sangat bahagia 💖");
  } else {
    alert("Jawabanmu tetap manis 🙈💗");
  }
}
