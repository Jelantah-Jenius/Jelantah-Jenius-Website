// Select elements
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

// Handle mobile menu opening
if (menuBtn) {
  menuBtn.onclick = function (e) {
    e.stopPropagation();
    if (navBar) navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    
    if (window.innerWidth <= 992) {
      body.style.overflow = "hidden";
    }
  };
}

// Handle mobile menu closing
if (cancelBtn) {
  cancelBtn.onclick = function (e) {
    e.stopPropagation();
    closeSidePanel();
  };
}

function closeSidePanel() {
  if (navBar) navBar.classList.remove("active");
  if (menuBtn) {
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  }
  body.style.overflow = "auto";
}

// Toggle mobile dropdown menu when clicking Contents
document.querySelectorAll('.menu li.dropdown .dropbtn').forEach(dropBtn => {
  dropBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Stop click from propagating up to other elements

    const dropdown = this.parentElement;
    dropdown.classList.toggle('active');
    
    const content = dropdown.querySelector('.dropdown-content');
    if (content) {
      const isDisplayed = content.style.display === 'block';
      content.style.display = isDisplayed ? 'none' : 'block';
    }
  });
});

// Close mobile menu ONLY when clicking standard page links (not dropdowns)
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Ignore dropdown buttons and links inside dropdown content
    if (link.classList.contains("dropbtn") || link.closest('.dropdown-content')) {
      e.stopPropagation();
      return;
    }

    closeSidePanel();
  });
});

let currentActiveManager = null;

function toggleSharedMembers(managerName) {
  const container = document.getElementById('shared-members-container');
  const title = document.getElementById('active-manager-title');

  if (currentActiveManager === managerName) {
    container.style.display = 'none';
    currentActiveManager = null;
  } else {
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
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('details').forEach((detail) => {
    const summary = detail.querySelector('summary');

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      if (!detail.open) {
        detail.open = true;
        requestAnimationFrame(() => {
          detail.classList.add('is-open');
        });
      } else {
        detail.classList.remove('is-open');
        setTimeout(() => {
          detail.open = false;
        }, 350);
      }
    });
  });
});

function checkScrollColor() {
  const textElements = document.querySelectorAll('.scroll-text');
  const triggerPoint = window.innerHeight * 0.55;

  textElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top > triggerPoint) {
      el.classList.add('in-dark-zone');
    } else {
      el.classList.remove('in-dark-zone');
    }
  });
}

window.addEventListener('scroll', checkScrollColor);
window.addEventListener('load', checkScrollColor);

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
      
  const itemCount = items.length;
  const theta = 360 / itemCount; 
      
  let radius;
  let currAngle = 0;

  function setRadius() {
    if (window.innerWidth < 768) {
      radius = 300;
    } else {
      radius = 500;
    }
        
    items.forEach((item, index) => {
      const itemAngle = theta * index;
      item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
    });
    rotateCarousel();
  }

  function rotateCarousel() {
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${currAngle}deg)`;
        
    let activeIndex = Math.round(currAngle / -theta) % itemCount;
    if (activeIndex < 0) {
      activeIndex += itemCount;
    }

    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  setRadius();
  window.addEventListener("resize", setRadius);

  nextBtn.addEventListener("click", () => {
    currAngle -= theta;
    rotateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currAngle += theta;
    rotateCarousel();
  });
});
