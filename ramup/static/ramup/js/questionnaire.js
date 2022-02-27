const endQuestion = "18";
const state = {}
const baseUrl = window.location.protocol + "//" + window.location.host;

const getCites = async () => {
    const url = new URL(`${baseUrl}/ramup/cites/`)
    const response = await fetch(url, {
        method: 'GET',
    });
    result = response.json();
    return result;
}

const getStationByCity = async (city_id) => {
    const url = new URL(`${baseUrl}/ramup/station_by_town/${city_id}/`)
    const number_q = "7"
    const response = await fetch(url, {
        method: 'GET',
    });
    stations = await response.json();
    state.stations = stations;
    const q_li = document.getElementById(number_q);
    stations.forEach((station, index) => {
        const form_check = document.createElement('div');
        form_check.classList.add("form-check");
        q_li.appendChild(form_check);
        const input_form_check = document.createElement('input');
        input_form_check.classList.add("form-check-input");
        form_check.classList.add("form-switch");
        Object.assign(input_form_check, {
            id: `${index+1}_${number_q}`,
            type: "checkbox",
            name: `checkbox${7}`,
            value: station.radioStation.name_rus
        });
        form_check.appendChild(input_form_check);
        const label_form_check = document.createElement('label');
        label_form_check.classList.add("form-check-label");
        label_form_check.setAttribute("for", `${index+1}_${number_q}`);
        label_form_check.textContent = `${station.radioStation.name_rus} ${station.frequency}`
        form_check.appendChild(label_form_check);
    });
    q_li.addEventListener("input", (event) => {
        const listStations = document.getElementsByName("checkbox7")
        const selectedStations = Array.prototype.slice.call(listStations).filter(ch => ch.checked == true);
        question_btn_next = document.getElementById("btn_succes_7")

        if (selectedStations.length != 0) {
            question_btn_next.setAttribute('href', `#${8}`);
            question_btn_next.classList.remove("disabled");

        } else {
            question_btn_next.setAttribute('href', "");
            question_btn_next.classList.add("disabled")

        }
    });
}

