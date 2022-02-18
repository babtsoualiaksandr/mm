function clickDownload(event) {
    console.log(event.target);
    console.log(event.target.classList);
    event.target.classList.add('btn');
    event.target.classList.add('btn-danger');
    console.log(event.target.classList);
    
} 
function ready() {
    console.log('Hi from example');
    const records = document.getElementsByClassName('record')
    console.log(records);
    
Array.from(records).forEach(element => {
        console.log(element);
        const download = element.getElementsByTagName('img')[1]
        console.log(download);
        //addEventListener("click", clickDownload, false);
        // download.click()

    });
    const i = document.getElementsByClassName('item_a');
    console.log(i);
    document.querySelectorAll('.btn-next').forEach(item => {
        item.addEventListener('click', event => {
            const div_worker = document.getElementById('div_worker');
            console.log(div_worker);
            console.log(event.target);
            console.log(event.target.getAttribute('next'))
            const hiddenElement = document.getElementById(event.target.getAttribute('next'));
            console.log(hiddenElement);
            hiddenElement.scrollIntoView({block: "start", behavior: "auto", inline: 'start'});
        })
      })
}

document.addEventListener("DOMContentLoaded", ready);