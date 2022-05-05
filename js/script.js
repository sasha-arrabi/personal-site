const debounceMap = new Map();

function $(id) {
    return document.getElementById(id);
}

function init() {
    setupScrollPositionObservers();
    setupAboutTypewriter();
    setupContactFormListeners();
}

function setupScrollPositionObservers() {
    const menus = [ 'about', 'skills', 'experience', 'contact' ];
    const comparators = menus.map((menuItem) => () => {
        const element = $(menuItem);

        if ((window.scrollY + 5) >= element.offsetTop) {
            document.body.setAttribute('data-scroll-position', menuItem);
        }
    });
    const compareAll = () => comparators.forEach(comparator => comparator())
    
    window.addEventListener('scroll', compareAll, { passive: true });
}

function setupAboutTypewriter() {
    const observer = new IntersectionObserver((entries) => {
        if (entries && entries.length > 0 && entries[0].isIntersecting) {
            observer.disconnect();

            const typed = new Typed('#typed', {
                stringsElement: '#typed-strings',
                smartBackspace: true,
                startDelay: 0,
                backDelay: 1000,
                typeSpeed: 25,
                backSpeed: 30
            });
        }
    });

    observer.observe($('about'));
}

function setupContactFormListeners() {
    $('contactForm').addEventListener('submit', () => {
        $('contactFormContainer').style.display = 'none';
        $('contactFormSubmitted').style.display = 'block';
    });
    
    const contactResult = $('contactResult');
    contactResult.addEventListener('load', () => {
        contactResult.parentNode.removeChild(contactResult);
    });
}

init();
