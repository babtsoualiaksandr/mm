ready = () => {
    const quotaByDayOfNow = JSON.parse(document.getElementById('quotaByDayOfNow').textContent);
    const numberTelephone = JSON.parse(document.getElementById('numberTelephone').textContent);
    const user = JSON.parse(document.getElementById('user').textContent);
    const cites = JSON.parse(document.getElementById('cites').textContent);
    const radioStationByCity = JSON.parse(document.getElementById('radioStationByCity').textContent);
    const csrfmiddlewaretoken = document.getElementsByName('csrfmiddlewaretoken')[0].value
    console.log(user);
    console.log(cites);
    console.log(radioStationByCity);



    const questions = [{
            number: '0',
            name: '',
            next: '1',
            handler: null,
            content: `Здравствуйте! Меня зовут <mark> ${user.first_name} </mark>…, я представляю компанию «МедиаИзмеритель». Мы изучаем общественное мнение о белорусском радио. Можно ли задать Вам несколько вопросов на эту тему? Опрос займет около 3 минут.  `,
            hint: "Запишите со слов абонента",
            answers: [{
                    answer: ' Cогласен ',
                    next_question: '1'
                },
                {
                    answer: ' Не согласен ',
                    next_question: '19'
                }
            ],
            type: "radio",
            validator: null
        },
        {
            number: '1',
            name: '',
            next: '2',
            handler: 'hi',
            content: "1. Спасибо! Как я могу к Вам обращаться?",
            hint: null,
            answers: null,
            type: 'text',
            validator: null
        },
        {
            number: '2',
            name: '',
            next: '3',
            handler: "city",
            content: "2. В каком населенном пункте Вы постоянно проживаете?",
            hint: "",
            answers: '',
            type: 'select_city',

        },
        {
            number: '3',
            name: '',
            next: '4',
            handler: null,
            content: "3. Сколько вам полных лет?",
            hint: "",
            answers: null,
            type: "set_age",
            validator: 'age'
        },
        {
            number: '4',
            name: '',
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
            name: '',
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
            name: '',
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
            name: 'radioStationByCity',
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
            name: '',
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
            name: '',
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
            name: 'place',
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
            name: 'device_place_утро',
            next: '9_3',
            handler: null,
            content: "9.2. С помощью каких устройств Вы слушали радио вчера утром /ПОДСТАВИТЬ МЕСТО ИЗ ВОПРОСА 9.1/ (в промежутке времени с 6 до 12)? ",
            hint: "В другом месте (уточните и запишите, где именно)",
            answers: [{
                    answer: 'Радиоприемник',
                    next_question: '9_3'
                },
                {
                    answer: 'Автомагнитола',
                    next_question: '9_3'
                },
                {
                    answer: 'Мобильный телефон, смартфон (через FM тюнер)',
                    next_question: '9_3'
                },
                {
                    answer: 'Мобильный телефон, смартфон (через интернет) ',
                    next_question: '9_3'
                },
                {
                    answer: 'Компьютер, ноутбук, планшет (через интернет)',
                    next_question: '9_3'
                },
            ],
            type: "device_place",
            validator: null
        },
        {
            number: '9_3',
            name: '',
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
            name: '',
            next: '11',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
            next: '11_1',
            handler: null,
            content: "11. Скажите, пожалуйста, вы слушали радио вчера ВЕЧЕРОМ в промежутке времени с 18 до 24?",
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
            number: '11_1',
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
            next: '13',
            handler: null,
            content: "12. Скажите, пожалуйста, вы слушали радио вчера НОЧЬЮ в промежутке времени с 24 до 06?",
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
            number: '12_1',
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
            name: '',
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
                    next_question: '19'
                },
                {
                    answer: '4. Нет ',
                    next_question: '19'
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
            name: '',
            next: 19,
            handler: null,
            content: "17. Спасибо! Через некоторое время с Вами свяжутся сотрудники нашей компании и предложат снова ответить на вопросы. Спасибо за участие в опросе! Всего хорошего!",
            hint: "",
            answers: null,
            type: null,
            validator: null
        },
        {
            number: 19,
            next: 19,
            handler: null,
            content: "19. Спасибо! Очень жаль",
            hint: "",
            answers: null,
            type: null,
            validator: null
        }

    ];
    const main_card = document.getElementById('main_card');
    const main_form = document.createElement('form');
    main_form.classList.add('was-validated')
    const ul = document.createElement('ul');
    ul.classList.add("list-group", "ist-group-flush", "list");
    const begin_li = document.createElement('li');
    begin_li.classList.add("list-group-item", "min-vh-100", "pt-5");
    const div_inputPhoneNumber = document.createElement('div');
    div_inputPhoneNumber.classList.add('input-group', 'mb-3');
    const inputPhoneNumber = document.createElement('input');
    inputPhoneNumber.classList.add('form-control');
    inputPhoneNumber.setAttribute('type', "tel");
    inputPhoneNumber.setAttribute('id', "inputPhoneNumberPhoneNumber");
    inputPhoneNumber.setAttribute('pattern', "[0-9]{12}");
    inputPhoneNumber.setAttribute('required', 'True');
    inputPhoneNumber.setAttribute('value', numberTelephone.phone_number.substring(1));
    let span = document.createElement('span')
    span.classList.add('input-group-text');
    span.setAttribute('id', 'span_inpunPhoneNumber');
    span.textContent = numberTelephone.age.group + ' ' + numberTelephone.town.name
    inputPhoneNumber.setAttribute('aria-describedby', 'span_inpunPhoneNumber')
    const div_valid = document.createElement('div');
    div_valid.classList.add('valid-feedback')
    const btn_phone = document.createElement('a')
    btn_phone.classList.add('btn', 'btn-primary')
    btn_phone.setAttribute('type', 'button');
    btn_phone.setAttribute('href', '#0');
    const icon_phone = document.createElement('i');
    icon_phone.classList.add('bi', 'bi-telephone-outbound');
    btn_phone.appendChild(icon_phone)
    div_valid.appendChild(btn_phone)
    div_inputPhoneNumber.appendChild(inputPhoneNumber);
    div_inputPhoneNumber.appendChild(span);
    div_inputPhoneNumber.append(div_valid)
    begin_li.appendChild(div_inputPhoneNumber)
    ul.appendChild(begin_li)
    main_form.appendChild(ul)
    main_card.appendChild(main_form);
    let do_run = false;
    inputPhoneNumber.addEventListener('input', (event) => {
        phone_number = parseInt(event.target.value)
        const span = document.getElementById('span_inpunPhoneNumber');
        if (!do_run) {
            do_run = true
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-primary')
            btn.setAttribute('type', 'button');
            const magic = document.createElement('i');
            magic.classList.add('bi', 'bi-arrow-repeat');
            btn.appendChild(magic)
            span.textContent = '';
            span.appendChild(btn);
            btn.addEventListener('click', () => {
                const options = {
                    method: 'get',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-CSRFToken': csrfmiddlewaretoken
                    }
                }
                url = '/ramup/get_phone_number/'
                fetch(url, options).then(response => response.json()).then(data => {
                    do_run = false
                    inputPhoneNumber.setAttribute('value', data.phone_number);
                    inputPhoneNumber.value = data.phone_number.substring(1);
                    btn.remove();
                    span.textContent = data.age.group + ' ' + data.town.name;
                }).catch(err => {
                    console.error('Request failed', err)
                });
            });
        }
    });
    const question_btn_next = (question) => {
        const btn = document.createElement('a');
        btn.classList.add("btn", "btn-success", "disabled");
        btn.innerHTML = '<i class="bi bi-arrow-down-square bi-lg"></i>'
        Object.assign(btn, {
            id: `btn_next_${question.number}`,
            href: question.next_question,
            role: "button"
        });
        return btn
    }
    const question_btn_prev = (question) => {
        const btn = document.createElement('a');
        btn.classList.add("btn", "btn-info");
        btn.innerHTML = '<i class="bi bi-arrow-up-square bi-lg"></i>'
        Object.assign(btn, {
            id: `btn_next_${question.number}`,
            href: "javascript:history.back()",
            role: "button"
        });
        return btn
    }
    const create_radio = (question, index_answer, answer, name) => {
        if (!name) {
            name = `input_radio_${question.number}`
        }
        const div = document.createElement('div');
        div.classList.add('form-check');
        const input = document.createElement('input');
        input.setAttribute('name', name);
        input.classList.add('form-check-input');
        Object.assign(input, {
            id: `input_radio_${question.number}_${index_answer}`,
            type: 'radio'
        });
        input.dataset.next_question = `${answer.next_question}`;
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', `input_radio_${question.number}_${index_answer}`);
        label.textContent = answer.answer;

        div.appendChild(input);
        div.appendChild(label);
        return div
    }
    const create_radio_place = (question, index_answer, answer, name, checked) => {
        if (!name) {
            name = `input_radio_${question.number}`
        }
        const div = document.createElement('div');
        div.classList.add('form-check');
        const input = document.createElement('input');
        input.setAttribute('name', name);
        input.classList.add('form-check-input');
        Object.assign(input, {
            id: `${name}_${index_answer}`,
            type: 'radio'
        });
        if (checked) {
            input.checked = "checked";
        }
        input.dataset.next_question = `${answer.next_question}`;
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', `${name}_${index_answer}`);
        label.textContent = answer.answer;

        div.appendChild(input);
        div.appendChild(label);
        return div
    }
    const create_text_input = (question) => {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        const input = document.createElement('input');
        input.setAttribute('name', `input_text_${question.number}`);
        input.classList.add('form-control');
        input.setAttribute('required', 'True');
        Object.assign(input, {
            id: `input_txt_${question.number}`,
            type: 'text'
        });
        input.dataset.next_question = `${question.next}`;
        const label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', `input_text_${question.number}`);
        div.appendChild(input);
        div.appendChild(label);
        return div
    }
    const create_select_city = (question, collection, name) => {

        const div = document.createElement('div');
        const select = document.createElement('select');
        select.classList.add('form-select');
        select.innerHTML = '<option value="" selected>Выбери город</option>'
        collection.forEach((item) => {
            const option = document.createElement('option');
            option.value = item[name];
            option.textContent = item[name];
            select.appendChild(option)
            select.dataset.next_question = `${question.next}`;
        });
        const input_txt = create_text_input(question);
        div.appendChild(select);
        div.appendChild(input_txt);

        return div
    }

    const create_checkbox_element = (value, name, id) => {
        const form_check = document.createElement('div');
        form_check.classList.add('form-check');
        const input = document.createElement('input');
        input.classList.add('form-check-input');
        input.setAttribute('type', "checkbox");
        input.setAttribute('name', name);
        input.setAttribute('id', id);
        input.value = value;
        const label = document.createElement('label');
        label.classList.add('form-check-label');
        label.setAttribute('for', id);
        label.textContent = value;
        form_check.appendChild(input);
        form_check.appendChild(label);
        return form_check

    }

    const create_select_place = (question, collection, name) => {

        const div = document.createElement('div');
        question.answers.forEach((answer, index) => {
            const checkbox_el = create_checkbox_element(answer.answer, `place_${question.number}`, `place_${question.number}_${index}`);
            div.appendChild(checkbox_el)
        })
        const input_txt = create_text_input(question);
        div.appendChild(input_txt);

        return div
    }

    const create_number_input = (question, min, max) => {
        const div = document.createElement('div');
        div.classList.add('mb-3');
        const input = document.createElement('input');
        input.setAttribute('name', `input_number_${question.number}`);
        input.classList.add('form-control');
        input.setAttribute('required', 'True');
        input.setAttribute('min', min);
        input.setAttribute('max', max);
        Object.assign(input, {
            id: `input_number_${question.number}`,
            type: 'number'
        });
        input.dataset.next_question = `${question.next}`;
        const label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', `input_number_${question.number}`);
        div.appendChild(input);
        div.appendChild(label);
        return div
    }


    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.classList.add("list-group-item", "min-vh-10", "pt-5");
        li.setAttribute('id', `${question.number}`);
        const p = document.createElement('p');
        p.innerHTML = question.content;
        p.classList.add("pt-5");
        li.appendChild(p);
        const btn_next = question_btn_next(question);
        li.appendChild(btn_next);
        const btn_prev = question_btn_prev(question);
        if (question.type == "radio") {
            question.answers.forEach((answer, index) => {
                const radio = create_radio(question, index, answer);
                li.appendChild(radio);
            });
            li.addEventListener('input', (event) => {
                btn_next.setAttribute('href', `#${event.target.dataset.next_question}`);
                btn_next.classList.remove('disabled');
            });


        }
        if (question.type == "text") {
            const input_txt = create_text_input(question);
            li.appendChild(input_txt);
            li.addEventListener('input', (event) => {
                btn_next.setAttribute('href', `#${event.target.dataset.next_question}`);
                btn_next.classList.remove('disabled');
            });
        }
        if (question.type == "select_city") {
            const select_city = create_select_city(question, cites, 'name');
            li.appendChild(select_city);
            li.addEventListener('input', (event) => {
                if (event.target.tagName == 'SELECT') {
                    const input_city = document.getElementById(`input_txt_${question.number}`);
                    if (event.target.value != "") {
                        input_city.setAttribute('disabled', 'disabled');
                        btn_next.setAttribute('href', `#${event.target.dataset.next_question}`);
                        input_city.value = ''
                    } else {
                        input_city.removeAttribute('disabled');
                        btn_next.setAttribute('href', `#19`);
                    }
                }
                const content_liveToast_City = document.getElementById('content_liveToast_City');
                content_liveToast_City.textContent = event.target.value
                questions.forEach(item => {
                    if (item.name == 'radioStationByCity') {
                        item.answers = radioStationByCity.filter(el => el.name_city.name == event.target.value);
                    }
                });
                const div_radioStationByCity = document.getElementById('div_group_check');
                while (div_radioStationByCity.firstChild) {
                    div_radioStationByCity.removeChild(div_radioStationByCity.firstChild);
                }

                questions[7].answers.forEach((radiostation, index) => {
                    const check_box = create_checkbox_element(radiostation.radioStation.name_rus, question.name, `${radiostation.name}_${index}`)
                    div_radioStationByCity.appendChild(check_box);
                });
                btn_next.classList.remove('disabled');
            });
        }

        if (question.type == 'set_age') {
            const set_age = create_number_input(question, 15, 65);
            li.appendChild(set_age);
            li.addEventListener('input', (event) => {
                btn_next.setAttribute('href', `#${event.target.dataset.next_question}`);
                btn_next.classList.remove('disabled');
                const content_liveToast_Age = document.getElementById('content_liveToast_Age');
                content_liveToast_Age.textContent = 'Возраст ' + event.target.value
            });
        }
        if (question.name == 'radioStationByCity') {
            const div_7 = document.createElement('div');
            div_7.setAttribute('id', 'div_group_check');
            li.appendChild(div_7);

            li.addEventListener('input', (event) => {
                btn_next.setAttribute('href', `#${question.next}`);
                btn_next.classList.remove('disabled');
                const content_liveToast_Age = document.getElementById('content_liveToast_Age');
                content_liveToast_Age.textContent = 'Возраст ' + event.target.value
            });
        }
        if (question.name == 'place') {
            const div_9_1 = create_select_place(question);
            li.appendChild(div_9_1);

            li.addEventListener('input', (event) => {
                const listPlaces = document.getElementsByName('place_9_1');
                const selectedPlace = Array.prototype.slice.call(listPlaces).filter(ch => ch.checked == true);
                const txtInput = document.getElementById('input_txt_9_1');
                if (txtInput.value != '') {
                    const all = selectedPlace.push(txtInput)
                }
                const div_place = document.getElementById(`div_place_${question.next}`);
                while (div_place.firstChild) {
                    div_place.removeChild(div_place.firstChild);
                };
                console.log(selectedPlace);
                selectedPlace.map((place, index_place) => {
                    const div_place_item = document.createElement('div');
                    const p = document.createElement('p');
                    p.textContent = `${index_place+1}.${place.value}`;
                    div_place_item.appendChild(p);
                    div_place.appendChild(div_place_item);
                    const question_next = questions[parseInt(question.number) + 2];
                    console.log(question_next)
                    question_next.answers.forEach((answer, index_answer) => {
                        const name = `input_radio_${question_next.number}_${index_place}`
                        const radio = create_radio_place(question_next, index_answer, answer, name, false);
                        div_place_item.appendChild(radio);
                    });
                })
                btn_next.setAttribute('href', `#${question.next}`);
                btn_next.classList.remove('disabled');
                const content_liveToast_Age = document.getElementById('content_liveToast_Age');
                content_liveToast_Age.textContent = 'Возраст ' + event.target.value
            });

        }
        if (question.type == 'device_place') {

            const div_place = document.createElement('div');
            div_place.setAttribute('id', `div_place_${question.number}`);
            li.appendChild(div_place);
            li.addEventListener('input', (event) => {
                console.log(event.target);
                console.log(event.target.parentElement.parentElement);
                console.log(event.target.name);
                btn_next.setAttribute('href', `#${event.target.dataset.next_question}`);
                btn_next.classList.remove('disabled');
                const checkedBoxes = document.querySelectorAll(`input[name=${event.target.name}]:checked`);
                console.log(checkedBoxes);
                console.log(checkedBoxes[0]);
            });

        }

        li.appendChild(btn_next);
        li.appendChild(btn_prev);
        ul.appendChild(li);
    });

    // Всплывающее меню
    const toastTrigger = document.getElementById('input_txt_1')
    const toastLive = document.getElementById('liveToast')
    const content_liveToast = document.getElementById('content_liveToast')

    if (toastTrigger) {
        toastTrigger.addEventListener('change', function () {
            var toast = new bootstrap.Toast(toastLive, {
                autohide: false
            })
            content_liveToast.textContent = toastTrigger.value;
            toast.show()
        })
    }
}

document.addEventListener("DOMContentLoaded", ready);