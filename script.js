// Select the <nav> element and elements
let nav = document.querySelector("nav");
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Handle scroll for sticky nav
window.onscroll = function () {
  if (nav) {
    if (document.documentElement.scrollTop > 20) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }
};

// Handle mobile menu if elements exist
if (menuBtn) {
  menuBtn.onclick = function () {
    if (navBar) navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    
    // Only lock background scroll on mobile viewports
    if (window.innerWidth <= 992) {
      body.style.overflow = "hidden";
    }
  };
}

if (cancelBtn) {
  cancelBtn.onclick = function () {
    if (navBar) navBar.classList.remove("active");
    if (menuBtn) {
      menuBtn.style.opacity = "1";
      menuBtn.style.pointerEvents = "auto";
    }
    body.style.overflow = "auto";
  };
}

// Close mobile menu on link click
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navBar) navBar.classList.remove("active");
    if (menuBtn) {
      menuBtn.style.opacity = "1";
      menuBtn.style.pointerEvents = "auto";
    }
    body.style.overflow = "auto";
  });
});

let currentActiveManager = null;

function toggleSharedMembers(managerName) {
  const container = document.getElementById('shared-members-container');
  const title = document.getElementById('active-manager-title');

  // If clicking the same manager that's already open, close it
  if (currentActiveManager === managerName) {
    container.style.display = 'none';
    currentActiveManager = null;
  } else {
    // Open panel and update heading title
    title.textContent = `Team Members under ${managerName}`;
    container.style.display = 'block';
    currentActiveManager = managerName;
  }
}

function toggleVideoZoom(videoElem, btnId) {
  const backdrop = document.getElementById('videoBackdrop');
  const isZoomed = videoElem.classList.toggle('center-overlay');
  const btn = document.getElementById(btnId);
  const btnIcon = btn ? btn.querySelector('i') : null;
  const btnText = btn ? btn.querySelector('span') : null;

  if (backdrop) backdrop.classList.toggle('active', isZoomed);

  if (isZoomed) {
    videoElem.muted = false;
    if (btnIcon) btnIcon.className = 'fa-solid fa-volume';
    if (btnText) btnText.textContent = 'Mute video';
  } else {
    videoElem.muted = true;
    if (btnIcon) btnIcon.className = 'fa-solid fa-volume-xmark';
    if (btnText) btnText.textContent = 'Unmute video';
  }
}

function toggleMute(videoId, btnElem) {
  const video = document.getElementById(videoId);
  const icon = btnElem.querySelector('i');
  const text = btnElem.querySelector('span');

  video.muted = !video.muted;
  if (video.muted) {
    icon.className = 'fa-solid fa-volume-xmark';
    text.textContent = 'Unmute video';
  } else {
    icon.className = 'fa-solid fa-volume';
    text.textContent = 'Mute video';
  }
}

function closeActiveVideo() {
  const zoomed = document.querySelector('video.center-overlay');
  if (zoomed) {
    const btnId = zoomed.id === 'recapVideo1' ? 'muteToggleBtn1' : 'muteToggleBtn2';
    toggleVideoZoom(zoomed, btnId);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Runs animation once per scroll
      }
    });
  }, {
    threshold: 0.15 // Triggers when 15% of the element is in view
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('details').forEach((detail) => {
    const summary = detail.querySelector('summary');

    summary.addEventListener('click', (e) => {
      e.preventDefault(); // Stop native instant toggle

      if (!detail.open) {
        // OPENING
        detail.open = true;
        requestAnimationFrame(() => {
          detail.classList.add('is-open');
        });
      } else {
        // CLOSING
        detail.classList.remove('is-open');

        // Wait for CSS animation (350ms) before closing <details>
        setTimeout(() => {
          detail.open = false;
        }, 350);
      }
    });
  });
});

// Toggle mobile dropdown menu when clicking Contents
document.querySelectorAll('.menu li.dropdown .dropbtn').forEach(dropBtn => {
  dropBtn.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.parentElement;
      dropdown.classList.toggle('active');
      
      const content = dropdown.querySelector('.dropdown-content');
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    }
  });
});

function checkScrollColor() {
    const textElements = document.querySelectorAll('.scroll-text');
    const triggerPoint = window.innerHeight * 0.55; // 55% down the viewport (where gradient gets dark)

    textElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      
      // If the top of the text element passes into the darker bottom half of the viewport
      if (rect.top > triggerPoint) {
        el.classList.add('in-dark-zone');
      } else {
        el.classList.remove('in-dark-zone');
      }
    });
  }

  // Run on scroll and initial page load
  window.addEventListener('scroll', checkScrollColor);
  window.addEventListener('load', checkScrollColor);


<!-- Script Interaktif Background Minyak -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const processSection = document.getElementById('processSection');
      
      // Throttle fungsi agar tidak membuat browser berat karena memproses terlalu banyak event
      let throttleTimer;
      const throttleDelay = 50; // Jarak waktu (ms) antar kemunculan gelombang

      processSection.addEventListener('mousemove', (e) => {
        if (throttleTimer) return;

        throttleTimer = setTimeout(() => {
          createRipple(e);
          throttleTimer = null;
        }, throttleDelay);
      });

      function createRipple(e) {
        // Dapatkan posisi relatif kursor terhadap section
        const rect = processSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Buat elemen span untuk jejak
        const ripple = document.createElement('span');
        ripple.classList.add('oil-ripple');
        
        // Ukuran gelombang bervariasi secara acak (antara 50px - 100px)
        const size = Math.random() * 50 + 50;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        
        // Posisi
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Masukkan ke dalam section
        processSection.appendChild(ripple);

        // Hapus elemen dari memori setelah animasi selesai (1 detik)
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      }
    });
  </script>
