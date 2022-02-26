'use strict';

document.addEventListener('DOMContentLoaded', () => {
  
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');


  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target

    if (target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, i) => {
        if (target == item) {
           hideTabContent();
           showTabContent(i);
        }
      });
    };
  });

    //классы для карточек
  
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = +this.price * this.transfer;
    }

    render() {
      const elem = document.createElement('div');
      if (this.classes.length === 0) {
        this.elem = 'menu__item';
        elem.classList.add(this.elem);
      } else {
        this.classes.forEach(className => elem.classList.add(className));
      }
      
      elem.innerHTML = `
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
      <div class="menu__item-cost">Цена:</div>
      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    `;

      this.parent.append(elem);
    }
  }

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite", 
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн   упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    9,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post", 
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    6,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite", 
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн   упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    9,
    '.menu .container',
    'menu__item'
  ).render();


// Отправка данных с форм
  
  const forms = document.querySelectorAll('form');
  const formMessage = {
    loading: 'Загрузка',
    success: 'Данные успешно отправлены',
    error: 'Ошибка отправки данных'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = formMessage.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form);
      
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);
      
      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          statusMessage.textContent = formMessage.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          },2000);
        } else {
          statusMessage.textContent = formMessage.error;
        }

      })

    });
  }



});



