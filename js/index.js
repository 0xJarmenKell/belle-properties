// Main JavaScript initialization
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing JavaScript...");

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        // Calculate offset for fixed navbar
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        // Enhanced smooth scrolling
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;

        function smoothScrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          // Easing function
          const easeInOutCubic = (progress) => {
            return progress < 0.5
              ? 4 * progress * progress * progress
              : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
          };

          const easedProgress = easeInOutCubic(progress);
          const currentPosition = startPosition + distance * easedProgress;

          window.scrollTo(0, currentPosition);

          if (progress < 1) {
            requestAnimationFrame(smoothScrollAnimation);
          }
        }

        requestAnimationFrame(smoothScrollAnimation);

        // Close mobile menu if open
        const offcanvas = document.querySelector(".offcanvas");
        if (offcanvas && offcanvas.classList.contains("show")) {
          setTimeout(() => {
            if (typeof bootstrap !== "undefined" && bootstrap.Offcanvas) {
              const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
              if (bsOffcanvas) {
                bsOffcanvas.hide();
              }
            }
          }, 200);
        }

        // Update active nav link
        document
          .querySelectorAll(".nav-link")
          .forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Scroll spy functionality
  function updateActiveNavOnScroll() {
    const sections = [
      "home",
      "about",
      "services",
      "benefits",
      "cta-analysis",
      "testimonials",
      "video",
      "faqs",
      "contact",
    ];
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    let currentSection = "";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = sectionId;
        }
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavOnScroll);
  updateActiveNavOnScroll();

  // Dropdown icon toggle
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    const dropdownIcon = dropdownToggle.querySelector(".dropdown-icon-size");
    if (dropdownIcon) {
      dropdownToggle.addEventListener("shown.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-plus");
        dropdownIcon.classList.add("fa-minus");
      });
      dropdownToggle.addEventListener("hidden.bs.dropdown", function () {
        dropdownIcon.classList.remove("fa-minus");
        dropdownIcon.classList.add("fa-plus");
      });
    }
  });

  // Property Listing Swiper
  const propertyListingElement = document.querySelector(".swiper-container");
  if (propertyListingElement && typeof Swiper !== "undefined") {
    try {
      new Swiper(".swiper-container", {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          360: { slidesPerView: 2, spaceBetween: 30 },
          768: { slidesPerView: 4, spaceBetween: 35 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        },
      });
      console.log("Property listing Swiper initialized");
    } catch (error) {
      console.error("Property listing Swiper error:", error);
    }
  }

  // Testimonials Swiper
  const testimonialsElement = document.querySelector(".swiper-testimonials");
  if (testimonialsElement) {
    console.log("✅ Testimonials element found");
    console.log(
      "📊 Slides count:",
      testimonialsElement.querySelectorAll(".swiper-slide").length
    );
    console.log("🔍 Element classes:", testimonialsElement.className);

    if (typeof Swiper !== "undefined") {
      try {
        const testimonialSwiper = new Swiper(".swiper-testimonials", {
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-testimonials .swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          grabCursor: true,
          centeredSlides: false,
          slidesPerView: 1,
          spaceBetween: 20,
          watchOverflow: true, // Prevents partial slides
          preventClicks: false,
          preventClicksPropagation: false,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
              watchSlidesProgress: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
              watchSlidesProgress: true,
              centeredSlides: false,
            },
          },
          on: {
            init: function () {
              console.log("🎉 Testimonials Swiper initialized!");
              console.log(
                "📱 Current slidesPerView:",
                this.params.slidesPerView
              );
            },
            slideChange: function () {
              console.log("🔄 Slide changed to:", this.activeIndex);
            },
          },
        });
        console.log("✅ Testimonials Swiper created successfully");
        console.log("🎛️ Swiper instance:", testimonialSwiper);
      } catch (error) {
        console.error("❌ Testimonials Swiper error:", error);
      }
    } else {
      console.error("❌ Swiper library not loaded!");
    }
  } else {
    console.error("❌ Testimonials element (.swiper-testimonials) not found!");
    console.log(
      "🔍 Available swiper elements:",
      document.querySelectorAll('[class*="swiper"]')
    );
  }

  // Property Detail Swiper
  const propertyDetailElement = document.querySelector(
    ".swiper-property-detail"
  );
  if (propertyDetailElement && typeof Swiper !== "undefined") {
    try {
      new Swiper(".swiper-property-detail", {
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
          360: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        },
      });
    } catch (error) {
      console.error("Property detail Swiper error:", error);
    }
  }

  // Fade-in animations
  const fadeInElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
  );
  if (fadeInElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeInElements.forEach((el) => {
      el.style.animationPlayState = "paused";
      observer.observe(el);
    });
  }

  // Counter animations
  const counters = [
    { id: "activeAgent", endVal: 400, suffix: "+" },
    { id: "clientSatisfaction", endVal: 99, suffix: "%" },
    { id: "propertyListings", endVal: 250, suffix: "+" },
  ];

  const startCounters = () => {
    counters.forEach((counter) => {
      const counterElement = document.getElementById(counter.id);
      if (counterElement && typeof countUp !== "undefined") {
        try {
          const counterAnim = new countUp.CountUp(counter.id, counter.endVal, {
            suffix: counter.suffix,
            duration: 2,
          });
          if (!counterAnim.error) {
            counterAnim.start();
          }
        } catch (error) {
          console.error("Counter error:", error);
        }
      }
    });
  };

  const countersSection = document.getElementById("counters");
  if (countersSection) {
    const countersObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
          countersObserver.unobserve(countersSection);
        }
      },
      { threshold: 0.5 }
    );
    countersObserver.observe(countersSection);
  }

  // Bootstrap dropdown hover
  document.querySelectorAll(".nav-item.dropdown").forEach((dropdown) => {
    dropdown.addEventListener("mouseover", function () {
      const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
      if (toggle && typeof bootstrap !== "undefined") {
        try {
          bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        } catch (error) {
          console.error("Dropdown error:", error);
        }
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
      if (toggle && typeof bootstrap !== "undefined") {
        try {
          bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
        } catch (error) {
          console.error("Dropdown error:", error);
        }
      }
    });
  });

  // Form handlers
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const popupMessage = document.getElementById("popupMessage");
      if (popupMessage) {
        popupMessage.style.display = "block";
        setTimeout(() => (popupMessage.style.display = "none"), 3000);
      }
    });
  }

  const otherForm = document.getElementById("otherForm");
  if (otherForm) {
    otherForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const popupMessage = document.getElementById("otherPopupMessage");
      if (popupMessage) {
        popupMessage.style.display = "block";
        setTimeout(() => (popupMessage.style.display = "none"), 3000);
      }
    });
  }

  // Gallery modal
  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", function () {
      const src = this.getAttribute("data-img-src");
      const modalImage = document.getElementById("modalImage");
      if (modalImage && src) {
        modalImage.src = src;
      }
    });
  });

  console.log("All JavaScript functionality initialized successfully");
});
