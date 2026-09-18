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
