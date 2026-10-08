/* =========================================================
   site.js  -  shared behaviour for every page
   (active nav link, mobile menu, scroll progress bar,
    header shrink, scroll-reveal animations)
   ========================================================= */
(function () {
    "use strict";

    /* 1. Highlight the link of the page you are on */
    var current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav .nav-links a").forEach(function (link) {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    /* 2. Mobile menu (hamburger) */
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");

    function setMenu(open) {
        if (!toggle || !links) return;
        links.classList.toggle("open", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
    }

    if (toggle && links) {
        toggle.addEventListener("click", function () {
            setMenu(!links.classList.contains("open"));
        });
        links.addEventListener("click", function (e) {
            if (e.target.tagName === "A") setMenu(false);
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setMenu(false);
        });
    }

    /* 3. Scroll progress bar + shrinking nav shadow */
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.prepend(bar);

    var nav = document.querySelector(".site-nav");

    function onScroll() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = pct + "%";
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* 4. Reveal sections / footer when they scroll into view */
    var targets = document.querySelectorAll("main > section, main > h2, .site-footer");
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });

        targets.forEach(function (el) {
            el.classList.add("reveal");
            observer.observe(el);
        });
    }
})();
