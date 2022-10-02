let user = null;
let client = null;

const txtUid    = document.querySelector('#txtUid');
const txtMsg    = document.querySelector('#txtMsg');
const ulUsers   = document.querySelector('#ulUsers');
const ulMsg     = document.querySelector('#ulMsg');
const btnOut    = document.querySelector('#btnOut');


const authVerify = async () => {


    if( !localStorage.getItem('token')){
       
        window.location = 'index.html';
        console.log('Not token');
        return;
    }

    const url = (window.location.hostname.includes('localhost'))
        ? 'http://localhost:8081/api/auth/'
        : 'https://ig-node-restserver.herokuapp.com/api/auth/';


    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", localStorage.getItem('token'));

    const requestParams = {
        method: 'GET',
        headers: myHeaders,        
    }   

    const request = new Request(url, requestParams);

    try {

        const resp = await fetch(request);      

        if( !resp.ok){
            window.location = 'index.html';
            console.error(resp.statusText);
            return;
        }

        const { token, user:authUser   } = await resp.json();
        

        localStorage.setItem('token', token);

        user = authUser;

        document.title = user.name;

        await connectClient();

        console.log(user);
        console.log(token);
       
        
    } catch (error) {
        
        console.log(error);
    }

    
}

const connectClient = async() =>{

    client = io({
        'extraHeaders':{
            'auth-token':localStorage.getItem('token'),
        }
    });

    client.on('connect',() =>{
        console.log('Client online');
    });
    client.on('disconnect',() =>{
        console.log('Client offline');
    });

    client.on('on-active-users',(payload ) => {

        console.log('on-active-users',payload);

        listUsers(payload);

    });

    client.on('on-server-message',(payload ) => {
        console.log('on-server-message',payload);
        listMessages(payload);
    });
    
    client.on('on-user-message',(payload ) => {
        console.log('on-user-message',payload);
        listUserMessage(payload);
    });

    /* const payload = {
        user,
        token
    }

    client.emit('on-client-connected',payload); */
}


const main = async () => {
    await authVerify();
}

const listUsers = ( users = [] ) => {
    let usersHtml = '';
    users.forEach( ({name, uid}) => {
        usersHtml += `
        
            <li>
                <p> <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
                </p>

            </li>
        
        `;
    });

    ulUsers.innerHTML = usersHtml;
}
const listMessages = ( messages = [] ) => {
    let messagesHtml = '';
    messages.forEach( ({name, msg}) => {
        messagesHtml += `
        
            <li>
                <p> <span class="text-primary">${name}:</span>
                <span style="margin-left:10px"> ${msg}</span>
                </p>

            </li>
        
        `;
    });

    ulMsg.innerHTML = messagesHtml;
}
const listUserMessage = ( {from, msg} ) => {
    let messagesHtml = '';
    messagesHtml += `
        
        <li>
            <p> <span class="text-primary">${from}:</span>
            <span style="margin-left:10px"> ${msg}</span>
            </p>

        </li>

    `;

    ulMsg.innerHTML = messagesHtml;
}


txtMsg.addEventListener('keyup',( {keyCode} ) =>{

    if(keyCode !== 13 || txtMsg.value.length == 0) return;

    const message = txtMsg.value;   
    const uid = txtUid.value;   

    client.emit('on-client-message', {msg:message, uid });

    txtMsg.value = '';

});

main();

