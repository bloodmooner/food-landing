window.addEventListener('DOMContentLoaded', ()=> {


    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabcontainer');

    
    function hideTabsContent() {

        tabsContent.forEach((item) => {
            item.style.display = 'none';
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabsContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }

    });

    // Timer

    const deadline = '2021-05-11';

    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
              
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
        
    }

    function getZero(num) {
        if(num >=0 && num <10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { 
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal

    const modalWindow = document.querySelector('.modal'),
          modalClose = document.querySelector('.modal__close'),
          modalBtns = document.querySelectorAll('[data-modal]');


    function showModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }


    modalBtns.forEach((item) => {
        item.addEventListener('click', (event) => {
            const target = event.target;
            if (target == item) {
                showModal();
            }
        });
    });


    function hideModal() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', hideModal);

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow) {
            hideModal();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            hideModal();
        }
    });

    const modalTimerId = setTimeout(showModal, 5000);
    
    function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                showModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
    }

    window.addEventListener('scroll', showModalByScroll);
    


    // Cards 

    const cardsContainer = document.querySelector('.menu__field .container');

    cardsContainer.innerHTML = '';

    class Card {
        constructor(title, description, price, image, ...classes) {
            this.title = title;
            this.description = description;
            this.price = price;
            this.image = image;
            this.classes = classes;
        }
        renderItem() {
            this.classes.forEach(className => element.classList.add(className));
            cardsContainer.innerHTML += `
            <div class="menu__item">
                <img src="${this.image}" alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;
        }
    }

    const firstItem = new Card(
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        229, 
        'img/tabs/vegy.jpg'
    );

    const secondItem = new Card (
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        'img/tabs/elite.jpg'
    );

    const thirdItem = new Card (
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        'img/tabs/post.jpg'
    );

    firstItem.renderItem();
    secondItem.renderItem();
    thirdItem.renderItem();
    
});