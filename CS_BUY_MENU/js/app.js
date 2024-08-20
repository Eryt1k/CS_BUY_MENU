

// модалка
const modal = document.getElementById('modal');
const nameInput = document.getElementById('nameInput');
const submitName = document.getElementById('submitName');
const greeting = document.getElementById('greeting');
const greetingText = document.querySelector('.nickname');

// Обработчик события клика на кнопку "Отправить"
submitName.addEventListener('click', () => {
    const name = nameInput.value.trim();

    if (name) {
        // Прячем модальное окно
        modal.style.display = 'none';
        // Разрешаем прокрутку страницы
        document.body.style.overflow = 'auto';
        // Показываем приветствие с введенным именем
        greetingText.textContent = `Приветствую, ${name}!`;
        greeting.style.display = 'block';
    } else {
        alert('Пожалуйста, введите ваше имя.');
    }
});

// Функция, которая запускается при загрузке страницы
window.onload = function() {
    // Показываем модальное окно и запрещаем прокрутку
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};
















// типо легит кода
const inputMoney = document.getElementById("input");

const currentMoney = document.querySelector(".current-money");

inputMoney.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const inputValue = inputMoney.value;
    if ((inputValue <= 16000) & (inputValue > 0)) {
      currentMoney.textContent = `$ ${inputValue}`;
    }
    textMoney.value = "";
  }
});

const buyOutName = document.querySelector(".current-buy");
const buyOutCost = document.querySelector('.current-cost');

const cards = document.querySelectorAll(".card");

// cards.forEach(card => {
//     card.addEventListener('click', function() {
//         // Получаем все дочерние элементы карточки
//         const childElements = Array.from(this.children);

//         // Создаем объект для хранения данных элементов
//         const elementData = childElements.map(el => ({
//             tag: el.tagName,
//             text: el.textContent
//         }));

//         // Выводим данные в консоль
//         console.log(elementData);

//         // Пример доступа к элементам
//         elementData.forEach(element => {
//             buyOut.textContent = element.text
//             console.log(`Элемент ${element.tag} содержит текст: ${element.text}`);
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const MAX_NADES_SELECTION = 4;
    let selectedCount = 0;

    let totalCost = 0;
    const arrayBuy = [];
    const buyOutCost = document.querySelector('.current-cost'); // замените на актуальный селектор
    const buyOutName = document.querySelector('.current-buy'); // замените на актуальный селектор
    const buyOutImg = document.querySelector(".armor");

    function updateBuyOutInfo(card) {
        const data = {
            number: card.querySelector(".number-item").textContent.trim(),
            name: card.querySelector(".name-buy").textContent.trim(),
            cost: card.querySelector(".cost-buy").textContent.trim(),
            img: card.querySelector(".img-buy").textContent.trim(),
        };

        const cost = parseInt(data.cost.replace('$', ''), 10);

        // Обновляем общую стоимость и массив имен
        totalCost += cost;
        arrayBuy.push(data.name);

        // Обновляем отображение на странице
        buyOutCost.textContent = `$${totalCost}`;
        buyOutName.textContent = arrayBuy.join(', '); // Объединение массива имен в строку
        // buyOutImg.textContent = data.img;
    }

    function handleCardClick(event) {
        const card = event.currentTarget;
        const parentSection = card.parentNode;

        if (parentSection.classList.contains('cards-nades')) {
            // Обработка выбора гранат
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedCount--;
                totalCost -= parseInt(card.querySelector(".cost-buy").textContent.replace('$', ''), 10);
                arrayBuy.splice(arrayBuy.indexOf(card.querySelector(".name-buy").textContent.trim()), 1);
                buyOutCost.textContent = `$${totalCost}`;
                buyOutName.textContent = arrayBuy.join(', ');
            } else if (selectedCount < MAX_NADES_SELECTION) {
                card.classList.add('selected');
                selectedCount++;
                updateBuyOutInfo(card);
            } else {
                alert('Вы можете выбрать только 4 гранаты.');
            }
        } else {
            if (!card.classList.contains('selected')) {
                // Проверяем, есть ли уже выбранная карточка в этой секции
                const selectedCard = parentSection.querySelector('.card.selected');
                if (selectedCard) return; // Блокируем выбор другой карточки в той же секции

                // Снимаем выделение со всех карточек в этой секции и выделяем текущую
                parentSection.querySelectorAll('.card').forEach(c => {
                    c.classList.remove('selected');
                    c.classList.add('blocked'); // Блокируем все карточки
                });

                card.classList.add('selected');
                updateBuyOutInfo(card);
            }
        }
    }

    function handleNumberItemClick(event) {
        event.stopPropagation();
        const card = this.closest('.card');
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            card.parentNode.querySelectorAll('.card').forEach(c => c.classList.remove('blocked')); // Разблокируем все карточки в секции

            // Обновляем информацию о покупке
            const data = {
                name: card.querySelector(".name-buy").textContent.trim(),
                cost: parseInt(card.querySelector(".cost-buy").textContent.replace('$', ''), 10)
            };
            totalCost -= data.cost;
            arrayBuy.splice(arrayBuy.indexOf(data.name), 1);
            buyOutCost.textContent = `$${totalCost}`;
            buyOutName.textContent = arrayBuy.join(', ');
        }
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', handleCardClick);
    });

    document.querySelectorAll('.back-buy').forEach(numberItem => {
        numberItem.addEventListener('click', handleNumberItemClick);
    });
});


// document.addEventListener('DOMContentLoaded', () => {

