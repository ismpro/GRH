const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [],
    filteredData = [],
    user = {};

function buildDom() {
    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    /*tableBody.addEventListener('click', (event) => {
        if (event.target.className === 'button') {
            console.log('Button was clicked');

            let params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "nova_candidatura.html?" + params.toString();

        } else {
            console.log('Row was clicked');

            let params = new URLSearchParams();
            params.append("id", vaga._id);

            window.location.href = "nova_vaga.html?" + params.toString();
        }
    });*/

    for (const vaga of filteredData) {
        let tr = document.createElement("tr"),
            objectDate = new Date(vaga.validade), 
            month = ((objectDate.getMonth() + 1) < 9) ? ("0" + (objectDate.getMonth() + 1)) : (objectDate.getMonth() + 1);

        tr.innerHTML =
            `<td>${vaga.titulo}</td>
        <td>${objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate()}</td>
        <td>${vaga.escritorio}</td>`;

        let td = document.createElement("td");

        let button = document.createElement("button");
            button.id = "buttonCandidatar";
            button.type = "button";
            button.className = "btn btn-primary";
            button.innerText = "Candidatar-me";
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#modal1");
            button.onclick = function () {
                var params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "nova_candidatura.html?" + params.toString();
            }
    
        td.appendChild(button);
         
        tr.appendChild(td);

        tr.addEventListener("click", (oEvent) => {

            var params = new URLSearchParams();
            params.append("id", vaga._id);

            window.location.href = "nova_vaga.html?" + params.toString();

        });

        tableBody.addEventListener("click", function(e) {
            if (e.target.tagName === "BUTTON") {
                var params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "nova_candidatura.html?" + params.toString();
            } else {
                var params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "nova_vaga.html?" + params.toString();
            }
        });

        tableBody.appendChild(tr);
    }
}

window.onload = function () {
    let buttonAdicionarVaga = document.getElementById("adicionarVaga");

    buttonAdicionarVaga.addEventListener("click", () => {
        window.location.href = "nova_vaga.html";
    });


    //validates the user's authentication status
    api.post('/auth/validate').then((res) => {
        if (res.status === 200) {
            user = res.data;
            if (user.isAuth) {

                if (user.type === "manager") {
                    document.getElementById("managerContainer").style.display = "block";
                } else {
                    document.getElementById("managerContainer").style.display = "none";
                }

                return;
            }

            api.get('/vagas').then(res => {
                if (typeof res.data === 'object') {
                    data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
                    filteredData = (user.isAuth) ? data.filter(item => item.tipoVaga) : data.filter(item => !item.tipoVaga);
                    console.log(data)
                    buildDom();
        
                    const query = new URLSearchParams(window.location.href);
                    if(query.has(window.location.origin + window.location.pathname + "?id")) {
                        let id = query.get(window.location.origin + window.location.pathname + "?id")
                        let vaga = data.find((vag => vag._id = id));
                        if(vaga) {
                            window.location.href = "nova_vaga.html?" + id;
                        }
                    }
                }
            });
        }

    }).catch(err => console.log(err))
}