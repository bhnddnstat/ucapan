function playMusic() {
    var musik = "butterfly.mp3";
    var audio = new Audio(musik);
    audio.loop = true;
    audio.play().catch(error => {
        console.error('Error playing music:', error);
    });
}

function tampilkanPesan() {
    var ucapanSurat = "Dear Kamu,##Seperti air yang tenang, kau hadir membawa ketenangan di hati. ##Jika memang jalan ini diridai-Nya, semoga Allah mudahkan setiap langkah kita bersama 💕💕###this is just content 😎";
    
    const pesan = document.querySelector('.pesan');
    let index = 0;
    const pesanArray = ucapanSurat.split('##');
    
    pesan.value = '';
    
    setTimeout(() => {
        function ketikPesan() {
            if (index < pesanArray.length) {
                let teksSekarang = pesanArray[index];
                let charIndex = 0;
                
                function ketikKarakter() {
                    if (charIndex < teksSekarang.length) {
                        pesan.value += teksSekarang.charAt(charIndex);
                        charIndex++;
                        setTimeout(ketikKarakter, 100);
                    } else {
                        pesan.value += '\n\n';
                        index++;
                        setTimeout(ketikPesan, 800);
                    }
                }
                ketikKarakter();
            } else {
                const waButton = document.querySelector('.wa');
                waButton.style.visibility = 'visible';
                waButton.style.opacity = '0';
                setTimeout(() => {
                    waButton.style.opacity = '1';
                    waButton.style.transition = 'opacity 1s ease';
                }, 200);
            }
        }
        ketikPesan();
    }, 1500);
}

function animasiSurat() {
    const surat = document.querySelector('.surat');
    surat.classList.add('animate__animated', 'animate__bounce');
}

function createBubble() {
    const content2 = document.querySelector('.content2');
    if (!content2) return;
    
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 30 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    bubble.style.animationDuration = `${Math.random() * 30 + 15}s`;
    bubble.style.setProperty('--drift', `${(Math.random() - 0.5) * 150}px`);
    bubble.style.opacity = Math.random() * 0.3 + 0.7;

    content2.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        bubble.remove();
        createBubble();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const surat = document.querySelector('.surat');
    const content = document.querySelector('.content');
    const content2 = document.querySelector('.content2');
    
    // Efek hover pada surat
    surat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    surat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Event untuk surat
    surat.addEventListener('click', function() {
        content.style.opacity = '0';
        content.style.transition = 'opacity 0.5s ease';
        surat.style.opacity = '0';
        surat.style.transition = 'opacity 1.5s ease';
        
        // Mulai membuat gelembung lebih awal
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createBubble(), i * 100);
        }
        
        setTimeout(() => {
            content.style.display = 'none';
            content2.style.display = 'flex';
            content2.style.opacity = '0';
            
            setTimeout(() => {
                content2.style.opacity = '1';
                content2.style.transition = 'opacity 1.5s ease';
            }, 100);
            
            playMusic();
            tampilkanPesan();
        }, 500); // Diubah dari 1500 menjadi 500 (0.5 detik)
    });

    // Event untuk tombol WhatsApp
    document.querySelector('.wa button').addEventListener('click', function() {
        const pesanWA = "Hai, I Love U 😂🤣";
        const urlWA = `https://api.whatsapp.com/send?phone=6281255173749&text=${encodeURIComponent(pesanWA)}`;
        window.open(urlWA);
    });

    // Mencegah inspeksi
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    document.addEventListener('keydown', function(e) {
        // Mencegah F12
        if (e.key === 'F12') {
            e.preventDefault();
        }
        
        // Mencegah Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
        }
        
        // Mencegah Ctrl+U (view source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
    });
});