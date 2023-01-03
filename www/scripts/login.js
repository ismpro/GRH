const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

function onLogin(){
    let email = document.getElementById("exampleInputEmail").value;
    let password = document.getElementById("exampleInputPassword").value;

    let dataToSend = {email, password};

    api.post("/auth/login", dataToSend).then(res => {
        console.log(res.data);
    })
}