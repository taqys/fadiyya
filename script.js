document.addEventListener("DOMContentLoaded", () => {
  // Theme Switcher
  const themeSwitch = document.getElementById("themeSwitch");
  const themeLabel = document.getElementById("themeLabel");
  const themes = [
    { key: "ocean-breeze", label: "Light Mode" },
    { key: "midnight-luxe", label: "Dark Mode" },
  ];
  const savedTheme = localStorage.getItem("fadiyya-theme");
  let currentThemeIndex = Math.max(
    0,
    themes.findIndex((theme) => theme.key === savedTheme)
  );

  function applyTheme(index) {
    const selectedTheme = themes[index];
    document.body.classList.add("theme-transition");
    document.body.setAttribute("data-theme", selectedTheme.key);
    themeLabel.textContent = selectedTheme.label;
    localStorage.setItem("fadiyya-theme", selectedTheme.key);
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 550);
  }

  applyTheme(currentThemeIndex);

  themeSwitch.addEventListener("click", () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(currentThemeIndex);
  });

  // Subtle parallax effect (desktop/tablet)
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const heroSection = document.querySelector(".hero-section");
  const heroBg = document.querySelector(".hero-bg");
  const heroContent = document.querySelector(".hero-content");
  let isParallaxTicking = false;
  let parallaxEnabled = false;

  function updateParallax() {
    if (
      !heroSection ||
      !heroBg ||
      !heroContent ||
      prefersReducedMotion ||
      !parallaxEnabled
    ) {
      return;
    }

    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
      heroBg.style.transform = "";
      heroContent.style.transform = "";
      return;
    }

    const sectionRect = heroSection.getBoundingClientRect();
    const sectionCenter = sectionRect.top + sectionRect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distanceFromCenter = sectionCenter - viewportCenter;

    const bgShift = distanceFromCenter * -0.06;
    const contentShift = distanceFromCenter * -0.03;

    heroBg.style.transform = `translate3d(0, ${bgShift}px, 0) scale(1.08)`;
    heroContent.style.transform = `translate3d(0, ${contentShift}px, 0)`;
  }

  function handleParallax() {
    if (isParallaxTicking) return;
    isParallaxTicking = true;
    window.requestAnimationFrame(() => {
      updateParallax();
      isParallaxTicking = false;
    });
  }

  const heroParallaxObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        parallaxEnabled = entry.isIntersecting;
        if (!parallaxEnabled) {
          heroBg.style.transform = "scale(1.05)";
          heroContent.style.transform = "";
        } else {
          handleParallax();
        }
      });
    },
    { threshold: 0.01, rootMargin: "180px 0px 180px 0px" }
  );
  if (heroSection && !prefersReducedMotion) {
    heroParallaxObserver.observe(heroSection);
  }

  updateParallax();
  window.addEventListener("scroll", handleParallax, { passive: true });
  window.addEventListener("resize", handleParallax);

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

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // Reveal animation untuk elemen detail
  const revealItems = document.querySelectorAll(
    ".gallery-item, .profile-image, .profile-text, .valentine-content"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--stagger-delay", `${index * 60}ms`);
    revealObserver.observe(item);
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

  // Gallery Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  const openLightbox = (imgElement) => {
    const captionText =
      imgElement.closest(".gallery-item")?.querySelector("figcaption")
        ?.textContent || imgElement.alt;
    lightboxImage.src = imgElement.src;
    lightboxImage.alt = imgElement.alt;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});
