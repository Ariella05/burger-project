// бургер меню


const menulist = document.querySelector('.menu__list');
const hamburger = document.querySelector('.hamburger');


hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("is-active"); {
        if (menulist.classList.contains('menu__list-visible')) {
            menulist.classList.remove('menu__list-visible');
        } else {
            menulist.classList.add('menu__list-visible');
        }
    }
});


// вертикальное меню


const food = document.querySelector('.food');
const dishesList = document.querySelector('.dishes__list');
const dishesItems = document.querySelectorAll('.dishes__item');
const allDescs = document.querySelectorAll('.dishes__desc');



const closeItem = function(item) {
    const itemDesc = item.querySelector('.dishes__desc');

    item.classList.remove('dishes__item-active');
    itemDesc.style.width = '';
    dishesList.style.right = '';

}

const closeAllItems = function() {
    for (let i = 0; i < dishesItems.length; i++) {
        dishesItems[i].classList.remove('dishes__item-active');
        for (let i = 0; i < allDescs.length; i++) {
            allDescs[i].style.width = '';
        }
    }
}


const openItem = function(item) {
    const dishesLink = item.querySelector('.dishes__link');
    const itemDesc = item.querySelector('.dishes__desc');
    const screenWidth = food.clientWidth;
    const dishesWidth = dishesLink.clientWidth;
    const descWidth = screenWidth - dishesWidth;
    const itemNum = item.dataset.num;
    const listPosition = (dishesItems.length - itemNum) * dishesWidth;

    closeAllItems();

    item.classList.add('dishes__item-active');

    if (screenWidth > 960) {
        itemDesc.style.width = '50vw';
    } else if (screenWidth > 640) {
        itemDesc.style.width = `${screenWidth - dishesWidth * dishesItems.length}px`;
    } else {
        itemDesc.style.width = `${descWidth}px`;
        dishesList.style.right = `-${listPosition}px`;
    }
}

food.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;
    const targetItem = target.closest('.dishes__item');
    if (target.closest('.dishes__link')) {
        if (targetItem.classList.contains('dishes__item-active')) {
            closeItem(targetItem);
        } else {
            openItem(targetItem);
        }
    }
    if (target.closest('.dishes__list') === null) {
        closeAllItems();
    }
})


// члены команды

const team = document.querySelector('.team');
const memberItems = document.querySelectorAll('.member__item');

team.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;
    const targetItem = target.parentNode;
    if (target.classList.contains('member__name')) {
        if (targetItem.classList.contains('member__item--active')) {
            targetItem.classList.remove('member__item--active');
        } else {
            for (let i = 0; i < memberItems.length; i++) {
                memberItems[i].classList.remove('member__item--active');
            }
            targetItem.classList.add('member__item--active');
        }
    }
    if (target.closest('.member') === null) {
        for (let i = 0; i < memberItems.length; i++) {
            memberItems[i].classList.remove('member__item--active');
        }
    }
});


// слайдер

const left = document.querySelector('#left');
const right = document.querySelector('#right');
const burgers = document.querySelector('.burgers');

right.addEventListener('click', function(e) {
    e.preventDefault();
    loop("right");
});

left.addEventListener('click', function(e) {
    e.preventDefault();
    loop("left");
})

function loop(direction) {
    if (direction === "right") {
        burgers.appendChild(burgers.firstElementChild);
    } else {
        burgers.insertBefore(burgers.lastElementChild, burgers.firstElementChild);
    }
}


// форма заказа

const form = document.querySelector('.order-form');
const orderButton = document.querySelector('#orderButton');
const templateForm = document.querySelector('#overlayTempForm').innerHTML;
const overlayForm = createOverlay(templateForm);


orderButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(form)) {

        let formData = new FormData();
        formData.append('name', form.elements.name.value);
        formData.append('phone', form.elements.phone.value);
        formData.append('comment', form.elements.comments.value);
        formData.append('to', form.elements.email.value);

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            if (xhr.response.message === 'Письмо успешно отправлено') {
                overlayForm.open();
                overlayForm.setContent('Сообщение отправлено');
            }
        })
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.email)) {
        valid = false;
    }
    if (!validateField(form.elements.comments)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
}



// отзывы - модальное окно

/*
const openButton = document.querySelectorAll("#openButton");
const reviewsText = document.querySelectorAll(".reviews__text"); */
/* const successOverlay = createOverlay(reviewsText.innerHTML); */
/* const reviews = document.querySelector("#reviews"); */

