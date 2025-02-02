document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    let isVisible = false;

    window.addEventListener('scroll', function() {
        const shouldBeVisible = window.pageYOffset > 300;

        if (shouldBeVisible && !isVisible) {
            scrollToTopBtn.classList.add('show');
            scrollToTopBtn.classList.remove('hide');
            isVisible = true;
        } else if (!shouldBeVisible && isVisible) {
            scrollToTopBtn.classList.add('hide');
            scrollToTopBtn.classList.remove('show');
            isVisible = false;
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll halus ke atas
        });
    });
});

