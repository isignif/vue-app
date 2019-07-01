const axios = require('axios')

const params = {
    "user[email]" : 'support@isignif.fr',
    "user[password]" : '20462046'
}

axios.post(`http://localhost:3000/api/v1/tokens`, params)
      .then(response => {
       console.log(response)
      })
      .catch(_error => console.log('fack'));