/*

for (let i = 0; i < openButton.length; i++) {
    let button = openButton[i];
    let review = reviewsText[i].innerHTML;
    button.addEventListener("click", function(e) {
        e.preventDefault();
        reviews.append(createOverlay(review));
    });
}

function createOverlay(content) {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
    overlayElement.addEventListener("click", function(e) {
        if (e.target === overlayElement) {
            closeElement.click();
        }
    })

    const containerElement = document.createElement("div");
    containerElement.classList.add("container__overlay");

    const contentElement = document.createElement("div");
    contentElement.classList.add("content");
    contentElement.innerHTML = content;

    const closeElement = document.createElement("a");
    closeElement.classList.add("close");
    closeElement.textContent = "x";
    closeElement.href = "#";
    closeElement.addEventListener("click", function(e) {
        e.preventDefault();
        reviews.removeChild(overlayElement);
    });

    overlayElement.appendChild(containerElement);
    containerElement.appendChild(closeElement);
    containerElement.appendChild(contentElement);

    return overlayElement;

} */

const openButtons = document.querySelectorAll('#openButton');
const reviewsText = document.querySelectorAll('.reviews__text');
const templateReview = document.querySelector('#overlayTemplate').innerHTML;
const overlay = createOverlay(templateReview);
const reviews = document.querySelector('.reviews');


for (let i = 0; i < openButtons.length; i++) {
    let button = openButtons[i];
    let review = reviewsText[i].innerHTML;
    button.addEventListener('click', e => {
        e.preventDefault();
        overlay.open();
        overlay.setContent(review);
    })
}


function createOverlay(template) {
    const fragment = document.createElement('div');
    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector('.overlay');
    const contentElement = fragment.querySelector('.content');
    const closeElement = fragment.querySelector('#close');

    overlayElement.addEventListener('click', e => {
        if (e.target === overlayElement) {
            closeElement.click();
        }
    });
    closeElement.addEventListener('click', e => {
        e.preventDefault();
        document.body.removeChild(overlayElement);
    });

    return {
        open() {
            document.body.append(overlayElement);
        },
        close() {
            closeElement.click();
        },
        setContent(content) {
            contentElement.innerHTML = content;
        }
    }

}


// one page scroll


const sections = document.querySelectorAll('.section');
const display = document.querySelector('.maincontent');
let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();



const performTransition = function(sectionNum) {
    if (inScroll) return;
    inScroll = true;

    const position = sectionNum * -100;

    if (isNaN(position)) console.error('передано неверное значение в performTransition')

    for (let i = 0; i < sections.length; i++) {
        if (sectionNum == 0) {
            sections[i].classList.remove('active');

            sections[0].classList.add('active');
        } else {
            sections[i].classList.remove('active');
            sections[sectionNum].classList.add('active');
        }
    }

    /* for (let i = 0; i < sections.length; i++) {
        if (sectionNum > 0 && sectionNum < (sections.length)) {
            sections[i].classList.remove('active');

            sections[sectionNum].classList.add('active');
        }
    } */

    display.style.transform = `translateY(${position}%)`;

    setTimeout(() => {
        inScroll = false;

        sidebarDots = document.querySelectorAll('.sidebar__dot')
        for (let i = 0; i < sidebarDots.length; i++) {
            sidebarDots[i].classList.remove('sidebar__dot--active');
            sidebarDots[sectionNum].classList.add('sidebar__dot--active');

        }


    }, 1300);
}


const scrollToSection = function(direction) {

    let activeSection;
    let arrSec = Array.from(sections)

    arrSec.forEach(function(item, i) {
        if (item.classList.contains('active')) {
            activeSection = i;
        }
    })


    /* let activeSection = 0;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains('active')) {
            activeSection = i;
        }
    } */
    /* console.log(activeSection) */
    let nextSection = (activeSection + 1);
    let prevSection = (activeSection - 1);

    if (nextSection > 8) {
        nextSection = 8;
    }

    if (prevSection < 0) {
        prevSection = 0;
    }


    if (direction == 'next') {
        performTransition(nextSection)
    }
    if (direction == 'prev') {
        performTransition(prevSection)
    }

}


window.addEventListener('wheel', function(e) {
    const deltaY = e.deltaY;

    if (deltaY > 0) {
        scrollToSection('next');
    }
    if (deltaY < 0) {
        scrollToSection('prev');
    }

})

window.addEventListener('keydown', function(e) {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === 'input' || tagName === 'textarea'

    if (userTypingInInputs) return;
    switch (e.keyCode) {
        case 38:
            scrollToSection('prev');
            break;
        case 40:
            scrollToSection('next');
            break;
    }
})

const dots = document.querySelectorAll('.sidebar__dot');

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', e => {
        e.preventDefault();
        const currentDot = e.currentTarget;
        const targetDot = currentDot.dataset.scroll;

        performTransition(targetDot)
    })
}

