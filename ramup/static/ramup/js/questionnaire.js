function ready() {
    // Всплывающее меню
    const toastTrigger = document.getElementById('input_q_1')
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

    // -------------------
    const input_question3Age = document.getElementById("question_3_age")
    input_question3Age.addEventListener("input", (event) => {
        console.log(event.target);
        btnQuestion3Age = document.getElementById("btn_question_3_age");
        content_liveToast_Age = document.getElementById("content_liveToast_Age");
        console.log(btnQuestion3Age);
        const age = input_question3Age.value
        console.log(age);
        if (age > 64 || age < 15) {
            console.log(age);
            btnQuestion3Age.setAttribute('href', '#end');
            btnQuestion3Age.textContent = 'Завершить';
            btnQuestion3Age.classList.remove('btn-success');
            btnQuestion3Age.classList.add('btn-warning');
        } else {
            content_liveToast_Age.textContent = 'Возраст:' + age
            btnQuestion3Age.setAttribute('href', '#question_4');
            btnQuestion3Age.textContent = 'Далее';
            btnQuestion3Age.classList.remove('btn-warning');
            btnQuestion3Age.classList.add('btn-success');
        }
    })
    // -------------------
    const input_question2 = document.getElementById("question_2")
    input_question2.addEventListener("input", (event) => {
        const btnQuestion2 = document.getElementById("btn_question_2");
        btnQuestion2.setAttribute('href', '#question_3');
        const result = event.target.value;
        if (Number.isInteger(parseInt(result))) {
            btnQuestion2.classList.remove('disabled')
        } else {
            btnQuestion2.classList.add('disabled')
        }
        
    })
    // -------------------
    const input_question5 = document.getElementById("question_5")
    input_question5.addEventListener("input", (event) => {
        const btnQuestion5 = document.getElementById("btn_question_5");
        btnQuestion5.classList.remove('disabled')
        const result = event.target.value;
        if (result == 'Yes') {
            btnQuestion5.setAttribute('href', '#question_7');
        } else {
            btnQuestion5.setAttribute('href', '#question_6');
        }
    })
    // -------------------
    const input_question6 = document.getElementById("question_6")
    input_question6.addEventListener("input", (event) => {
        const btnQuestion6 = document.getElementById("btn_question_6");
        btnQuestion6.classList.remove('disabled')
        const result = event.target.value;
        if (result == 'Yes') {
            btnQuestion6.setAttribute('href', '#question_13');
        } else {
            btnQuestion6.setAttribute('href', '#question_13');
        }
    })

    // -------------------
    const input_question8 = document.getElementById("question_8")
    input_question8.addEventListener("input", (event) => {
        const btnQuestion8 = document.getElementById("btn_question_8");
        btnQuestion8.classList.remove('disabled')
        const result = event.target.value;
        if (result == 'Yes') {
            btnQuestion8.setAttribute('href', '#question_9');
        } else {
            btnQuestion8.setAttribute('href', '#question_13');
        }
    })
    // -------------------
    const input_question9 = document.getElementById("question_9")
    input_question9.addEventListener("input", (event) => {
        const btnQuestion9 = document.getElementById("btn_question_9");
        btnQuestion9.classList.remove('disabled')
        const result = event.target.value;
        if (result == 'Yes') {
            btnQuestion9.setAttribute('href', '#question_9_1');
        } else {
            btnQuestion9.setAttribute('href', '#question_10');
        }
    })
    // -------------------
    const choiceTown_q_2 = document.getElementById("choiceTown_q_2")
    choiceTown_q_2.addEventListener("input", async (event) => {
        const el = document.getElementById("btn_question_5");
        const content_liveToast_City = document.getElementById("content_liveToast_City");
        console.log(content_liveToast_City);
        const city_id = event.target.value;
        const getUrl = window.location;
        const baseUrl = getUrl.protocol + "//" + getUrl.host;
        const url = new URL(baseUrl + '/ramup/station_by_town/' + city_id + '/')
        const response = await fetch(url, {
            method: 'GET',
        });
        const result = await response.json();
        console.log(result);
        const q_7 = document.getElementById("q_7");
        console.log(q_7);
        while (q_7.firstChild) {
            q_7.removeChild(q_7.firstChild);
        }
        result.forEach(element => {
            console.log(element);
            console.log(element["name_city"]["name"])
            content_liveToast_City.textContent = element["name_city"]["name"];
            const p = document.createElement("p");
            p.textContent = "Город прослушивания: " + element["name_city"]["name"]
            q_7.appendChild(p);
            const div = document.createElement("div");
            div.classList.add("form-check")
            div.classList.add("form-check-inline")
            const input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", "inlineCheckbox1");
            input.setAttribute("name", "check_q_7");
            input.setAttribute("value", element["radioStation"]["id"]);
            input.classList.add("form-check-input")
            div.appendChild(input)
            const label = document.createElement("label");
            label.setAttribute("for", "inlineCheckbox1");
            label.textContent = element["radioStation"]["name_rus"] + ' ' + element["frequency"];
            label.classList.add("form-check-label");
            div.appendChild(label);
            q_7.appendChild(div);
        });
        // Выбор радиостанций
        q_7.addEventListener("input", event => {
            const list_id_stations = new Set()
            const checked_stantions = document.getElementsByName("check_q_7")
            console.log(checked_stantions);
            checked_stantions.forEach((el) => {
                if (el.checked) {
                    console.log(el.checked, el.value);
                    list_id_stations.add(el.value);
                }
            });
            console.log(list_id_stations);
            if (list_id_stations.size > 0) {
                const btnQuestion7 = document.getElementById("btn_question_7");
                btnQuestion7.classList.remove('disabled')

            }
        });


    })
    const question_9_1 = document.getElementById("question_9_1")
    const input_q_9_1 = document.getElementById("input_q_9_1")
    const checked_plases = document.getElementsByName("radios_q_9_1")

    question_9_1.addEventListener("click", event => {
        const list_id_plase = new Set()
        checked_plases.forEach((el) => {
            if (el.checked) {
                list_id_plase.add(el.value);
            }
        });
        const btnQuestion_9_1 = document.getElementById("btn_question_9_1");
        if (list_id_plase.size > 0) {            
            btnQuestion_9_1.classList.remove('disabled');
            input_q_9_1.setAttribute('placeholder','');
        } else {
            btnQuestion_9_1.classList.add('disabled');
            input_q_9_1.setAttribute('placeholder','Введите');
            input_q_9_1.addEventListener('input', event => {
                console.log(event.target);
                if (input_q_9_1.value){
                    btnQuestion_9_1.classList.remove('disabled');
                } else {
                    btnQuestion_9_1.classList.add('disabled');
                }
            })
        }
      

    });


    const question_9_2 = document.getElementById("question_9_2");
    console.log(question_9_2);
    question_9_2.addEventListener("", (event) => {
        console.log(focus);
                   
    });

}
document.addEventListener("DOMContentLoaded", ready);