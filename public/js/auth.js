const url = (window.location.hostname.includes('localhost'))
? 'http://localhost:8081/api/auth/'
: 'https://ig-node-restserver.herokuapp.com/api/auth/';


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    /* const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email); */

    //console.log('ID TOKEN',response.credential)

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestParams = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ id_token: response.credential })
    }

   

    const request = new Request(url + 'google', requestParams);

    fetch(request)
        .then(resp => resp.json())
        .then(resp => {
           
            localStorage.setItem('email', resp.user.email);

            const { token  } = resp;
            
            localStorage.setItem('token', token);

            console.log(token);

            window.location = 'chat.html';
        })
        .catch(console.warn);
}

const button = document.getElementById('signout');
button.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}

const loginForm  = document.querySelector('form');

loginForm.addEventListener('submit', evt =>{

    evt.preventDefault();

    const formData = {};

    for (let element of loginForm.elements) {
        
        if(element.name.length > 0){
            formData[element.name] = element.value;
        }
    }
    console.log(formData);
    if(formData.email.length == 0 || formData.password.length == 0 ){

        console.error('Empty data');
        return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestParams = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(formData)
    }

   

    const request = new Request(url + 'login', requestParams);

    fetch(request)
        .then(resp => resp.json())
        .then(resp => {          
            

            const { token, msg  } = resp;

            if(msg){
                console.error(msg);
                return;
            }
            
            localStorage.setItem('token', token);

            window.location = 'chat.html';

            console.log(token);
        })
        .catch(console.warn);

   
})
