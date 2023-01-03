const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

function onRegister(){
    let firstName = document.getElementById("exampleFirstName").value;
    let lastName = document.getElementById("exampleLastName").value;
    let email = document.getElementById("exampleInputEmail").value;
    let password = document.getElementById("examplePasswordInput").value;
    let confPassword = document.getElementById("exampleRepeatPasswordInput").value;
    let type = 'candidato';

    if(!validatePassword(password, confPassword) || !validateEmail(email)){
        return;
    }

    let dataToSend = {firstName, lastName, email, password, type};

    api.post("/auth/register", dataToSend).then(res => {
        console.log(res.data);
    })
}

function validateEmail(email){
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(regex)){
        alert("E-mail não tem formato correto.");
        return false;
    }
    return true;
}

function validatePassword(password, confPassword){
    if(password !== confPassword){
        alert("Passwords não coincidem!");
        return false;
    }
    return true;
}