//     const MAX_NADES_SELECTION = 4;
//     let selectedCount = 0;

//     let totalCost = 0;
//     const arrayBuy = [];
//     const buyOutCost = document.querySelector('.current-cost'); // замените на актуальный селектор
//     const buyOutName = document.querySelector('.current-buy'); // замените на актуальный селектор

//     function updateBuyOutInfo(card) {
//         const data = {
//             number: card.querySelector(".number-item").textContent.trim(),
//             name: card.querySelector(".name-buy").textContent.trim(),
//             cost: card.querySelector(".cost-buy").textContent.trim(),
//         };
    
//         const cost = parseInt(data.cost.replace('$', ''), 10);

//         // Обновляем общую стоимость и массив имен
//         totalCost += cost;
//         arrayBuy.push(data.name);

//         // Обновляем отображение на странице
//         buyOutCost.textContent = `$${totalCost}`;
//         buyOutName.textContent = arrayBuy.join(', '); // Объединение массива имен в строку
//     }

//     function handleCardClick(event) {
//         const card = event.currentTarget;
//         const parentSection = card.parentNode;

        

//         if (parentSection.classList.contains('cards-nades')) {
//             // Обработка выбора гранат
//             if (card.classList.contains('selected')) {
//                 card.classList.remove('selected');
//                 selectedCount--;
//             } else if (selectedCount < MAX_NADES_SELECTION) {
//                 card.classList.add('selected');
//                 selectedCount++;
//             } else {
//                 alert('Вы можете выбрать только 4 гранаты.');
//             }
//         } else {
//             // Обработка выбора карточек в других секциях
//             parentSection.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
//             card.classList.add('selected');
//         }
//     }

//     function handleNumberItemClick(event) {
//         event.stopPropagation();
//         const card = this.closest('.card');
//         if (card.classList.contains('selected')) {
//             card.classList.remove('selected');
//             if (card.parentNode.classList.contains('cards-nades')) {
//                 selectedCount--;
//             }
//         }
//     }

//     document.querySelectorAll('.card').forEach(card => {
//         card.addEventListener('click', handleCardClick , function () {
//             updateBuyOutInfo(this);
//         });
//     });

//     document.querySelectorAll('.back-buy').forEach(numberItem => {
//         numberItem.addEventListener('click', handleNumberItemClick);
//     });



// });






// document.querySelectorAll('.equipment .cards-eq .card, .cards-pistols .card, .cards-intermediate .card, .cards-rifles .card').forEach(card => {
//     card.addEventListener('click', function() {
//         const parentSection = this.parentNode;
        
//         // Проверяем, есть ли уже выбранная карточка в этой секции
//         const selectedCard = parentSection.querySelector('.card.selected');
//         if (selectedCard && selectedCard !== this) return; // Блокируем выбор другой карточки в той же секции

//         // Снимаем выделение со всех карточек в этой секции и выделяем текущую
//         parentSection.querySelectorAll('.card').forEach(card => {
//             card.classList.remove('selected');
//         });

//         this.classList.add('selected');
//     });

//     // Добавляем обработчик на элемент .number-item для снятия выделения
//     const backBuy = card.querySelector('.back-buy');
//     backBuy.addEventListener('click', function(event) {
//         event.stopPropagation(); // Останавливаем дальнейшую обработку события
//         const parentSection = card.parentNode;

//         if (card.classList.contains('selected')) {
//             card.classList.remove('selected');
//         }
//     });
// });

// const nades = document.querySelectorAll('.cards-nades .card');
// let selectedCount = 0;

// nades.forEach(card => {
//     card.addEventListener('click', function() {
//         const parentSection = this.parentNode;

//         if (this.classList.contains('selected')) {
//             // Если карточка уже выбрана, то при повторном клике снимаем выбор
//             this.classList.remove('selected');
//             selectedCount--;
//         } else if (selectedCount < 4) {
//             // Если еще не выбраны 4 карточки, то выделяем эту карточку
//             this.classList.add('selected');
//             selectedCount++;
//         } else {
//             // Если уже выбраны 4 карточки, выводим предупреждение (или просто ничего не делаем)
//             alert('Вы можете выбрать только 4 гранаты.');
//         }
//     });

//     // Добавляем обработчик на элемент .number-item для снятия выделения
//     const backBuy = card.querySelector('.back-buy');
//     backBuy.addEventListener('click', function(event) {
//         event.stopPropagation(); // Останавливаем дальнейшую обработку события
//         if (card.classList.contains('selected')) {
//             card.classList.remove('selected');
//             selectedCount--;
//         }
//     });
// });







// Рабочий для всех

// let totalCost = 0;
// let arrayBuy = [];

// document.querySelectorAll(".card").forEach((card) => {
//   card.addEventListener("click", function () {
//     // Получаем данные из элементов внутри карточки
//     const data = {
//       number: this.querySelector(".number-item").textContent.trim(),
//       name: this.querySelector(".name-buy").textContent.trim(),
//       cost: this.querySelector(".cost-buy").textContent.trim(),
//     };
    
//     const cost = parseInt(data.cost.replace('$', ''), 10);
//     totalCost += cost;


//     arrayBuy.push(data.name);


//     // // Выводим объект в консоль
//     // console.log(data);

//     // // Если нужен массив
//     // const dataArray = Object.values(data);
//     // console.log(dataArray);
//     buyOutCost.textContent = `$${totalCost}`;
//     buyOutName.textContent = ` ${arrayBuy}`
//   });
// });