const menuLinks = document.querySelectorAll('.menu__link');
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', e => {
        e.preventDefault();
        const currentDot = e.currentTarget;
        const targetDot = currentDot.dataset.scroll;

        performTransition(targetDot)
    })
}

const orderButs = document.querySelectorAll('.order__button')
for (let i = 0; i < orderButs.length; i++) {
    orderButs[i].addEventListener('click', e => {
        e.preventDefault();
        performTransition(7)
    })
}
const scrollBest = document.querySelector('.scroll__elem--best')
scrollBest.addEventListener('click', e => {
    e.preventDefault();
    performTransition(1)
})



if (isMobile) {
    $("body").swipe({
        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
            const scrollDirection = direction == 'up' ? 'next' : 'prev';
            scrollToSection(scrollDirection);
        }
    })
}

// player

const video = document.querySelector('video');
const playStart = document.querySelector('.player__start');
const playback = document.querySelector('.player__playback');
const playbackBut = document.querySelector('.player__playback-button');


playStart.addEventListener('click', (e) => {
    const videoBtn = (e.currentTarget);

    if (videoBtn.classList.contains('paused')) {
        video.pause()
        playStart.classList.remove('paused')
    } else {
        video.play()
        playStart.classList.add('paused')
    }
})

video.addEventListener('click', () => {
    if (playStart.classList.contains('paused')) {
        video.pause()
        playStart.classList.remove('paused')
    } else {
        video.play()
        playStart.classList.add('paused')
    }

})

/* const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;
} */



video.onloadedmetadata = function playReady() {
    let interval;
    const durationSec = video.duration;

    if (typeof interval !== 'undefined') {
        clearInterval(interval);
    }

    setInterval(() => {
        const compleatedSec = video.currentTime;
        const compleatedPercent = (compleatedSec / durationSec) * 100;

        playbackBut.style.left = `${compleatedPercent}%`
    }, 1000);


};



playback.addEventListener('click', e => {
    const bar = e.currentTarget;
    const newBtnPosition = e.pageX - bar.getBoundingClientRect().left;
    const btnPosPercent = (newBtnPosition / bar.clientWidth) * 100;
    const newPlayerTimeSec = (video.duration / 100) * btnPosPercent;

    video.currentTime = newPlayerTimeSec;
    playbackBut.style.left = `${btnPosPercent}%`;
})

const soundPlayback = document.querySelector('.player__sound-playback');
const soundBut = document.querySelector('.player__sound-button');
const soundVolume = document.querySelector('.player__sound-elem');


soundPlayback.addEventListener('click', e => {
    const soundBar = e.currentTarget;
    const newSoundPos = e.pageX - soundBar.getBoundingClientRect().left;
    const newSoundPercent = (newSoundPos / soundBar.clientWidth);
    const newButSound = 100 - newSoundPercent * 100;

    if (newButSound > 100) {
        newButSound = 100;
    }

    console.log(newButSound)

    soundBut.style.right = `${newButSound}%`;

    if (newSoundPercent < 0.05) {
        video.volume = 0;
    } else {
        video.volume = newSoundPercent;

    }

    if (video.volume == 0) {
        soundVolume.classList.add('sound__silent')
    } else {
        soundVolume.classList.remove('sound__silent')
    }

})



soundVolume.addEventListener('click', () => {
    soundVolume.classList.toggle('sound__silent'); {
        if (soundVolume.classList.contains('sound__silent')) {
            video.volume = 0;
            soundBut.style.right = '100%';
        } else {
            video.volume = 1;
            soundBut.style.right = '';
        }
    }
})



/// яндекс карты

ymaps.ready(init);

let placemarks = [{
    latitude: 59.97,
    longitude: 30.31,
    hintContent: '<div class="map__hint">ул. Литераторов, д.19</div>',
    balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="./img/burger_drops.png" alt="Бургер">',
        'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
        '</div>'
    ]
}, {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: '<div class="map__hint">Малый проспект В О, д. 64</div>',
    balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="./img/burger_drops.png" alt="Бургер">',
        'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д. 64',
        '</div>'
    ]


}, {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: '<div class="map__hint">наб. реки Фонтанки, д.56</div>',
    balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="./img/burger_drops.png" alt="Бургер">',
        'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д.56',
        '</div>'
    ]


}]

geoObjects = [];

function init() {
    let map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 13,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/map-marker.png',
            iconImageSize: [46, 57],
            /* iconImageOffset: [-23, -57]*/
        });
    }

    let clusterer = new ymaps.Clusterer({
        clusterIcons: [{
            href: './img/burger_drops.png',
            size: [100, 100],
            offset: [-50, -50]
        }],
        clusterIconContentLayout: null
    })
    map.geoObjects.add(clusterer);
    /* map.geoObjects.add(placemark);*/
    clusterer.add(geoObjects)


}