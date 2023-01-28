const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

function onLogin(ev) {
    ev.preventDefault();
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    createSpinner("loginButton");

    let errorText = document.getElementById("errorText");
    errorText.textContent = "";

    api.post("/auth/login", { email, password }).then(res => {
        let code = res.status
        if (code === 200) {
            setTimeout(() => {
                if(res.data === "manager") {
                    window.location.href = '/';
                } else {
                    window.location.href = '/vagas.html';
                }
                
            }, 1000);
        } else if (code === 221) {
            errorText.appendChild(document.createTextNode(res.data));
            removeSpinner("loginButton");
        }
    })
}

/**
 * Creates a spinner element
 * @param {String} id - the id of the login button element removes the login button
 */
function createSpinner(id) {
    let input = document.getElementById(id);
    let parent = input.parentElement;

    let div1 = document.createElement('div');
    div1.className = "lds-ellipsis";
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');

    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    parent.appendChild(div1);

    input.remove();
}

/**
 * removeSpinner - removes the spinner element and re-adds the login button
 * @param {String} id - the id of the login button element
*/
function removeSpinner(id) {
    let div = document.querySelector(".lds-ellipsis");
    let parent = div.parentElement;

    let input = document.createElement('input');
    input.className = "btn btn-primary";
    input.type = "submit";
    input.id = id;
    input.value = "Log In";

    parent.appendChild(input);
    div.remove();
}