const debounceMap = new Map();

function $(id) {
    return document.getElementById(id);
}

function init() {
    setupScrollPositionObservers();
    setupAboutTypewriter();
}

function setupScrollPositionObservers() {
    const menus = [ 'about', 'skills', 'experience', 'blog', 'contact' ];
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
    const typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        smartBackspace: true,
        startDelay: 0,
        backDelay: 1250,
        typeSpeed: 25,
        backSpeed: 30
    });
}

init();
