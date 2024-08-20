// модалка
const modal = document.getElementById("modal");
const nameInput = document.getElementById("nameInput");
const submitName = document.getElementById("submitName");
const greeting = document.getElementById("greeting");
const greetingText = document.querySelector(".nickname");

// Обработчик события клика на кнопку "Отправить"
submitName.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name) {
    // Прячем модальное окно
    modal.style.display = "none";
    // Разрешаем прокрутку страницы
    document.body.style.overflow = "auto";
    // Показываем приветствие с введенным именем
    greetingText.textContent = `Приветствую, ${name}!`;
    greeting.style.display = "block";
  } else {
    alert("Пожалуйста, введите ваше имя.");
  }
});

// Функция, которая запускается при загрузке страницы
window.onload = function () {
  // Показываем модальное окно и запрещаем прокрутку
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

// типо легит кода
const inputMoney = document.getElementById("input");

const Money = document.querySelector(".current-money");

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
const buyOutCost = document.querySelector(".current-cost");

const cards = document.querySelectorAll(".card");


document.addEventListener("DOMContentLoaded", () => {
    const MAX_NADES_SELECTION = 4;
    let selectedCount = 0;
    let totalCost = 0;
    let currentMoney = 2000; // Примерное начальное значение
    const arrayBuy = [];
    const buyOutCost = document.querySelector(".current-cost");
    const buyOutName = document.querySelector(".current-buy");

    let isRiflesOrIntermediateBlocked = false;
    let isEqBlocked = false; // Флаг для блокировки выбора в секции cards-eq
  
    function updateBuyOutInfo(card) {
      const data = {
        number: card.querySelector(".number-item").textContent.trim(),
        name: card.querySelector(".name-buy").textContent.trim(),
        cost: card.querySelector(".cost-buy").textContent.trim(),
      };

      const cost = parseInt(data.cost.replace("$", ""), 10);

      // Обновляем общую стоимость и массив имен
      totalCost += cost;
      arrayBuy.push(data.name);
      currentMoney -= cost; // Уменьшаем текущее количество денег
      buyOutCost.textContent = `$${totalCost}`;
      buyOutName.textContent = arrayBuy.join(", ");
      // Обновите отображение текущих денег
      document.querySelector(".current-money").textContent = `$${currentMoney}`;
    }
  
    function resetSection(section) {
      section.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("selected", "blocked");
      });
    }
  
    function handleCardClick(event) {
      const card = event.currentTarget;
      const parentSection = card.parentNode;
  
      if (isRiflesOrIntermediateBlocked && (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate"))) {
        return; // Не позволяем взаимодействовать, если блокировка активна
      }
  
      if (isEqBlocked && parentSection.classList.contains("cards-eq")) {
        return; // Не позволяем взаимодействовать с карточками в секции cards-eq, если блокировка активна
      }
  
      if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
        // Снимаем выделение со всех карточек в обеих секциях
        document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
          if (c !== card) {
            c.classList.add("blocked");
          }
        });
  
        // Снимаем выделение со всех карточек в обеих секциях и выделяем текущую
        document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
          c.classList.remove("selected");
        });
  
        card.classList.add("selected");
        isRiflesOrIntermediateBlocked = true; // Блокируем выбор в этих секциях
        updateBuyOutInfo(card);
      } else if (parentSection.classList.contains("cards-nades")) {
        // Обработка выбора гранат
        if (card.classList.contains("selected")) {
          card.classList.remove("selected");
          selectedCount--;
          totalCost -= parseInt(
            card.querySelector(".cost-buy").textContent.replace("$", ""),
            10
          );
          arrayBuy.splice(
            arrayBuy.indexOf(card.querySelector(".name-buy").textContent.trim()),
            1
          );
          buyOutCost.textContent = `$${totalCost}`;
          buyOutName.textContent = arrayBuy.join(", ");
          currentMoney += parseInt(
            card.querySelector(".cost-buy").textContent.replace("$", ""),
            10
          ); // Добавляем стоимость обратно в currentMoney
          document.querySelector(".current-money").textContent = `$${currentMoney}`;
        } else if (selectedCount < MAX_NADES_SELECTION) {
          card.classList.add("selected");
          selectedCount++;
          updateBuyOutInfo(card);
        } else {
          alert("Вы можете выбрать только 4 гранаты.");
        }
      } else if (parentSection.classList.contains("cards-eq")) {
        if (!card.classList.contains("selected")) {
          card.classList.add("selected");
          updateBuyOutInfo(card);
        }
      } else {
        if (!card.classList.contains("selected")) {
          // Проверяем, есть ли уже выбранная карточка в этой секции
          const selectedCard = parentSection.querySelector(".card.selected");
          if (selectedCard) return; // Блокируем выбор другой карточки в той же секции
  
          // Снимаем выделение со всех карточек в этой секции и выделяем текущую
          parentSection.querySelectorAll(".card").forEach((c) => {
            c.classList.remove("selected");
            c.classList.add("blocked"); // Блокируем все карточки
          });
  
          card.classList.add("selected");
          updateBuyOutInfo(card);
        }
      }
    }
  
    function handleNumberItemClick(event) {
      event.stopPropagation();
      const card = this.closest(".card");
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        card.parentNode
          .querySelectorAll(".card")
          .forEach((c) => c.classList.remove("blocked")); // Разблокируем все карточки в секции
  
        // Обновляем информацию о покупке
        const data = {
          name: card.querySelector(".name-buy").textContent.trim(),
          cost: parseInt(
            card.querySelector(".cost-buy").textContent.replace("$", ""),
            10
          ),
        };
        totalCost -= data.cost;
        arrayBuy.splice(arrayBuy.indexOf(data.name), 1);
        buyOutCost.textContent = `$${totalCost}`;
        buyOutName.textContent = arrayBuy.join(", ");
        currentMoney += data.cost; // Добавляем стоимость обратно в currentMoney
        document.querySelector(".current-money").textContent = `$${currentMoney}`;
      }
    }
  
    function handleBackImgClick(event) {
      const backImg = event.currentTarget;
      const parentSection = backImg.closest(".section"); // Найти родительскую секцию
  
      if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
        // Сброс выбора и блокировок в секциях rifles и intermediate
        resetSection(parentSection);
        isRiflesOrIntermediateBlocked = false; // Разблокируем выбор в этих секциях
      } else if (parentSection.classList.contains("cards-eq")) {
        // Сброс выбора и блокировок в секции cards-eq
        resetSection(parentSection);
        isEqBlocked = false; // Разблокируем выбор в секции cards-eq
      }
  
      // Снимаем блокировку с других секций
      document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card, .cards-eq .card").forEach((c) => {
        c.classList.remove("blocked");
      });
    }
  
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", handleCardClick);
    });
  
    document.querySelectorAll(".back-buy").forEach((backBuy) => {
      backBuy.addEventListener("click", handleNumberItemClick);
      backBuy.addEventListener("click", handleBackImgClick); // Добавляем обработчик для back-img
    });
  });




