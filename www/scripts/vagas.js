const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

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
    for (const vaga of data) {
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
        let btnDelete = document.createElement("button");
        button.id = "buttonCandidatar";
        button.type = "button";
        button.className = "btn btn-primary";
        button.innerText = "Editar";
        btnDelete.id = "btnDelete";
        btnDelete.type = "button";
        btnDelete.className = "btn btn-primary";
        btnDelete.innerText = "Apagar";
        btnDelete.style.marginLeft = "5px";
        btnDelete.style.backgroundColor = "#d73b3e";
        button.onclick = function () {
            var params = new URLSearchParams();
            params.append("id", vaga._id);
            window.location.href = "/nova_vaga?" + params.toString();
        }
        let id = vaga._id;
        btnDelete.onclick = function () {
            if(confirm("Tem a certeza que pretende apagar a vaga?")){
                api.post("/vagas/delete", {id}).then((res) => {
                    console.log(res.data);
                    window.location.href = "/vagas";
                })
            } 
        }

        td.appendChild(button);
        td.appendChild(btnDelete);

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