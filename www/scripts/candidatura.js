const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

function buildDom() {
    let table = document.getElementById("table");

    for (const candidato of data) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            `<td>${candidato.nome}</td>
        <td>${candidato.vaga}</td>
        <td>${candidato.type}</td>
        <td>${candidato.createdAt.toLocaleString().split(',')[0]}</td>`;

        //<td><button class="btn btn-primary" type="button">Button</button></td>
        let td = document.createElement("td");
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.innerText = "Button";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#modal1");
        button.onclick = function () {
            makeModal(candidato);
        }

        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}

let modalSavetype = "";
let modalSaveId = "";

function makeModal(candidato) {
    //modalInfo modalDropdown
    let modalInfo = document.getElementById("modalInfo");
    let modalDropdown = document.getElementById("modalDropdown");
    let modalDropdownTitle = document.getElementById("modalDropdownTitle");
    let modalMore = document.getElementById("modalMore");

    modalMore.innerHTML = "";
    modalSavetype = "";
    modalSaveId = candidato._id;

    modalInfo.innerHTML = `
        <p>Nome: ${candidato.nome}</p>
        <p>Tipo: ${candidato.type}</p>
        <a href="#">Funcao: ${candidato.vaga}</a>
        <p>Começado: ${candidato.createdAt.toLocaleString().split(',')[0]}</p>
        <p>Email: ${candidato.email}</p>
        <p>Telefone: ${candidato.telefone}</p>
        <p>Genero: ${candidato.genero}</p>
        <p>Escolaridade: ${candidato.escolaridade}</p>
        <p>Salario pretendido: ${candidato.pretensaoSalarial} €</p>
    `

    modalDropdownTitle.innerText = "Escolher proximo passo";
    modalDropdown.innerHTML = "";

    switch (candidato.status) {
        case "triagem":
            let item1 = document.createElement("button");
            let item2 = document.createElement("button");
            let item3 = document.createElement("button");

            item1.className = "dropdown-item";
            item2.className = "dropdown-item";
            item3.className = "dropdown-item";

            item1.role = "presentation";
            item2.role = "presentation";
            item3.role = "presentation";

            item1.innerText = "Marcar teste";
            item2.innerText = "Marcar entrevista";
            item3.innerText = "Passar para decisão";

            item1.onclick = () => {
                modalDropdownTitle.innerText = "Marcar teste";

                modalMore.innerHTML = `
                <div>
                    <p>Selecionar o tipo de teste:</p>
                    <select id="modalTeste">
                        <option value="0">Informatico</option>
                        <option value="1">Ingles</option>
                    </select>
                </div>
                <div>
                    <div class="group">      
                        <input id="modalLocal" type="text" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Local</label>
                    </div>
                </div>
                <div>
                    <input id="modalDate" type="date">
                    <input id="modalTime" type="time">
                </div>
                `
                modalSavetype = "teste";
            }
            item2.onclick = () => {
                modalDropdownTitle.innerText = "Marcar entrevista";

                modalMore.innerHTML = `
                <div>
                    <div class="group">      
                        <input id="modalLocal" type="text" required>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>Local</label>
                    </div>
                </div>
                <div>
                    <input id="modalDate" type="date">
                    <input id="modalTime" type="time">
                </div>
                `
                modalSavetype = "entrevista";
            }
            item3.onclick = () => {
                modalDropdownTitle.innerText = "Passar para decisão";
                modalMore.innerHTML = "";
                modalSavetype = "decisao";
            }
            modalDropdown.appendChild(item1);
            modalDropdown.appendChild(item2);
            modalDropdown.appendChild(item3);
            break;
        case "teste":
        case "entrevista":
            console.log("Not Implemented")
            break;
        case "decisao":
            let item4 = document.createElement("button");
            let item5 = document.createElement("button");

            item4.className = "dropdown-item";
            item5.className = "dropdown-item";

            item4.role = "presentation";
            item5.role = "presentation";

            item4.innerText = "Aprovar";
            item5.innerText = "Reprovar";

            item4.onclick = () => {
                modalDropdownTitle.innerText = "Aprovar";
                modalSavetype = "aprovar";
            }

            item5.onclick = () => {
                modalDropdownTitle.innerText = "Reprovar";
                modalSavetype = "reprovar";
            }
            modalDropdown.appendChild(item4);
            modalDropdown.appendChild(item5);
            break;
        default:
            console.log("No status")
    }

    {/* <a class="dropdown-item" role="presentation" href="#">Aprovar</a>
        <a class="dropdown-item" role="presentation" href="#">Reprovar</a>
        <a class="dropdown-item" role="presentation" href="#">Passar para teste</a>
        <a class="dropdown-item" role="presentation" href="#">Marcar entrevista</a>
        <a class="dropdown-item" role="presentation" href="#">Passar para decisão</a> */}
}

function onSave() {
    let dataToSend = {};

    let modalLocal = document.getElementById("modalLocal");
    let modalDate = document.getElementById("modalDate");
    let modalTime = document.getElementById("modalTime");

    console.log(modalLocal)

    switch (modalSavetype) {
        case "aprovar":
            dataToSend = {
                type: "aprovar",
                id: modalSaveId
            }
            break;
        case "reprovar":
            dataToSend = {
                type: "reprovar",
                id: modalSaveId
            }
            break;
        case "entrevista":
            dataToSend = {
                type: "entrevista",
                id: modalSaveId,
                local: modalLocal.value,
                date: modalDate.value,
                time: modalTime.value
            }
            break;
        case "teste":
            let modalTeste = document.getElementById("modalTeste");
            dataToSend = {
                type: "teste",
                id: modalSaveId,
                teste: modalTeste.value,
                local: modalLocal.value,
                date: modalDate.value,
                time: modalTime.value
            }
            break;
    }

    console.log(dataToSend);

    api.post("/")
}

window.onload = function () {
    api.get('/candidatos').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((candidato, index) => ({ ...candidato, id: index, createdAt: new Date(candidato.createdAt) }));
            console.log(data)
            buildDom();
        }
    });
}