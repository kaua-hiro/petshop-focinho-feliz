const nav = document.getElementById("nav");

if (nav) {
    const setScrolled = () => {
        nav.style.boxShadow = window.scrollY > 8
            ? "0 6px 18px -14px rgba(27, 58, 58, 0.5)"
            : "none";
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
}