// легит ласт
// document.addEventListener("DOMContentLoaded", () => {
//     const MAX_NADES_SELECTION = 4;
//     let selectedCount = 0;
//     let totalCost = 0;
//     const arrayBuy = [];
//     const buyOutCost = document.querySelector(".current-cost");
//     const buyOutName = document.querySelector(".current-buy");
  
//     let isRiflesOrIntermediateBlocked = false;
//     let isEqBlocked = false; // Флаг для блокировки выбора в секции cards-eq
  
//     function updateBuyOutInfo(card) {
//       const data = {
//         number: card.querySelector(".number-item").textContent.trim(),
//         name: card.querySelector(".name-buy").textContent.trim(),
//         cost: card.querySelector(".cost-buy").textContent.trim(),
//       };
  
//       const cost = parseInt(data.cost.replace("$", ""), 10);
  
//       // Обновляем общую стоимость и массив имен
//       totalCost += cost;
//       arrayBuy.push(data.name);
//       buyOutCost.textContent = `$${totalCost}`;
//       buyOutName.textContent = arrayBuy.join(", ");
//     }
  
//     function resetSection(section) {
//       section.querySelectorAll(".card").forEach((card) => {
//         card.classList.remove("selected", "blocked");
//       });
//     }
  
//     function handleCardClick(event) {
//       const card = event.currentTarget;
//       const parentSection = card.parentNode;
  
//       if (isRiflesOrIntermediateBlocked && (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate"))) {
//         return; // Не позволяем взаимодействовать, если блокировка активна
//       }
  
//       if (isEqBlocked && parentSection.classList.contains("cards-eq")) {
//         return; // Не позволяем взаимодействовать с карточками в секции cards-eq, если блокировка активна
//       }
  
//       if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
//         // Снимаем выделение со всех карточек в обеих секциях
//         document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
//           if (c !== card) {
//             c.classList.add("blocked");
//           }
//         });
  
