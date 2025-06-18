// Ambil nama dari URL
const params = new URLSearchParams(window.location.search);
const guestName = params.get('to') || 'Tamu Undangan';
if (guestName) {
    const formattedName = decodeURIComponent(guestName.replace(/\+/g, ' '));
    document.querySelector('#cover p').innerHTML = `Kepada Yth. Bapak/Ibu/Saudara/i<br><strong>${formattedName}</strong>`;
}

// Scroll Animation
let animatedElements = [];
let animateScale = [];

function updateAnimatedElements() {
    animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => el.classList.remove('show'));

    animateScale = document.querySelectorAll('.animate-scale');
    animateScale.forEach(el => el.classList.remove('show'));
}

function handleScrollAnimation() {
    const triggerBottom = window.innerHeight * 0.85;

    animatedElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
        el.classList.add('show');
        } else {
        el.classList.remove('show');
        }
    });

    animateScale.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);

// Open Undangan
document.getElementById('openBtn').addEventListener('click', function () {
    // Pause music saat user pindah tab
    document.addEventListener('visibilitychange', function () {
        const bgMusic = document.getElementById('bgMusic');
        if (document.hidden) {
            bgMusic.pause();
        } else {
            bgMusic.play(); // (opsional) bisa dihapus kalau gak mau auto-play lagi saat balik
        }
    });

    // Pause musik saat halaman ditutup
    window.addEventListener('beforeunload', function () {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.pause();
    });

    document.getElementById('cover').style.transform = 'translateY(-100%)';
    setTimeout(() => {
        document.getElementById('cover').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('bgMusic').play();
        document.getElementById('bgVideo').play();

        updateAnimatedElements();
        handleScrollAnimation();
    }, 1000);
});

// Music 
const audio = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        btn.innerHTML = `<i class="fa fa-play"></i>`;
    } else {
        audio.pause();
        btn.innerHTML = `<i class="fa fa-pause"></i>`;
    }
}

//Gift Card
const dataGift = [
    {
        "namaBank": "Mandiri",
        "nomor": "Nomor Rekening",
        "penerima": "Nama Penerima",
        "img": 'https://github.com/Zarriq22/assset-azra-wedding/blob/main/images/bank-mandiri.png?raw=true'
    },
    {
        "namaBank": "BCA",
        "nomor": "Nomor Rekening",
        "penerima": "Nama Penerima",
        "img": 'https://github.com/Zarriq22/assset-azra-wedding/blob/main/images/bank-bca.png?raw=true'
    },
    {
        "namaBank": "BSI",
        "nomor": "Nomor Rekening",
        "penerima": "Nama Penerima",
        "img": 'https://github.com/Zarriq22/assset-azra-wedding/blob/main/images/bank-bsi.png?raw=true'
    }
];

const container = document.getElementById('giftContainer');

dataGift.forEach((gift, index) => {
    const html = `
        <div class="gift-card scroll-animate">
            <div class="gift-content">
                <img src="https://raw.githubusercontent.com/Zarriq22/assset-azra-wedding/refs/heads/main/images/card-atm.webp" alt="Gift" class="gift-image" />
                <img src="./images/gift/chip-atm1.webp" alt="Chip" class="gift-chip" />
                <div class="gift-info">
                    <h4>Bank ${gift.namaBank}</h4>
                    <img src="${gift.img}" alt="${gift.namaBank}" class="gift-atm">
                </div>
                <div class="gift-detail">
                    <div>
                        <h2 id="copyText-${index}">${gift.nomor}</h2>
                        <button onclick="copyToClipboard('${gift.nomor}')">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <span>An. ${gift.penerima}</span>
                </div>
            </div>
        </div>
    `;
    container.innerHTML += html;
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
}

document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const jumlah = document.getElementById('jumlah').value;
    const kehadiran = document.getElementById('kehadiran').value;
    const pesan = document.getElementById('pesan').value;

    // Simulasi kirim
    document.getElementById('rsvpMessage').innerText = `Terima kasih, ${name}! Data RSVP kamu telah dikirim. 🙏`;

    // Reset form
    e.target.reset();
});

// Countdown
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2026-01-24T10:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance <= 0) {
        countdown.innerHTML = "<p>Hari Bahagia Telah Tiba!</p>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.innerHTML = `<p>${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik</p>`;
    countdown.innerHTML = 
        `
        <div class="badge-time">
            <span>${days}</span>
            <span>Hari</span>
        </div>
        <div class="badge-time">
            <span>${hours}</span>
            <span>Jam</span>
        </div>
        <div class="badge-time">
            <span>${minutes}</span>
            <span>Menit</span>
        </div>
        <div class="badge-time">
            <span>${seconds}</span>
            <span>Detik</span>
        </div>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();