const questions = [{
        number: '0',
        next: '1',
        handler: null,
        content: "Здравствуйте! Меня зовут …, я представляю компанию «МедиаИзмеритель». Мы изучаем общественное мнение о белорусском радио. Можно ли задать Вам несколько вопросов на эту тему? Опрос займет около 3 минут.  ",
        hint: "Запишите со слов абонента",
        answers: [{
                answer: 'согласен ',
                next_question: '1'
            },
            {
                answer: 'не согласен ',
                next_question: endQuestion
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '1',
        next: '2',
        handler: 'hi',
        content: "1. Спасибо! Как я могу к Вам обращаться?",
        hint: "",
        answers: null,
        type: 'text',
        validator: "name"
    },
    {
        number: '2',
        next: '3',
        handler: "city",
        content: "2. В каком населенном пункте Вы постоянно проживаете?",
        hint: "",
        answers: getCites(),
        type: "radio"
    },
    {
        number: '3',
        next: '4',
        handler: null,
        content: "3. Сколько вам полных лет?",
        hint: "",
        answers: null,
        type: "number",
        validator: 'age'
    },
    {
        number: '4',
        next: '5',
        content: "4. Пол респондента",
        hint: "ВОПРОС НЕ ЗАЧИТЫВАТЬ, ОТМЕТИТЬ САМОСТОЯТЕЛЬНО.",
        answers: [{
                answer: 'М',
                next_question: '5'
            },
            {
                answer: 'Ж',
                next_question: '5'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '5',
        next: '6',
        handler: null,
        content: "5. Скажите, пожалуйста, Вы слушали радио хотя бы один раз за последние 7 дней?",
        hint: "",
        answers: [{
                answer: 'Да',
                next_question: '7'
            },
            {
                answer: 'Нет',
                next_question: '6'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '6',
        next: '13',
        handler: null,
        content: "6. Скажите, пожалуйста, Вы слушали радио хотя бы один раз за последние 30 дней?",
        hint: "",
        answers: [{
                answer: 'Да',
                next_question: '13'
            },
            {
                answer: 'Нет',
                next_question: '13'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '7',
        next: '8',
        handler: null,
        content: "7. Сейчас я зачитаю список белорусских радиостанций, которые звучат в Вашем городе. Назовите, пожалуйста, те, которые Вы слушали за последние 7 дней. ",
        hint: "",
        answers: null,
        type: "checkbox",
        validator: null
    },
    {
        number: '8',
        next: '9',
        handler: null,
        content: "8. Скажите, пожалуйста, Вы слушали радио вчера?",
        hint: "",
        answers: [{
                answer: 'Не слушал',
                next_question: '13'
            },
            {
                answer: 'Слушал',
                next_question: '9'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '9',
        next: '10',
        handler: null,
        content: "9.  Давайте вспомним Ваш вчерашний день подробнее. Скажите, пожалуйста, вы слушали радио вчера утром в промежутке времени с 6 утра до 12 дня?",
        hint: "",
        answers: [{
                answer: 'Не слушал',
                next_question: '10'
            },
            {
                answer: 'Слушал',
                next_question: '9_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '9_1',
        next: '9_2',
        handler: "question_9_1",
        content: "9.1. Скажите, пожалуйста, в каком именно месте вы слушали радио вчера утром (в промежутке времени с 6 до 12)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Дома / на даче',
                next_question: '9_2'
            },
            {
                answer: 'На работе / учебе',
                next_question: '9_2'
            },
            {
                answer: 'В машине / гараже',
                next_question: '9_2'
            },
            {
                answer: 'В общественном транспорте / заведении / такси',
                next_question: '9_2'
            },
            {
                answer: 'Вне помещения / на улице',
                next_question: '9_2'
            },
        ],
        type: "checkbox",
        type2: "text",
        validator: null
    },
    {
        number: '9_2',
        next: '9_3',
        handler: null,
        content: "9.2. С помощью каких устройств Вы слушали радио вчера утром /ПОДСТАВИТЬ МЕСТО ИЗ ВОПРОСА 9.1/ (в промежутке времени с 6 до 12)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Радиоприемник',
                next_question: '9_2'
            },
            {
                answer: 'Автомагнитола',
                next_question: '9_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через FM тюнер)',
                next_question: '9_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через интернет) ',
                next_question: '9_2'
            },
            {
                answer: 'Компьютер, ноутбук, планшет (через интернет)',
                next_question: '9_2'
            },
        ],
        type: "radio",
        validator: null
    },
    {
        number: '9_3',
        next: '9_4',
        handler: null,
        content: "9.3. В какое именно время вы слушали радио вчера утром в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '9_4',
        next: '10',
        handler: null,
        content: "9.4.  Скажите, пожалуйста, какие именно радиостанции вы слушали вчера утром в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '9_5',
        next: '10',
        handler: null,
        content: "9.5. Скажите, пожалуйста, вы ещё где-нибудь слушали радио вчера утром?  ",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '10'
            },
            {
                answer: 'Слушал',
                next_question: '9_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '10',
        next: '10_1',
        handler: null,
        content: "10. Скажите, пожалуйста, вы слушали радио вчера ДНЁМ в промежутке времени с 12 до 18?",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '11'
            },
            {
                answer: 'Слушал',
                next_question: '10_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '10_1',
        next: '10_2',
        handler: "question_10_1",
        content: "10.1. Скажите, пожалуйста, в каком именно месте вы слушали радио вчера ДНЁМ (в промежутке времени с 12 до 18)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Дома / на даче',
                next_question: '10_2'
            },
            {
                answer: 'На работе / учебе',
                next_question: '10_2'
            },
            {
                answer: 'В машине / гараже',
                next_question: '10_2'
            },
            {
                answer: 'В общественном транспорте / заведении / такси',
                next_question: '10_2'
            },
            {
                answer: 'Вне помещения / на улице',
                next_question: '10_2'
            },
        ],
        type: "checkbox",
        type2: "text",
        validator: null
    },
    {
        number: '10_2',
        next: '10_3',
        handler: null,
        content: "10.2. С помощью каких устройств Вы слушали радио вчера ДНЁМ (в промежутке времени с 12 до 18)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Радиоприемник',
                next_question: '10_2'
            },
            {
                answer: 'Автомагнитола',
                next_question: '10_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через FM тюнер)',
                next_question: '10_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через интернет) ',
                next_question: '10_2'
            },
            {
                answer: 'Компьютер, ноутбук, планшет (через интернет)',
                next_question: '10_2'
            },
        ],
        type: "radio",
        validator: null
    },
    {
        number: '10_3',
        next: '10_4',
        handler: null,
        content: "10.3. В какое именно время вы слушали радио вчера ДНЁМ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '10_4',
        next: '10_5',
        handler: null,
        content: "10.4.  Скажите, пожалуйста, какие именно радиостанции вы слушали вчера ДНЁМ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '10_5',
        next: '11',
        handler: null,
        content: "10.5. Скажите, пожалуйста, вы ещё где-нибудь слушали радио вчера ДНЁМ?  ",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '11'
            },
            {
                answer: 'Слушал',
                next_question: '10_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '11',
        next: '11_1',
        handler: null,
        content: "11. Скажите, пожалуйста, вы слушали радио вчера ВЕЧЕРОМ в промежутке времени с 18 до 24?",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '11'
            },
            {
                answer: 'Слушал',
                next_question: '11_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '11_1',
        next: '11_2',
        handler: "question_11_1",
        content: "11.1. Скажите, пожалуйста, в каком именно месте вы слушали радио вчера ВЕЧЕРОМ (в промежутке времени с 18 до 24)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Дома / на даче',
                next_question: '11_2'
            },
            {
                answer: 'На работе / учебе',
                next_question: '11_2'
            },
            {
                answer: 'В машине / гараже',
                next_question: '11_2'
            },
            {
                answer: 'В общественном транспорте / заведении / такси',
                next_question: '11_2'
            },
            {
                answer: 'Вне помещения / на улице',
                next_question: '11_2'
            },
        ],
        type: "checkbox",
        type2: "text",
        validator: null
    },
    {
        number: '11_2',
        next: '11_3',
        handler: null,
        content: "11.2. С помощью каких устройств Вы слушали радио вчера днем (в промежутке времени с 18 до 24)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Радиоприемник',
                next_question: '11_2'
            },
            {
                answer: 'Автомагнитола',
                next_question: '11_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через FM тюнер)',
                next_question: '11_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через интернет) ',
                next_question: '11_2'
            },
            {
                answer: 'Компьютер, ноутбук, планшет (через интернет)',
                next_question: '11_2'
            },
        ],
        type: "radio",
        validator: null
    },
    {
        number: '11_3',
        next: '11_4',
        handler: null,
        content: "11.3. В какое именно время вы слушали радио вчера ВЕЧЕРОМ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '11_4',
        next: '11_5',
        handler: null,
        content: "11.4.  Скажите, пожалуйста, какие именно радиостанции вы слушали вчера ВЕЧЕРОМ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '11_5',
        next: '12',
        handler: null,
        content: "11.5. Скажите, пожалуйста, вы ещё где-нибудь слушали радио вчера ВЕЧЕРОМ?  ",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '12'
            },
            {
                answer: 'Слушал',
                next_question: '11_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '12',
        next: '12_1',
        handler: null,
        content: "12. Скажите, пожалуйста, вы слушали радио вчера НОЧЬЮ в промежутке времени с 24 до 06?",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '11'
            },
            {
                answer: 'Слушал',
                next_question: '12_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '12_1',
        next: '12_2',
        handler: "question_12_1",
        content: "12.1. Скажите, пожалуйста, в каком именно месте вы слушали радио вчера НОЧЬЮ (в промежутке времени с 24 до 06)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Дома / на даче',
                next_question: '12_2'
            },
            {
                answer: 'На работе / учебе',
                next_question: '12_2'
            },
            {
                answer: 'В машине / гараже',
                next_question: '12_2'
            },
            {
                answer: 'В общественном транспорте / заведении / такси',
                next_question: '12_2'
            },
            {
                answer: 'Вне помещения / на улице',
                next_question: '12_2'
            },
        ],
        type: "checkbox",
        type2: "text",
        validator: null
    },
    {
        number: '12_2',
        next: '12_3',
        handler: null,
        content: "12.2. С помощью каких устройств Вы слушали радио вчера НОЧЬЮ (в промежутке времени с 24 до 06)? ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Радиоприемник',
                next_question: '12_2'
            },
            {
                answer: 'Автомагнитола',
                next_question: '12_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через FM тюнер)',
                next_question: '12_2'
            },
            {
                answer: 'Мобильный телефон, смартфон (через интернет) ',
                next_question: '12_2'
            },
            {
                answer: 'Компьютер, ноутбук, планшет (через интернет)',
                next_question: '12_2'
            },
        ],
        type: "radio",
        validator: null
    },
    {
        number: '12_3',
        next: '12_4',
        handler: null,
        content: "12.3. В какое именно время вы слушали радио вчера НОЧЬЮ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '12_4',
        next: '12_5',
        handler: null,
        content: "12.4.  Скажите, пожалуйста, какие именно радиостанции вы слушали вчера НОЧЬЮ в",
        hint: null,
        answers: null,
        type: null,
        validator: null
    },
    {
        number: '12_5',
        next: '13',
        handler: null,
        content: "12.5. Скажите, пожалуйста, вы ещё где-нибудь слушали радио вчера НОЧЬЮ?  ",
        hint: null,
        answers: [{
                answer: 'Не слушал',
                next_question: '13'
            },
            {
                answer: 'Слушал',
                next_question: '12_1'
            }
        ],
        type: "radio",
        validator: null
    },
    {
        number: '13',
        next: '14',
        handler: null,
        content: "13. Спасибо, что ответили на вопросы про радио, осталось пару последних вопросов социального характера. Укажите, пожалуйста, Ваше образование: ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: 'Неполное среднее (в том числе начальное образование)',
                next_question: '14'
            },
            {
                answer: 'Среднее (в том числе ПТУ со средним образованием)',
                next_question: '14'
            },
            {
                answer: 'Среднее специальное (техникум, колледж и т. д.)',
                next_question: '14'
            },
            {
                answer: 'Высшее (в том числе магистратура, аспирантура, соискательство)',
                next_question: '14'
            },
            {
                answer: 'Затрудняюсь ответить / Отказ от ответа (НЕ ЗАЧИТЫВАТЬ)',
                next_question: '14'
            },
        ],
        type: "radio",
        type2: null,
        validator: null
    },
    {
        number: '14',
        next: '15',
        handler: null,
        content: "14. Укажите, пожалуйста, Вашу занятость?",
        hint: "10.	Другое (ЗАПИШИТЕ СО СЛОВ РЕСПОНДЕНТА)",
        answers: [{
                answer: 'Руководитель ',
                next_question: '15'
            },
            {
                answer: 'Специалист',
                next_question: '15'
            },
            {
                answer: 'Служащий ',
                next_question: '15'
            },
            {
                answer: 'Рабочий ',
                next_question: '15'
            },
            {
                answer: 'Учащийся',
                next_question: '15'
            },
            {
                answer: 'Домохозяйка',
                next_question: '15'
            },
            {
                answer: 'Безработный',
                next_question: '15'
            },
            {
                answer: 'Пенсионер',
                next_question: '15'
            },
            {
                answer: 'Самозанятый',
                next_question: '15'
            },
        ],
        type: "radio",
        type2: "text",
        validator: null
    },
    {
        number: '15',
        next: '16',
        handler: null,
        content: "15. Скажите, пожалуйста, какую часть Вашего дохода в % соотношении Вы тратите на продукты питания? ЗАЧИТАТЬ. ",
        hint: "В другом месте (уточните и запишите, где именно)",
        answers: [{
                answer: '1. 75 % и более',
                next_question: '16'
            },
            {
                answer: '2. 50-75%',
                next_question: '16'
            },
            {
                answer: '3. 25-50 %',
                next_question: '16'
            },
            {
                answer: '4. 25% и менее',
                next_question: '16'
            },
            {
                answer: '5. Затрудняюсь ответить / отказ от ответа (НЕ ЗАЧИТЫВАТЬ)',
                next_question: '16'
            }
        ],
        type: "radio",
        type2: null,
        validator: null
    },
    {
        number: '16',
        next: '17',
        handler: null,
        content: "16. Спасибо за ваше мнение! Можно ли перезвонить вам через полгода, чтобы узнать, как изменится ваш опыт прослушивания радио?",
        hint: null,
        answers: [{
                answer: '1. Да ',
                next_question: '17'
            },
            {
                answer: '2. Скорее да ',
                next_question: '17'
            },
            {
                answer: '3. Скорее нет ',
                next_question: '18'
            },
            {
                answer: '4. Нет ',
                next_question: '18'
            },
            {
                answer: '5. Затрудняюсь ответить ',
                next_question: '17'
            }
        ],
        type: "radio",
        type2: null,
        validator: null
    },
    {
        number: "17",
        next: endQuestion,
        handler: null,
        content: "17. Спасибо! Через некоторое время с Вами свяжутся сотрудники нашей компании и предложат снова ответить на вопросы. Спасибо за участие в опросе! Всего хорошего!",
        hint: "",
        answers: null,
        type: null,
        validator: null
    },
    {
        number: endQuestion,
        next: endQuestion,
        handler: null,
        content: "18. Спасибо! Очень жаль",
        hint: "",
        answers: null,
        type: null,
        validator: null
    }

];