//         // Снимаем выделение со всех карточек в обеих секциях и выделяем текущую
//         document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
//           c.classList.remove("selected");
//         });
  
//         card.classList.add("selected");
//         isRiflesOrIntermediateBlocked = true; // Блокируем выбор в этих секциях
//         updateBuyOutInfo(card);
//       } else if (parentSection.classList.contains("cards-nades")) {
//         // Обработка выбора гранат
//         if (card.classList.contains("selected")) {
//           card.classList.remove("selected");
//           selectedCount--;
//           totalCost -= parseInt(
//             card.querySelector(".cost-buy").textContent.replace("$", ""),
//             10
//           );
//           arrayBuy.splice(
//             arrayBuy.indexOf(card.querySelector(".name-buy").textContent.trim()),
//             1
//           );
//           buyOutCost.textContent = `$${totalCost}`;
//           buyOutName.textContent = arrayBuy.join(", ");
//         } else if (selectedCount < MAX_NADES_SELECTION) {
//           card.classList.add("selected");
//           selectedCount++;
//           updateBuyOutInfo(card);
//         } else {
//           alert("Вы можете выбрать только 4 гранаты.");
//         }
//       } else if (parentSection.classList.contains("cards-eq")) {
//         if (!card.classList.contains("selected")) {
//           card.classList.add("selected");
//           updateBuyOutInfo(card);
//         }
//       } else {
//         if (!card.classList.contains("selected")) {
//           // Проверяем, есть ли уже выбранная карточка в этой секции
//           const selectedCard = parentSection.querySelector(".card.selected");
//           if (selectedCard) return; // Блокируем выбор другой карточки в той же секции
  
//           // Снимаем выделение со всех карточек в этой секции и выделяем текущую
//           parentSection.querySelectorAll(".card").forEach((c) => {
//             c.classList.remove("selected");
//             c.classList.add("blocked"); // Блокируем все карточки
//           });
  
//           card.classList.add("selected");
//           updateBuyOutInfo(card);
//         }
//       }
//     }
  
//     function handleNumberItemClick(event) {
//       event.stopPropagation();
//       const card = this.closest(".card");
//       if (card.classList.contains("selected")) {
//         card.classList.remove("selected");
//         card.parentNode
//           .querySelectorAll(".card")
//           .forEach((c) => c.classList.remove("blocked")); // Разблокируем все карточки в секции
  
//         // Обновляем информацию о покупке
//         const data = {
//           name: card.querySelector(".name-buy").textContent.trim(),
//           cost: parseInt(
//             card.querySelector(".cost-buy").textContent.replace("$", ""),
//             10
//           ),
//         };
//         totalCost -= data.cost;
//         arrayBuy.splice(arrayBuy.indexOf(data.name), 1);
//         buyOutCost.textContent = `$${totalCost}`;
//         buyOutName.textContent = arrayBuy.join(", ");
//       }
//     }
  
//     function handleBackImgClick(event) {
//       const backImg = event.currentTarget;
//       const parentSection = backImg.closest(".section"); // Найти родительскую секцию
  
//       if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
//         // Сброс выбора и блокировок в секциях rifles и intermediate
//         resetSection(parentSection);
//         isRiflesOrIntermediateBlocked = false; // Разблокируем выбор в этих секциях
//       } else if (parentSection.classList.contains("cards-eq")) {
//         // Сброс выбора и блокировок в секции cards-eq
//         resetSection(parentSection);
//         isEqBlocked = false; // Разблокируем выбор в секции cards-eq
//       }
  
//       // Снимаем блокировку с других секций
//       document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card, .cards-eq .card").forEach((c) => {
//         c.classList.remove("blocked");
//       });
//     }
  
//     document.querySelectorAll(".card").forEach((card) => {
//       card.addEventListener("click", handleCardClick);
//     });
  
//     document.querySelectorAll(".back-buy").forEach((backBuy) => {
//       backBuy.addEventListener("click", handleNumberItemClick);
//       backBuy.addEventListener("click", handleBackImgClick); // Добавляем обработчик для back-img
//     });
//   });
  








  // легит 1
// document.addEventListener("DOMContentLoaded", () => {
//     const MAX_NADES_SELECTION = 4;
//     let selectedCount = 0;
//     let totalCost = 0;
//     const arrayBuy = [];
//     const buyOutCost = document.querySelector(".current-cost");
//     const buyOutName = document.querySelector(".current-buy");
  
//     let isRiflesOrIntermediateBlocked = false;
  
