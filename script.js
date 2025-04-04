document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk transisi dari welcome page ke konten utama (site-wrapper)
  function enterWebsite() {
    const welcomePage = document.querySelector(".welcome-page");
    const siteWrapper = document.querySelector(".site-wrapper");

    // Nonaktifkan scroll selama transisi
    document.body.classList.add("no-scroll");

    // Fade out welcome page
    welcomePage.style.opacity = "0";
    setTimeout(() => {
      welcomePage.style.visibility = "hidden"; // Sembunyikan welcome page setelah fade-out
      siteWrapper.style.display = "block"; // Tampilkan seluruh konten utama (header, konten, footer)
      siteWrapper.classList.add("show"); // Opsional: tambahkan efek transisi jika diinginkan

      // Aktifkan kembali scroll
      document.body.classList.remove("no-scroll");
    }, 2000); // Durasi fade-out 2 detik
  }

  // Panggil fungsi enterWebsite setelah 3 detik (sesuaikan jika perlu)
  setTimeout(enterWebsite, 3000);

  // Toggle Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    const expanded =
      hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // Smooth Scrolling untuk navigasi
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Intersection Observer untuk animasi fade-in & slide-up/out
  const faders = document.querySelectorAll(".fade");
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      } else {
        entry.target.classList.remove("appear");
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // Scroll Down Arrow: klik untuk scroll ke section berikutnya
  const scrollDown = document.getElementById("scrollDown");
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      const profileSection = document.getElementById("profile");
      if (profileSection) {
        profileSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
