function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 1200; // total ms
  const stepTime = 20;
  const steps = Math.ceil(duration / stepTime);
  const increment = target / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = Math.floor(target) + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, stepTime);
}

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("highlights");
  if (!section) {
    console.warn("Highlights section not found");
    return;
  }
  const counters = section.querySelectorAll(".counter");
  if (!counters.length) {
    console.warn("No counters found inside highlights");
    return;
  }

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          counters.forEach((el, idx) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const suffix = el.getAttribute("data-suffix") || "";
            setTimeout(() => {
              animateCounter(el, target, suffix);
            }, idx * 150);
          });
          observer.unobserve(section);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -50px 0px", // slightly less aggressive negative margin
    }
  );

  observer.observe(section);
});


  document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15 // trigger when ~15% visible
    };

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // if only once
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);
    document.querySelectorAll(".slide-up").forEach(el => {
      observer.observe(el);
    });
  });