//     function updateBuyOutInfo(card) {
//       const data = {
//         number: card.querySelector(".number-item").textContent.trim(),
//         name: card.querySelector(".name-buy").textContent.trim(),
//         cost: card.querySelector(".cost-buy").textContent.trim(),
//       };
  
//       const cost = parseInt(data.cost.replace("$", ""), 10);
  
//       // Обновляем общую стоимость и массив имен
//       totalCost += cost;
//       arrayBuy.push(data.name);
//       buyOutCost.textContent = `$${totalCost}`;
//       buyOutName.textContent = arrayBuy.join(", ");
//     }
  
//     function resetSection(section) {
//       section.querySelectorAll(".card").forEach((card) => {
//         card.classList.remove("selected", "blocked");
//       });
//     }
  
//     function handleCardClick(event) {
//       const card = event.currentTarget;
//       const parentSection = card.parentNode;
  
//       if (isRiflesOrIntermediateBlocked && (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate"))) {
//         return; // Не позволяем взаимодействовать, если блокировка активна
//       }
  
//       if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
//         // Снимаем выделение со всех карточек в обеих секциях
//         document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
//           if (c !== card) {
//             c.classList.add("blocked");
//           }
//         });
  
//         // Снимаем выделение со всех карточек в обеих секциях и выделяем текущую
//         document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
//           c.classList.remove("selected");
//         });
  
//         card.classList.add("selected");
//         isRiflesOrIntermediateBlocked = true; // Блокируем выбор в этих секциях
//         updateBuyOutInfo(card);
//       } else if (parentSection.classList.contains("cards-nades")) {
//         // Обработка выбора гранат
//         if (card.classList.contains("selected")) {
//           card.classList.remove("selected");
//           selectedCount--;
//           totalCost -= parseInt(
//             card.querySelector(".cost-buy").textContent.replace("$", ""),
//             10
//           );
//           arrayBuy.splice(
//             arrayBuy.indexOf(card.querySelector(".name-buy").textContent.trim()),
//             1
//           );
//           buyOutCost.textContent = `$${totalCost}`;
//           buyOutName.textContent = arrayBuy.join(", ");
//         } else if (selectedCount < MAX_NADES_SELECTION) {
//           card.classList.add("selected");
//           selectedCount++;
//           updateBuyOutInfo(card);
//         } else {
//           alert("Вы можете выбрать только 4 гранаты.");
//         }
//       } else {
//         if (!card.classList.contains("selected")) {
//           // Проверяем, есть ли уже выбранная карточка в этой секции
//           const selectedCard = parentSection.querySelector(".card.selected");
//           if (selectedCard) return; // Блокируем выбор другой карточки в той же секции
  
//           // Снимаем выделение со всех карточек в этой секции и выделяем текущую
//           parentSection.querySelectorAll(".card").forEach((c) => {
//             c.classList.remove("selected");
//             c.classList.add("blocked"); // Блокируем все карточки
//           });
  
//           card.classList.add("selected");
//           updateBuyOutInfo(card);
//         }
//       }
//     }
  
//     function handleNumberItemClick(event) {
//       event.stopPropagation();
//       const card = this.closest(".card");
//       if (card.classList.contains("selected")) {
//         card.classList.remove("selected");
//         card.parentNode
//           .querySelectorAll(".card")
//           .forEach((c) => c.classList.remove("blocked")); // Разблокируем все карточки в секции
  
//         // Обновляем информацию о покупке
//         const data = {
//           name: card.querySelector(".name-buy").textContent.trim(),
//           cost: parseInt(
//             card.querySelector(".cost-buy").textContent.replace("$", ""),
//             10
//           ),
//         };
//         totalCost -= data.cost;
//         arrayBuy.splice(arrayBuy.indexOf(data.name), 1);
//         buyOutCost.textContent = `$${totalCost}`;
//         buyOutName.textContent = arrayBuy.join(", ");
//       }
//     }
  
//     function handleBackImgClick(event) {
//       const card = event.currentTarget.closest(".card");
//       const parentSection = card.parentNode;
  
//       if (parentSection.classList.contains("cards-rifles") || parentSection.classList.contains("cards-intermediate")) {
//         // Сброс выбора и блокировок в секциях rifles и intermediate
//         resetSection(document.querySelector(".cards-rifles"));
//         resetSection(document.querySelector(".cards-intermediate"));
//         isRiflesOrIntermediateBlocked = false; // Разблокируем выбор в этих секциях
//       }
  