const handler9_1 = (target) => {
    const li_9_1 = document.getElementById("9_1")
    const listPlaces = document.getElementsByName("radio_9_1")
    const addPlace = document.getElementById("answer_9_1")
    const selectedPlase = Array.prototype.slice.call(listPlaces).filter(ch => ch.checked == true);
    question_btn_next = document.getElementById("btn_succes_9_1")
    if (selectedPlase != 0 | addPlace.value != "") {
        question_btn_next.setAttribute('href', `#9_2`);
        question_btn_next.classList.remove("disabled");

    } else {
        question_btn_next.setAttribute('href', "");
        question_btn_next.classList.add("disabled")

    }
}

const hadlerAnswer = (event, handler) => {
    switch (handler) {
        case "city":
            state.city = event.target.value;
            const idCity = event.target.id.split('_')[0];
            getStationByCity(idCity)
            break;
        case "hi":
            getCites().then(data => {
                state.cites = data;
            });
            break;
        case "question_9_1":
            handler9_1(event.target)
            break;
        default:
            break;
    }
}

const validorInput = (event, valid) => {
    switch (valid) {
        case "age": {
            if (event.target.value > 14 & event.target.value < 65) {
                return true
            } else {
                return false
            }
        }
        case "name": {
            if (event.target.value.length < 2) {
                return false
            } else {
                return true
            }
        }
        default:
            return true

    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

const chec_radio = (question, answer, index, question_li, question_btn_next) => {
    const form_check = document.createElement('div');
    form_check.classList.add("form-check");
    question_li.appendChild(form_check);

    const input_form_check = document.createElement('input');
    input_form_check.classList.add("form-check-input");
    if (question.type == "checkbox") {
        form_check.classList.add("form-switch");
    }
    Object.assign(input_form_check, {
        id: `${index+1}_${question.number}`,
        type: question.type,
        name: `radio_${question.number}`,
        value: answer.answer
    });
    form_check.appendChild(input_form_check);

    const label_form_check = document.createElement('label');
    label_form_check.classList.add("form-check-label");
    label_form_check.setAttribute("for", `${index+1}_${question.number}`);

    label_form_check.textContent = answer.answer
    form_check.appendChild(label_form_check);

    form_check.addEventListener("input", (event) => {
        if (event.target.value != "") {
            question_btn_next.setAttribute('href', `#${answer.next_question}`);
            question_btn_next.classList.remove("disabled");

        } else {
            question_btn_next.setAttribute('href', "");
            question_btn_next.classList.add("disabled")
        }
    })
}


const createBtns = (li, id, href) => {
    const question_btn_next = document.createElement('a');
    question_btn_next.classList.add("btn", "btn-success", "disabled");
    Object.assign(question_btn_next, {
        id: id,
        href: href,
        role: "button"
    });
    question_btn_next.textContent = "Далее";
    li.appendChild(question_btn_next);
    const question_btn_prev = document.createElement('a');
    question_btn_prev.classList.add("btn", "btn-info");
    Object.assign(question_btn_prev, {
        id: "",
        href: "javascript:history.back()",
    });
    question_btn_prev.textContent = "Вернуться";
    li.appendChild(question_btn_prev);
}



function ready() {
    const user_name = document.getElementById('user_name').textContent;
    const main_card = document.getElementById('main_card');
    const main_form = document.createElement('form');
    main_form.setAttribute("name", "form_questionnaire")
    const ul = document.createElement('ul');
    ul.classList.add("list-group", "ist-group-flush", "list");

    questions.forEach((question) => {
        const question_li = document.createElement('li');
        question_li.classList.add("list-group-item", "min-vh-100", "pt-5");
        Object.assign(question_li, {
            id: question.number
        });
        ul.appendChild(question_li);

        const question_content = document.createElement('p');
        question_content.classList.add("pt-5");
        question_content.textContent = question.content;
        question_li.appendChild(question_content);

        const question_btn_next = document.createElement('a');
        question_btn_next.classList.add("btn", "btn-success", "disabled");
        Object.assign(question_btn_next, {
            id: `btn_succes_${question.number}`,
            href: question.next_question,
            role: "button"
        });
        question_btn_next.textContent = "Далее";

        if (question.answers) {
            if (question.answers instanceof Promise) {
                question.answers.then(answers => {
                    if (question.handler == "city") {
                        answers.push({
                            id: 0,
                            answer: "Другой населенный пункт",
                            next_question: endQuestion
                        });
                        answers.push({
                            id: 0,
                            answer: "Отказ от ответа",
                            next_question: endQuestion
                        });

                    }
                    answers.forEach((answer, index) => {
                        chec_radio(question, answer, index, question_li, question_btn_next)
                    })
                });

            } else {
                question.answers.forEach((answer, index) => {
                    chec_radio(question, answer, index, question_li, question_btn_next)
                });

            }
        }
        if (question.type == "text" | question.type == "number" | question.type2 == "text") {

            const div = document.createElement('div');
            div.classList.add("mb-3");
            question_li.appendChild(div);

            const input_form_check = document.createElement('input');
            const type = (question.type2 == "text") ? question.type2 : question.type;
            input_form_check.classList.add("form-control", "form-control");
            Object.assign(input_form_check, {
                id: `answer_${question.number}`,
                type: type,
                name: `text_input_${question.number}`,
                placeholder: ""
            });
            div.appendChild(input_form_check);
            const hint = document.createElement('small');
            hint.classList.add("form-text", "text-muted");
            hint.textContent = question.hint;
            div.appendChild(hint);
            input_form_check.addEventListener("input", (event) => {
                if (event.target.value != "" & validorInput(event, question.validator)) {
                    question_btn_next.setAttribute('href', `#${question.next}`);
                    question_btn_next.classList.remove("disabled");

                } else {
                    question_btn_next.setAttribute('href', "");
                    question_btn_next.classList.add("disabled")

                }
            });
        }
        if (question.next != null) {
            question_li.appendChild(question_btn_next);
            question_li.addEventListener("input", event => {
                hadlerAnswer(event, question.handler);
            })

            const question_btn_prev = document.createElement('a');
            question_btn_prev.classList.add("btn", "btn-info");
            Object.assign(question_btn_prev, {
                id: "",
                href: "javascript:history.back()",
            });
            question_btn_prev.textContent = "Вернуться";
            question_li.appendChild(question_btn_prev);
        }
    })


    main_form.appendChild(ul);
    main_card.appendChild(main_form);


    const createQuestion9_12 = (numberQuestion) => {
        const time_data = {
            "period": "",
            "begin": "",
            "end": ""
        }
        switch (numberQuestion) {
            case "9":
                time_data.period = "УТРОМ";
                time_data.begin = "06:00";
                time_data.end = "12:00";
                break;
            case "10":
                time_data.period = "ДНЁМ";
                time_data.begin = "12:00";
                time_data.end = "18:00";
                break;
            case "11":
                time_data.period = "ВЕЧЕРОМ";
                time_data.begin = "18:00";
                time_data.end = "00:00";
                break;
            case "12":
                time_data.period = "НOЧЬЮ";
                time_data.begin = "00:00";
                time_data.end = "06:00";
                break;
            default:
                break;
        }
        document.getElementById(`btn_succes_${numberQuestion}_1`).addEventListener('click', (event) => {
            const listPlaces = document.getElementsByName(`radio_${numberQuestion}_1`);
            const addPlace = document.getElementById(`answer_${numberQuestion}_1`);
            const li_1 = document.getElementById(`${numberQuestion}_1`)
            const selectedPlase = Array.prototype.slice.call(listPlaces).filter(ch => ch.checked == true);
            const places = new Set()
            selectedPlase.forEach(el => {
                places.add(el.value);
            })
            if (addPlace.value != "") {
                places.add(addPlace.value)
            }
            const li_2 = document.getElementById(`${numberQuestion}_2`);
            const li_3 = document.getElementById(`${numberQuestion}_3`);
            const li_4 = document.getElementById(`${numberQuestion}_4`);
            if (isNaN(li_1.dataset.from5)) {
                while (li_2.firstChild) {
                    li_2.removeChild(li_2.firstChild);
                }
                while (li_3.firstChild) {
                    li_3.removeChild(li_3.firstChild);
                }
                while (li_4.firstChild) {
                    li_4.removeChild(li_4.firstChild);
                }
            }
            const p = document.createElement('p');
            p.classList.add("pt-5");
            p.textContent = `${numberQuestion}.2 С помощью каких устройств Вы слушали радио вчера ${time_data.period} (в промежутке времени с ${time_data.begin} до ${time_data.end})? `;
            li_2.appendChild(p);

            const p_3 = document.createElement('p');
            p_3.classList.add("pt-5");
            p_3.textContent = `${numberQuestion}.3. В какое именно время вы слушали радио вчера ${time_data.period} в `;
            li_3.appendChild(p_3);

            const p_4 = document.createElement('p');
            p_4.classList.add("pt-5");
            p_4.textContent = `${numberQuestion}.4.  Скажите, пожалуйста, какие именно радиостанции вы слушали вчера ${time_data.period} в `;
            li_4.appendChild(p_4);

            places.forEach((place, index) => {
                const idx = index + 1;
                const p = document.createElement('p');
                p.classList.add("fw-bold", "pt-5")
                p.textContent = `${numberQuestion}.2.${idx}. ${place}`;
                li_2.appendChild(p);

                questions[11].answers.forEach((answer, i) => {
                    const form_check = document.createElement('div');
                    form_check.classList.add("form-check", "form-switch");
                    li_2.appendChild(form_check);
                    const input_form_check = document.createElement('input');
                    input_form_check.classList.add("form-check-input");
                    Object.assign(input_form_check, {
                        id: `${idx}_${numberQuestion}_2_${i}`,
                        type: "checkbox",
                        name: `checkbox_${numberQuestion}_2`,
                        value: answer.answer
                    });
                    form_check.appendChild(input_form_check);
                    const label_form_check = document.createElement('label');
                    label_form_check.classList.add("form-check-label");
                    label_form_check.setAttribute("for", `${idx}_${numberQuestion}_2_${i}`);
                    label_form_check.textContent = answer.answer
                    form_check.appendChild(label_form_check);
                })
                const p_3 = document.createElement('p');
                p_3.classList.add("fw-bold")
                p_3.textContent = `${numberQuestion}.3.${idx}. ${place}`;
                li_3.appendChild(p_3);
                const div_3_ = document.createElement('div');
                div_3_.classList.add("mb-3", "row");
                li_3.appendChild(div_3_);

                const div_3 = document.createElement('div');
                div_3.classList.add("mb-3", "col-3");
                div_3_.appendChild(div_3);
                const input_3_1 = document.createElement('input');
                input_3_1.classList.add("form-inline");
                input_3_1.setAttribute('type', "time")
                input_3_1.setAttribute('id', `${numberQuestion}_3_begin`)
                input_3_1.setAttribute('name', `input_${numberQuestion}_3`)
                input_3_1.value = time_data.begin
                div_3.appendChild(input_3_1);
                const label_3_1 = document.createElement('label');
                label_3_1.classList.add("form-label");
                label_3_1.setAttribute('for', `${numberQuestion}_3_begin`)
                label_3_1.setAttribute('min', time_data.begin);
                label_3_1.setAttribute('max', time_data.end);
                label_3_1.textContent = "Начало"
                div_3.appendChild(label_3_1);
                const input_3_2 = document.createElement('input');
                input_3_2.classList.add("form-inline");
                input_3_2.setAttribute('type', "time")
                input_3_2.setAttribute('id', `${numberQuestion}_3_end`)
                input_3_2.setAttribute('name', `input_${numberQuestion}_3`)
                input_3_2.value = time_data.end
                div_3.appendChild(input_3_2);
                const label_3_2 = document.createElement('label');
                label_3_2.classList.add("form-label");
                label_3_2.setAttribute('for', `${numberQuestion}_3_end`)
                label_3_2.setAttribute('min', time_data.begin);
                label_3_2.setAttribute('max', time_data.end);
                label_3_2.textContent = "Окончание"
                div_3.appendChild(label_3_2);
                const p_4 = document.createElement('p');
                p_4.classList.add("fw-bold")
                p_4.textContent = `${numberQuestion}.4.${idx}. ${place}`;
                li_4.appendChild(p_4);
                state.stations.forEach((station, index) => {
                    const form_check = document.createElement('div');
                    form_check.classList.add("form-check");
                    li_4.appendChild(form_check);
                    const input_form_check = document.createElement('input');
                    input_form_check.classList.add("form-check-input");
                    form_check.classList.add("form-switch");
                    Object.assign(input_form_check, {
                        id: `${index+1}_${numberQuestion}_4`,
                        type: "checkbox",
                        name: `checkbox${numberQuestion}_4`,
                        value: station.radioStation.name_rus
                    });
                    form_check.appendChild(input_form_check);
                    const label_form_check = document.createElement('label');
                    label_form_check.classList.add("form-check-label");
                    label_form_check.setAttribute("for", `${index+1}_${numberQuestion}_4`);
                    label_form_check.textContent = `${station.radioStation.name_rus} ${station.frequency}`
                    form_check.appendChild(label_form_check);
                });

            });
            const list_li = [li_2, li_3, li_4]
            list_li.forEach((li, index) => {
                createBtns(li, `btn_succes_${numberQuestion}_${index+2}`, `${numberQuestion}_${index+3}`);
            });
            li_2.addEventListener("input", (event => {
                const question_btn_next = document.getElementById(`btn_succes_${numberQuestion}_2`)
                console.log(question_btn_next);
                const list_ = document.getElementsByName(`checkbox_${numberQuestion}_2`)
                const selected_ = Array.prototype.slice.call(list_).filter(ch => ch.checked == true);
                console.log(selected_);
                if (selected_ != 0) {
                    question_btn_next.setAttribute('href', `#${numberQuestion}_3`);
                    question_btn_next.classList.remove("disabled");

                } else {
                    question_btn_next.setAttribute('href', "");
                    question_btn_next.classList.add("disabled")

                }
            }))

            li_3.addEventListener("input", (event => {
                const question_btn_next = document.getElementById(`btn_succes_${numberQuestion}_3`);
                let checkTime = true;
                document.getElementsByName(`input_${numberQuestion}_3`).forEach(el => {
                    if (el.value == "") {
                        checkTime = false
                    }
                });
                if (checkTime) {
                    question_btn_next.setAttribute('href', `#${numberQuestion}_4`);
                    question_btn_next.classList.remove("disabled");

                } else {
                    question_btn_next.setAttribute('href', "");
                    question_btn_next.classList.add("disabled")
                }
            }));

            li_4.addEventListener("input", (event => {
                const question_btn_next = document.getElementById(`btn_succes_${numberQuestion}_4`);
                let checkTime = true;
                document.getElementsByName(`input_${numberQuestion}_4`).forEach(el => {
                    if (el.value == "") {
                        checkTime = false
                    }
                });
                if (checkTime) {
                    question_btn_next.setAttribute('href', `#${numberQuestion}_5`);
                    question_btn_next.classList.remove("disabled");

                } else {
                    question_btn_next.setAttribute('href', "");
                    question_btn_next.classList.add("disabled")
                }
            }));

            document.getElementById(`btn_succes_${numberQuestion}_5`).addEventListener("click", () => {
                console.log(`go to ${numberQuestion}_1`);
                const li_1 = document.getElementById(`10_1`);
                li_1.dataset.from_5 = true;
            });
        });
    }


    createQuestion9_12('9')
    createQuestion9_12('10')
    createQuestion9_12('11')
    createQuestion9_12('12')


    const btn_submit = document.getElementById("btn_succes_17");    
    btn_submit.textContent = "Закончить и сохранить";
    btn_submit.classList.remove("disabled");
    btn_submit.setAttribute("href", "#0")
    btn_submit.addEventListener('click', () => {
        const form = document.forms.form_questionnaire
        const formData = new FormData(form);
        console.log(formData);
        formData.forEach((value, key)=> {
            console.log(value, key);
        });       
    });

    const btn_not_save = document.getElementById("btn_succes_18");    
    btn_not_save.textContent = "Закончить";
    btn_not_save.classList.remove("disabled");
    btn_not_save.setAttribute("href", "#0")
    btn_not_save.addEventListener('click', () => {
        const form = document.forms.form_questionnaire
        const formData = new FormData(form);
        console.log("Номер в корзину");
        formData.forEach((value, key)=> {
            console.log(value, key);
        });       
    });

    document.getElementById("0").children[0].textContent=`Здравствуйте! Меня зовут ${user_name}, я представляю компанию «МедиаИзмеритель». Мы изучаем общественное мнение о белорусском радио. Можно ли задать Вам несколько вопросов на эту тему? Опрос займет около 3 минут.`;



    // Всплывающее меню
    const toastTrigger = document.getElementById('answer_1')
    const toastLive = document.getElementById('liveToast')
    const content_liveToast = document.getElementById('content_liveToast')

    if (toastTrigger) {
        toastTrigger.addEventListener('input', function () {
            var toast = new bootstrap.Toast(toastLive, {
                autohide: false
            })
            content_liveToast.textContent = toastTrigger.value;
            toast.show()
        })
    }

}
document.addEventListener("DOMContentLoaded", ready);