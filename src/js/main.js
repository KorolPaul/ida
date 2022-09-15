const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1000

// sliders
const teamSlider = document.querySelectorAll('.team_slider');
teamSlider.forEach(el => {
    tns({
        container: el,
        items: 1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: true,
        navPosition: 'bottom',
        controls: true,
        loop: false,
        disable: true,
        responsive: {
            1000: {
                disable: false,
                items: 4,
                gutter: 0,
                autoWidth: true,
            }
        }
    });
})


// menu
const menuToggleElement = document.querySelector('.menu-toggle');
if (menuToggleElement) {
    menuToggleElement.addEventListener('click', () => document.body.classList.toggle('menu-opened'));
}


function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.body.classList.remove('menu-opened');
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.js-form-popup').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.filters_content').forEach(el => el.classList.remove('opened'));
}

// const fadeElement = document.querySelector('.fade');
// if (fadeElement) {
//     fadeElement.addEventListener('click', closeAllOpened);
// }

const menuLinkElements = document.querySelectorAll('.menu_link, .menu_close');
menuLinkElements.forEach(el => el.addEventListener('click', () => document.body.classList.remove('menu-opened')));

const menuAnchorsElements = document.querySelectorAll('a[name]');
menuAnchorsElements.forEach(el => {
    function setActiveMenuLink(name) {
        menuLinkElements.forEach(el => el.classList.remove('active'));
        let link = document.querySelector(`.menu_link[href="#${name}"]`);
        if(link) {
            link.classList.add('active');
        }
    }

    const observerCallback = function (e) {
        const { target, intersectionRatio } = e[0];
        const name = target.getAttribute('name');

        if (intersectionRatio > 0.5) {
            setActiveMenuLink(name);
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholdSteps,
        root: null
    });
    observer.observe(el);
});

/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle');

function disableScroll(e) {
    const { target } = e
    let isInPopup = false;

    function findParentPopup(el) {
        if (!el.parentElement) {
            return
        }
        if (el.className.includes('popup_content')) {
            isInPopup = true
            return
        }

        findParentPopup(el.parentElement)
    }

    findParentPopup(target.parentElement)

    if (!isInPopup && !target.className.includes('contact-form')) {
        e.preventDefault();
    }
}

function openPopup(name) {
    const popup = document.querySelector(`.popup[data-popup="${name}"]`);
    if (popup) {
        popup.classList.add('opened');
        document.body.classList.add('popup-opened');
        window.addEventListener(wheelEvent, disableScroll, { passive: false });
    }
}
function closePopup(name) {
    document.querySelector('.popup.opened').classList.remove('opened');
    document.body.classList.remove('popup-opened');
    window.removeEventListener(wheelEvent, disableScroll, { passive: false });

}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(el.dataset.popup);
}));

const popupCloseElements = document.querySelectorAll('.popup_close');
popupCloseElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
}));

/* Tabs */
function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');

    tabsContainers.forEach(tabContainer => {
        const tabsButtons = tabContainer.querySelectorAll('.tabs_button');
        const tabsBlocks = tabContainer.querySelectorAll('.tabs_content');

        if (tabsButtons.length) {
            function switchTab(e) {
                e.preventDefault();

                const index = e.target.dataset.tab;
                tabsButtons.forEach(el => el.classList.remove('active'));
                tabsBlocks.forEach(el => el.classList.remove('active'));

                tabsButtons[index - 1].classList.add('active');
                tabsBlocks[index - 1].classList.add('active');
            }

            tabsButtons.forEach(el => el.addEventListener('click', switchTab));
        }
    });
}

initTabs()

// Persons hover
const personSliderElements = document.querySelectorAll('.team_slider-image-wrapper');
const personElements = document.querySelectorAll('.person');

function highlightPerson(e) {
    const { currentTarget } = e;
    personSliderElements.forEach(p => p.classList.remove('active'));
    currentTarget.classList.add('active')

    const slide = currentTarget.dataset.slide;
    personElements.forEach(p => p.classList.remove('active'));
    document.querySelector(`.person[data-slide="${slide}"]`).classList.add('active');
}

personSliderElements.forEach(el => {
    el.addEventListener('mouseenter', highlightPerson);
    el.addEventListener('click', highlightPerson);
});

const personContentElements = document.querySelectorAll('.person_content');
let personContentHeight = 0;