//       // Снимаем блокировку с других секций
//       document.querySelectorAll(".cards-rifles .card, .cards-intermediate .card").forEach((c) => {
//         c.classList.remove("blocked");
//       });
//     }
  
//     document.querySelectorAll(".card").forEach((card) => {
//       card.addEventListener("click", handleCardClick);
//     });
  
//     document.querySelectorAll(".back-buy").forEach((numberItem) => {
//       numberItem.addEventListener("click", handleNumberItemClick);
//       numberItem.addEventListener("click", handleBackImgClick); // Добавляем обработчик для back-img
//     });
//   });
   



// document.addEventListener("DOMContentLoaded", () => {
//   const MAX_NADES_SELECTION = 4;
//   let selectedCount = 0;

//   let totalCost = 0;
//   const arrayBuy = [];
//   const buyOutCost = document.querySelector(".current-cost"); // замените на актуальный селектор
//   const buyOutName = document.querySelector(".current-buy"); // замените на актуальный селектор
//   const buyOutImg = document.querySelector(".armor");

//   function updateBuyOutInfo(card) {
//     const data = {
//       number: card.querySelector(".number-item").textContent.trim(),
//       name: card.querySelector(".name-buy").textContent.trim(),
//       cost: card.querySelector(".cost-buy").textContent.trim(),
//       img: card.querySelector(".img-buy").textContent.trim(),
//     };

//     const cost = parseInt(data.cost.replace("$", ""), 10);

//     // Обновляем общую стоимость и массив имен
//     totalCost += cost;
//     arrayBuy.push(data.name);
//     console.log(data.img);
//     // Обновляем отображение на странице
//     buyOutCost.textContent = `$${totalCost}`;
//     buyOutName.textContent = arrayBuy.join(", "); // Объединение массива имен в строку
//     // buyOutImg.textContent = data.img;
//   }

//   function handleCardClick(event) {
//     const card = event.currentTarget;
//     const parentSection = card.parentNode;

//     if (parentSection.classList.contains("cards-nades")) {
//       // Обработка выбора гранат
//       if (card.classList.contains("selected")) {
//         card.classList.remove("selected");
//         selectedCount--;
//         totalCost -= parseInt(
//           card.querySelector(".cost-buy").textContent.replace("$", ""),
//           10
//         );
//         arrayBuy.splice(
//           arrayBuy.indexOf(card.querySelector(".name-buy").textContent.trim()),
//           1
//         );
//         buyOutCost.textContent = `$${totalCost}`;
//         buyOutName.textContent = arrayBuy.join(", ");
//       } else if (selectedCount < MAX_NADES_SELECTION) {
//         card.classList.add("selected");
//         selectedCount++;
//         updateBuyOutInfo(card);
//       } else {
//         alert("Вы можете выбрать только 4 гранаты.");
//       }
//     } else {
//       if (!card.classList.contains("selected")) {
//         // Проверяем, есть ли уже выбранная карточка в этой секции
//         const selectedCard = parentSection.querySelector(".card.selected");
//         if (selectedCard) return; // Блокируем выбор другой карточки в той же секции

//         // Снимаем выделение со всех карточек в этой секции и выделяем текущую
//         parentSection.querySelectorAll(".card").forEach((c) => {
//           c.classList.remove("selected");
//           c.classList.add("blocked"); // Блокируем все карточки
//         });

//         card.classList.add("selected");
//         updateBuyOutInfo(card);
//       }
//     }
//   }

//   function handleNumberItemClick(event) {
//     event.stopPropagation();
//     const card = this.closest(".card");
//     if (card.classList.contains("selected")) {
//       card.classList.remove("selected");
//       card.parentNode
//         .querySelectorAll(".card")
//         .forEach((c) => c.classList.remove("blocked")); // Разблокируем все карточки в секции

//       // Обновляем информацию о покупке
//       const data = {
//         name: card.querySelector(".name-buy").textContent.trim(),
//         cost: parseInt(
//           card.querySelector(".cost-buy").textContent.replace("$", ""),
//           10
//         ),
//       };
//       totalCost -= data.cost;
//       arrayBuy.splice(arrayBuy.indexOf(data.name), 1);
//       buyOutCost.textContent = `$${totalCost}`;
//       buyOutName.textContent = arrayBuy.join(", ");
//     }
//   }

//   document.querySelectorAll(".card").forEach((card) => {
//     card.addEventListener("click", handleCardClick);
//   });

//   document.querySelectorAll(".back-buy").forEach((numberItem) => {
//     numberItem.addEventListener("click", handleNumberItemClick);
//   });
// });
