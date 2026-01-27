// Tambahkan event listener global untuk 'pancingan' di Safari
document.body.addEventListener('click', () => {
    const music = document.getElementById("music");
    if (music && localStorage.getItem("musicPlaying") === "true" && music.paused) {
        music.play();
    }
}, { once: true }); // Hanya berjalan sekali klik saja per halaman

// ===== SISTEM MUSIK ANTI-RESET =====
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music"); // Pastikan ID di HTML adalah 'music'
  if (!music) return;

  // 1. Ambil posisi terakhir dari storage
  const savedTime = localStorage.getItem("musicCurrentTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }

  // 2. Cek apakah sebelumnya sedang diputar
  if (localStorage.getItem("musicPlaying") === "true") {
    music.play().catch(() => {
      console.log("Autoplay diblokir browser, musik akan jalan setelah interaksi pertama.");
    });
  }

  // 3. Simpan posisi detik musik SETIAP DETIK
  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicCurrentTime", music.currentTime);
    }
  }, 1000);

  // 4. Update status saat dimainkan
  music.onplay = () => {
    localStorage.setItem("musicPlaying", "true");
  };

  music.onpause = () => {
    localStorage.setItem("musicPlaying", "false");
  };
});

// Fungsi pembantu agar musik mulai jalan saat tombol pertama diklik
function playMusic() {
    const music = document.getElementById("music");
    if (music) {
        music.play();
        localStorage.setItem("musicPlaying", "true");
    }
}

// 🔒 LOCK MODE (INI SAJA YANG KAMU UBAH NANTI)

const LOCK_MODE = true; // true = terkunci | false = bebas

// OPENING
function openSurprise() {
  const music = document.getElementById("music");
  
  // Paksa play di sini, ini adalah momen interaksi pertama yang valid bagi Safari
  if (music) {
    music.play().then(() => {
      localStorage.setItem("musicPlaying", "true");
    }).catch(e => {
      console.log("Safari memerlukan interaksi manual");
    });
  }

  document.getElementById("opening").style.display = "none";
  confetti({ particleCount: 200, spread: 100 });
}


// COUNTDOWN WAKTU KEJUTAN (JAM : MENIT : DETIK)
const cd = document.getElementById("countdown");
const btnOpen = document.getElementById("btnOpen");

// 🔒 kondisi awal (kalau LOCK_MODE true)
if (btnOpen && LOCK_MODE) {
  btnOpen.disabled = true;
  btnOpen.innerHTML = "Kejutan Terkunci 🔒";
  btnOpen.className =
    "px-10 py-4 bg-gray-200 text-gray-400 font-bold rounded-full shadow-xl cursor-not-allowed";
}

// ⏰ countdown TETAP JALAN
if (cd && btnOpen) {
  const targetTime = new Date("January 28, 2026 00:00:00").getTime();

  const timer = setInterval(() => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      clearInterval(timer);

      cd.innerHTML = "Sekarang 💖 Saatnya Kejutan!";

      // 🔓 buka kunci
      btnOpen.disabled = false;
      btnOpen.innerHTML = "Buka Kejutan 💝";
      btnOpen.className =
        "px-10 py-4 bg-white text-pink-500 font-bold rounded-full shadow-xl animate-bounce";

      confetti({ particleCount: 200, spread: 120 });
      return;
    }

    const jam = Math.floor(diff / (1000 * 60 * 60));
    const menit = Math.floor((diff / (1000 * 60)) % 60);
    const detik = Math.floor((diff / 1000) % 60);

    cd.innerHTML =
      "Kejutan dibuka dalam " +
      `${jam.toString().padStart(2, "0")}:` +
      `${menit.toString().padStart(2, "0")}:` +
      `${detik.toString().padStart(2, "0")}`;
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
    location.href = "final.html";
  } else {
    alert("Jawabanmu tetap manis 🙈💗");
  }
}

// FINAL VIDEO
function showVideo() {
  const video = document.getElementById("finalVideo");
  if (video) {
    video.classList.remove("hidden");
    video.play();
    confetti({ particleCount: 400, spread: 150 });
  }
}

// GAME LOVE TAP 💖
// ===== GAME PERSEN CINTA 💖 =====
let persenCinta = 0;

function tapLove() {
  if (persenCinta < 100) {
    persenCinta += 10;
  }

  if (persenCinta > 100) {
    persenCinta = 100;
  }

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    scoreEl.innerText = "SEBERAPA SAYANG ANIS KE JAUL : " + persenCinta + "%";
  }

  // 💥 SAAT SUDAH 100%
  if (persenCinta === 100) {
    visualPuncak();
  }
}

function visualPuncak() {
  // confetti besar
  confetti({
    particleCount: 600,
    spread: 180,
    origin: { y: 0.6 },
  });

  // teks puncak
  const pesan = document.createElement("div");
  pesan.innerHTML = "💖 Cintanya Penuh 💖<br>Aku Juga Sayang Kamu 🫰 ";
  pesan.style.position = "fixed";
  pesan.style.top = "50%";
  pesan.style.left = "50%";
  pesan.style.transform = "translate(-50%, -50%)";
  pesan.style.background = "white";
  pesan.style.padding = "20px 30px";
  pesan.style.borderRadius = "20px";
  pesan.style.fontSize = "1.3rem";
  pesan.style.fontWeight = "bold";
  pesan.style.color = "#ec4899";
  pesan.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  pesan.style.zIndex = "9999";
  pesan.style.textAlign = "center";

  document.body.appendChild(pesan);

  // hilang pelan-pelan
  setTimeout(() => {
    pesan.remove();
  }, 4000);
}

// ===== AKHIR GAME PERSEN CINTA 💖 =====
