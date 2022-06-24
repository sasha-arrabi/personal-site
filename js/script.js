const debounceMap = new Map();

function $(id) {
    return document.getElementById(id);
}

function init() {
    setupScrollPositionObservers();
    setupAboutTypewriter();
    setupContactFormListeners();
    createDynamicFormCaptcha();
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
    /** @type { HTMLFormElement } */
    const contactForm = $('contactForm');

    contactForm.addEventListener('submit', (event) => {
        if (checkForm()) {
            contactForm.action = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScfII1_3WdYy9eGWvET1DHcPq8cAlf_u81xHcpYsusfDOBqaw/formResponse?embedded=true';
            $('contactFormContainer').style.display = 'none';
            $('contactFormSubmitted').style.display = 'block';
        } else {
            event.preventDefault();
        }
    });
    
    const contactResult = $('contactResult');
    contactResult.addEventListener('load', () => {
        contactResult.parentNode.removeChild(contactResult);
    });
}

function createDynamicFormCaptcha() {
    $('captchaFirstNumber').innerHTML = Math.round(Math.random() * 10);
    $('captchaOperation').innerHTML = ['+', '-', 'x'][Math.round(Math.random() * 2)];
    $('captchaSecondNumber').innerHTML = Math.round(Math.random() * 10);
}

function checkForm() {
    return !$('lastNameInput').value && !$('robotCheck').checked && validateFormCaptcha();
}

function validateFormCaptcha() {
    const firstNumber = +$('captchaFirstNumber').innerHTML;
    const operation = $('captchaOperation').innerHTML;
    const secondNumber = +$('captchaSecondNumber').innerHTML;
    /** @type { HTMLInputElement } */
    const captchaInput = $('captchaInput');
    const multiplyResult = operation !== 'x' || (firstNumber * secondNumber === +captchaInput.value);
    const addResult = operation !== '+' || (firstNumber + secondNumber === +captchaInput.value);
    const subtractResult = operation !== '-' || (firstNumber - secondNumber === +captchaInput.value);

    if (multiplyResult && addResult && subtractResult) {
        return true;
    } else {
        return false;
    }
}

init();
