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
    console.log(stations);
    const q_li = document.getElementById(number_q);
    console.log(q_li);
    stations.forEach((station, index) => {
        const form_check = document.createElement('div');
        form_check.classList.add("form-check");
        q_li.appendChild(form_check);
        console.log(station)
        const input_form_check = document.createElement('input');
        input_form_check.classList.add("form-check-input");
        form_check.classList.add("form-switch");
        Object.assign(input_form_check, {
            id: `${index+1}_${number_q}`,
            type: "checkbox",
            name: `checkbox${7}`,
            value: station.radioStation.name_rus
        });
        console.log(input_form_check);

        form_check.appendChild(input_form_check);
        console.log(form_check);
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
        number: endQuestion,
        next: endQuestion,
        handler: null,
        content: "18. Конец",
        hint: "",
        answers: null,
        type: null,
        validator: null
    },

];

const handler9_1 = (target) => {

    const li_9_1 = document.getElementById("9_1")
    const listPlaces = document.getElementsByName("radio_9_1")
    const addPlace = document.getElementById("answer_9_1")
    console.log('addPlace',addPlace);
    const selectedPlase = Array.prototype.slice.call(listPlaces).filter(ch => ch.checked == true);
    console.log(selectedPlase);
    question_btn_next = document.getElementById("btn_succes_9_1")

    if (selectedPlase!=0 | addPlace.value!="") {
        console.log('Lf');
        question_btn_next.setAttribute('href', `#9_2`);
        question_btn_next.classList.remove("disabled");
        console.log(question_btn_next);

    } else {
        console.log("net");
        question_btn_next.setAttribute('href', "");
        question_btn_next.classList.add("disabled")

    }
    const places = []
    selectedPlase.forEach(el=> {
        places.push(el.value);
    })
    const result = places.join(', ') + ', '+ addPlace.value;
    



    const li_9_2 = document.getElementById("9_2")
    const content_9_2 = li_9_2.children[0];
    content_9_2.textContent = `9.2. С помощью каких устройств Вы слушали радио вчера утром ${result} (в промежутке времени с 6 до 12)? `
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
            console.log('9 1 ', event.target.value);
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
    console.log(index)
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

function ready() {
    const main_card = document.getElementById('main_card');
    console.log(main_card);
    const ul = document.createElement('ul');
    console.log(ul);
    ul.classList.add("list-group", "ist-group-flush", "list");

    questions.forEach((question) => {
        const question_li = document.createElement('li');
        question_li.classList.add("list-group-item", "vh-100", "pt-5");
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
    })
    console.log(ul);
    main_card.appendChild(ul)








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