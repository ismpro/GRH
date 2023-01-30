"use strict";

var user;

window.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById('navbar');

    const api = axios.create({
        baseURL: window.location.origin,
        withCredentials: true,
    });


    //validates the user's authentication status
    api.post('/auth/validate').then((res) => {
        if (res.status === 200) {

            user = res.data;

            if(typeof onAuth === "function"){
                onAuth();
            }

            if (res.data.isAuth) {

                navbar.innerHTML += `
                <div class="d-none d-sm-block topbar-divider"></div>
                <li id="logout" class="nav-item dropdown no-arrow">
                    <div class="nav-item dropdown no-arrow">
                        <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                            <span class="d-none d-lg-inline me-2 text-gray-600 small" style="color: white;">${res.data.name}</span>
                        </a>
                        <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                            <a class="dropdown-item" onclick="javascript: onLogout()" href="#"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                        </div>
                    </div>
                </li>
                `

                if (res.data.type === "manager") {
                    //Remover as cenas que é preciso ou adicionar para o manager
                } else {
                    //Remover as cenas que é preciso ou adicionar para o trabalhador
                }

                return;
            }
        }
        //if not authenticated, create login and register button
        makeLogin(navbar);

    }).catch(err => console.log(err))
});

/**
* makeLogin - creates login and register buttons and appends them to the navbar element
* @param {HTMLElement} navbar - The navbar element to which the buttons will be appended
*/
function makeLogin(navbar) {
    let loginA = document.createElement("a");

    loginA.className = "btn";

    loginA.style = "color: white;";

    loginA.href = "/login";

    loginA.textContent = "Login";

    navbar.appendChild(createLI(loginA));
}

/**
* createLI - creates a list item element with the provided child element and class name
* @param {HTMLElement} child - The element to be placed inside the list item
* @param {string} cla - The class name to be applied to the list item
* @returns {HTMLElement} The created list item element
*/
function createLI(child, cla) {
    let li = document.createElement("li");
    li.className = cla || "nav-item d-xl-flex align-items-xl-center";
    li.appendChild(child);
    return li;
}

/**
* onLogout - function to handle logout functionality, makes a post request to '/auth/logout' using the provided 'api' object
*/
function onLogout() {
    const api = axios.create({
        baseURL: window.location.origin,
        withCredentials: true,
    });
    api.post('/auth/logout').then(res => {
        if (res.status === 200) {
            if (['/admin', '/profile', '/people'].includes(window.location.pathname)) {
                window.location.href = '/';
            } else {
                let li = document.getElementById("logout");
                li.previousElementSibling.remove();
                li.remove();
                makeLogin(document.getElementById('navbar'));
                window.location.reload();
            }
        }
    });
}