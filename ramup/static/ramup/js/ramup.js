/* function ready() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  document.querySelectorAll('.delete_upload_file').forEach(item => {
    item.addEventListener('dblclick', event => {
      const pk = event.target.getAttribute('pk');
      console.log(pk)
      const options = {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-CSRFToken': csrftoken
        },
        body: ''
      }
      url = pk+'/delete/'
      fetch(url, options).catch(err => {
        console.error('Request failed', err)
      })

    })
  })


}

document.addEventListener("DOMContentLoaded", ready); */