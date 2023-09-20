//openModal 
const callBtn = document.querySelector('.callback_btn'),
    modal = document.querySelector('.modal');

callBtn.addEventListener('click', () => {
    modal.classList.toggle('d-none');
});

//rangeValue
const value = document.querySelector("#value"),
    input = document.querySelector("#square");

value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});

//rangeBeauty
input.oninput = function () {
    let value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #BE69D5 0%, #BE69D5 ' + value + '%, #BAF1FF ' + value + '%, #BAF1FF 100%)'
};

//scroll
const scrollBtn = document.querySelector('.scroll_btn'),
    imgDisapear = document.querySelector('#img');

let num = 5;
scrollBtn.addEventListener('click', (e) => {
    if (e.target) {
        imgDisapear.style.transform = `translateX( ${num}%)`;
        num += 5;
    }
});

//script
document.addEventListener("DOMContentLoaded", () => {
    const articleInput = document.getElementById("articleInput");
    const searchButton = document.getElementById("searchButton");
    const resultTable = document.getElementById("resultTable");

    searchButton.addEventListener("click", () => {
        const article = articleInput.value;

        // Очищаем таблицу
        resultTable.innerHTML = "";

        // Загружаем базу данных
        fetch("database.json")
            .then((response) => response.json())
            .then((data) => {
                // Фильтруем данные по артикулу
                const filteredData = data.filter((item) => item.артикул === article);

                // Если есть совпадения, создаем таблицу
                if (filteredData.length > 0) {
                    const tableHeader = document.createElement("thead");
                    const headerRow = document.createElement("tr");

                    // Создаем заголовки столбцов
                    for (const key in filteredData[0]) {
                        const headerCell = document.createElement("th");
                        headerCell.textContent = key;
                        headerRow.appendChild(headerCell);
                    }

                    tableHeader.appendChild(headerRow);
                    resultTable.appendChild(tableHeader);

                    // Заполняем таблицу данными
                    filteredData.forEach((item) => {
                        const row = document.createElement("tr");

                        for (const key in item) {
                            const cell = document.createElement("td");
                            cell.textContent = item[key];
                            row.appendChild(cell);
                        }

                        resultTable.appendChild(row);
                    });
                } else {
                    // Если нет совпадений, выводим сообщение
                    const noResultsRow = document.createElement("tr");
                    const noResultsCell = document.createElement("td");
                    noResultsCell.textContent = "Нет данных для артикула " + article;
                    noResultsCell.colSpan = Object.keys(data[0]).length;
                    noResultsRow.appendChild(noResultsCell);
                    resultTable.appendChild(noResultsRow);
                }
            })
            .catch((error) => {
                console.error("Ошибка запроса: ", error);
            });
    });
});

//popup
const openPopupButton = document.querySelector("#openPopupButton");
const closePopupButton = document.querySelector("#closePopupButton");
const popup = document.querySelector("#popup");
const sendButton = document.querySelector("#sendButton");
const emailInput = document.querySelector("#emailInput");

openPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send message to email
sendButton.addEventListener("click", () => {
    const userEmail = emailInput.value;

    if (isValidEmail(userEmail)) {
        console.log("Это правильный электронный адрес.");
        const message = 'Привет';
        console.log(`${message} отправлено на почту: ${userEmail}`);
        popup.style.display = "none";
    } else {
        emailInput.value = '';
        console.log("Неправильный электронный адрес.");
    }

});

//ya map
function init() {
    const myMap = new ymaps.Map('map', {
        center: [55.74, 37.58],
        zoom: 13,
        controls: []
    });

    const searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search'
        }
    });

    myMap.controls.add(searchControl);

    searchControl.search('Достопримечательности москвы');
}

ymaps.ready(init);