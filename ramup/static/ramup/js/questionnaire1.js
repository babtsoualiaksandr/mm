function ready() {
    console.log('hi from questionnare');
    document.querySelectorAll('.btn-next').forEach(item => {
        item.addEventListener('click', event => {
            console.log(event.target);
            console.log(event.target.getAttribute('jump'))
            const hiddenElement = document.getElementById(event.target.getAttribute('jump'));


            console.log(hiddenElement);
            hiddenElement.scrollIntoView({block: "start", behavior: "auto", inline: 'start'});
        })
      })
}
document.addEventListener("DOMContentLoaded", ready);