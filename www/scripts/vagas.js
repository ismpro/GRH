const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [],
    filteredData = [];

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
    console.log(filteredData);
    for (const vaga of filteredData) {
        let tr = document.createElement("tr"),
            objectDate = new Date(vaga.validade),
            month = ((objectDate.getMonth() + 1) < 9) ? ("0" + (objectDate.getMonth() + 1)) : (objectDate.getMonth() + 1);

        tr.innerHTML =
            `<td>${vaga.titulo}</td>
        <td>${objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate()}</td>
        <td>${vaga.escritorio}</td>
        <td>${(vaga.tipoVaga) ? "Interno" : "Externo"}</td>`;

        let td = document.createElement("td");

        let button = document.createElement("button");
        button.id = "buttonCandidatar";
        button.type = "button";
        button.className = "btn btn-primary";
        button.innerText = "Editar";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#modal1");
        button.onclick = function () {
            var params = new URLSearchParams();
            params.append("id", vaga._id);

            window.location.href = "/nova_vaga?" + params.toString();
        }

        td.appendChild(button);

        tr.appendChild(td);

        tableBody.appendChild(tr);
    }
}

function onAuth(){
    let buttonAdicionarVaga = document.getElementById("adicionarVaga");

    buttonAdicionarVaga.addEventListener("click", () => {
        window.location.href = "/nova_vaga";
    });

    api.get('/vagas/all').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
            filteredData = (user.isAuth) ? data.filter(item => item.manager === user.id) : data.filter(item => !item.tipoVaga);
            console.log(data)
            buildDom();

            const query = new URLSearchParams(window.location.href);
            if (query.has(window.location.origin + window.location.pathname + "?id")) {
                let id = query.get(window.location.origin + window.location.pathname + "?id")
                let vaga = data.find((vag => vag._id = id));
                if (vaga) {
                    window.location.href = "/nova_vaga?" + id;
                }
            }
        }
    });
}