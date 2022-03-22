function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
ready = () => {
    const cites = JSON.parse(document.getElementById('cites').textContent);
    const genders = JSON.parse(document.getElementById('genders').textContent);
    const ages = JSON.parse(document.getElementById('ages').textContent);
    const operators = JSON.parse(document.getElementById('operators').textContent);
    const sheduler = JSON.parse(document.getElementById('sheduler').textContent);
    console.log(sheduler);
    for (date_sheduler in sheduler) {
        console.log(date_sheduler, sheduler[date_sheduler]);
        const cites = sheduler[date_sheduler];
        for (city in cites) {
            console.log(city, cites[city]);
            const ages= cites[city];
            for (age in ages) {
                console.log(age, ages[age]);
            }

        }
    }
    const main = document.getElementById('main');
    const list_gender = JSON.parse(genders);
    const list_ages = JSON.parse(ages);
    const formTable = document.createElement('form')
    const container = document.createElement('div')
    container.classList.add('container');
    formTable.appendChild(container)
    const row = document.createElement('div')
    row.classList.add('row','row-cols-sm-1', 'row-cols-md-1', 'row-cols-lg-2','row-cols-xl-3' );
    container.appendChild(row)

    const list_cites = JSON.parse(cites);
    list_cites.forEach(cite => {
        const col = document.createElement('div')
        col.classList.add('col');
        row.appendChild(col)

        const table = document.createElement('table')
        table.setAttribute("id", `table_${cite.name}`)
        table.classList.add('table')
        col.appendChild(table)
        const thead = document.createElement('thead')
        table.appendChild(thead)
        const tr = document.createElement('tr')
        thead.appendChild(tr)

        const th = document.createElement('th')
        th.setAttribute('scope', 'col')
        th.classList.add("w-25")
        th.textContent = cite.name
        tr.appendChild(th);

        list_gender.forEach(gender => {
            const th = document.createElement('th')
            th.setAttribute('scope', 'col')
            th.classList.add('text-center');
            th.textContent = gender
            tr.appendChild(th);
        })
        const tbody = document.createElement('tbody')
        table.appendChild(tbody);
        const total = {}
        list_ages.forEach(age => {
            const tr = document.createElement('tr')
            tbody.appendChild(tr)
            const th = document.createElement('th')
            th.setAttribute('scope', 'row')
            th.textContent = age.group
            tr.appendChild(th);
            list_gender.forEach(gender => {
                const td = document.createElement('td')
                tr.appendChild(td);
                const input = document.createElement("input");
                input.classList.add(`${cite.name}_${gender}_count`,'form-control', 'text-center');
                input.setAttribute('type', 'number');
                input.setAttribute('min', 0)
                const count = (age.group == '64+' || age.group == '0-14') ? 0 : getRandomInt(100, 150);
                if (`${gender}` in total) {
                    total[`${gender}`] = total[`${gender}`] + count;
                } else {
                    total[`${gender}`] = count
                }
                input.setAttribute('value', count);
                input.setAttribute('name', `${cite.name}_${age.group}_${gender}`);
                const progress = document.createElement('progress');
                progress.setAttribute('id',`progress_${cite.name}_${age.group}_${gender}`);
                progress.setAttribute('max','100');
                const val = Math.round(8/count*100)
                progress.setAttribute('value',val);
                progress.textContent='30%';
                td.appendChild(input);
                td.appendChild(progress);
            });
        });
        tr_total = document.createElement('tr')
        tbody.appendChild(tr_total)
        th_total = document.createElement('th')
        th_total.setAttribute('scope', 'row')
        th_total.textContent = 'Итого ';
        tr_total.appendChild(th_total);
        const keys = Object.keys(total)
        keys.forEach(key => {
            const td = document.createElement('td')
            td.classList.add('text-center')
            td.setAttribute("id", `total_${cite.name}_${key}`)
            tr_total.appendChild(td);
            td.textContent = `${total[key]}`
        })

    });


    const div_date = document.createElement('div');
    row.appendChild(div_date)
    const input_date = document.createElement("input");
    input_date.classList.add('form-control');
    input_date.setAttribute('type','date');
    input_date.setAttribute('name','date_sheduler');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date_now = Date(Date.now())
    div_date.appendChild(input_date);

    
    const div_operators = document.createElement('div');
    row.appendChild(div_operators)
    const list_operators = JSON.parse(operators);
    list_operators.forEach(operator => {
        const div = document.createElement("div");
        div.classList.add('form-check', 'mb-3');
        div_operators.appendChild(div);
        const input = document.createElement("input");
        input.classList.add('form-check-input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', operator.username);
        input.setAttribute('id', `${operator.username}`);
        input.setAttribute('name', `operators`);
        div.appendChild(input);
        const label = document.createElement("label");
        label.textContent = `${operator.username} ${operator.first_name}`
        label.classList.add('form-check-label');
        label.setAttribute('for', `${operator.username}`);
        div.appendChild(label);
    });



    const csrfmiddlewaretoken = document.createElement("input");
    csrfmiddlewaretoken.setAttribute("name", "csrfmiddlewaretoken");
    csrfmiddlewaretoken.setAttribute("accept-charset", "UTF-8");
    csrfmiddlewaretoken.value = document.querySelector('[name=csrfmiddlewaretoken]').value;
    csrfmiddlewaretoken.setAttribute("type", "hidden");



    const button = document.createElement('button');
    const baseUrl = window.location.protocol + "//" + window.location.host;
    button.textContent = 'Формировать';
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('type', 'submit')
    formTable.setAttribute('method', 'post');
    formTable.setAttribute("action", `${baseUrl}/ramup/scheduler/`);
    formTable.appendChild(csrfmiddlewaretoken)
    formTable.appendChild(button)
    main.appendChild(formTable)

    document.querySelectorAll('.table').forEach(el => {
        el.addEventListener("change", (event) => {
            const countCol = event.target.classList[0];
            const id_progress = `progress_${event.target.name}`;
            console.log(id_progress);
            const id_total = countCol.split("_", 2).join('_');
            const list_count = document.getElementsByClassName(countCol)
            const arrayOfElements = Array.from(list_count);
            const sumCount = arrayOfElements.reduce(
                (sum, current) => sum + parseInt(current.value),0
              );
            const total = document.getElementById(`total_${id_total}`)
            total.textContent = sumCount    
            
            const progress = document.getElementById(id_progress);
            const val = Math.round(8/event.target.value*100)
            progress.setAttribute('value',val);

        })
    });
}






document.addEventListener("DOMContentLoaded", ready);