if (isDesktop) {
    personContentElements.forEach(el => {
        const { height } = el.getBoundingClientRect();
        if (height > personContentHeight) {
            personContentHeight = height;
        }
    })
    if (personContentHeight) {
        document.querySelector('.team_slider').style.paddingBottom = personContentHeight + 80;
    }
}



/* cookies */
// if (Cookies) {
//     const hasCookies = Cookies.get('CookieNotificationCookie');
// 
//     const cookiesBanner = document.querySelector('.cookies');
//     const cookiesAcceptButton = document.querySelector('.cookies_button');
// 
//     if (cookiesAcceptButton) {
//         cookiesAcceptButton.addEventListener('click', function (e) {
//             e.preventDefault();
// 
//             cookiesBanner.style.display = 'none';
//             Cookies.set('CookieNotificationCookie', 'true', { expires: 365 });
//         });
//     }
// 
//     if (cookiesBanner && !hasCookies) {
//         cookiesBanner.style.display = 'block';
//     }
// }

/* typing */
const typingElements = document.querySelectorAll('.typing');
function type(element) {
    const text = element.textContent;
    element.innerText = '';

    text.split('').forEach((char, index) => {
        setTimeout(() => {
            element.textContent = element.textContent + char;
        }, 70 * index);
    })

}
setTimeout(() => {
    typingElements.forEach(el => {
        type(el);
    });
}, 400)

/* vacancies table */
function vacancyEl(){
    const vacancyElements = document.querySelectorAll('.vacancy');
    const vacanciesIndicatorElement = document.querySelector('.vacancies_indicator');

    function activateRow(e) {
        const { height } = e.currentTarget.getBoundingClientRect();
        const { offsetTop } = e.currentTarget;
        const indicatorHeight = vacanciesIndicatorElement.getBoundingClientRect().height

        vacanciesIndicatorElement.style.clipPath = `inset(${offsetTop}px 0 ${indicatorHeight - offsetTop - height - 2}px 0)`;

        vacancyElements.forEach(el => el.classList.remove('active'));
        e.currentTarget.classList.add('active');
    }

    vacancyElements.forEach(el => {
        el.addEventListener('mouseenter', activateRow);
    });
}
vacancyEl();


/* carousel slider */
const carouselSliders = document.querySelectorAll('.carousel');
const carouselRows = document.querySelectorAll('.carousel_row');

carouselSliders.forEach(carousel => {
    function scrollRow(e) {
        const isDown = e.deltaY > 0;
        const step = 40;

        function translate(el, isReverse) {
            const isForward = isReverse ? !isDown : isDown;
            const transformString = el.style.transform;
            const previuosX = transformString.substring(transformString.indexOf('(') + 1, transformString.indexOf('px'));

            if (isForward) {
                el.style.transform = `translateX(${Number(previuosX) - step}px)`;
            } else {
                el.style.transform = `translateX(${Number(previuosX) + step}px)`;
            }
        }

        if (carouselRows[0]) {
            translate(carouselRows[0])
        }
        if (carouselRows[1]) {
            translate(carouselRows[1], true)
        }
        if (carouselRows[2]) {
            translate(carouselRows[2])
        }
        if (carouselRows[3]) {
            translate(carouselRows[3], true)
        }
    }

    const observerCallback = function (e) {
        const { boundingClientRect, intersectionRatio } = e[0];
        // const ratio = boundingClientRect.height / 2 - boundingClientRect.y;

        if (intersectionRatio > 0.1) {
            document.addEventListener(wheelEvent, scrollRow)
        } else {
            document.removeEventListener(wheelEvent, scrollRow)
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholdSteps,
        root: null
    });
    observer.observe(carousel);
});

carouselRows.forEach((el) => {
    el.style.transform = 'translateX(0)'
    lightGallery(el, {
        speed: 500,
    });
});

/* animation */
const animatedElements = document.querySelectorAll('.vacancies, .task, .person_header, .carousel');
animateElements();
function animateElements() {
    animatedElements.forEach(el => {
        const observerCallback = function (e) {
            const {target, intersectionRatio} = e[0];
            if (intersectionRatio > 0.6) {
                target.classList.add('animated');
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '0px 0px 0px 0px',
            threshold: thresholdSteps,
            root: null
        });
        observer.observe(el);
    });
}

carouselRows.forEach((el) => el.style.transform = 'translateX(0)');
