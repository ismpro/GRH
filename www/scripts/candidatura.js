const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let dataController = tableMaker("table", (candidato)=> {
    let tr = document.createElement("tr");

    tr.innerHTML =
        `<td>${candidato.nome}</td>
    <td>${candidato.funcao.titulo}</td>
    <td>${candidato.type}</td>
    <td>${candidato.createdAt.toLocaleString().split(',')[0]}</td>`;

    let td = document.createElement("td");

    if(!['aprovado', 'reprovado'].includes(candidato.status)) {
        let button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.innerText = "Mostrar";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#modal1");
        button.onclick = function () {
            makeModal(candidato);
        }

        td.appendChild(button);
    } else {
        td.innerText = `Candidato ${candidato.status === "aprovado" ? "Aprovado" : "Reprovado"}`
    }
     
    tr.appendChild(td);

    return tr;
})

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
        <p>Vaga: <a href="/nova_vaga?id=${candidato.funcao._id}">${candidato.funcao.titulo}</a></p>
        <p>Começado: ${candidato.createdAt.toLocaleString().split(',')[0]}</p>
        <p>Email: ${candidato.email}</p>
        <p>Telefone: ${candidato.telefone}</p>
        <p>Genero: ${candidato.genero}</p>
        <p>Escolaridade: ${candidato.escolaridade}</p>
        <p>Salario pretendido: ${candidato.pretensaoSalarial} €</p>
    `

    modalDropdownTitle.innerText = "Escolher proximo passo";
    modalDropdown.innerHTML = "";

    let item1 = document.createElement("button");
    let item2 = document.createElement("button");
    let item4 = document.createElement("button");
    let item5 = document.createElement("button");

    item1.className = "dropdown-item";
    item2.className = "dropdown-item";
    item4.className = "dropdown-item";
    item5.className = "dropdown-item";

    item1.role = "presentation";
    item2.role = "presentation";
    item4.role = "presentation";
    item5.role = "presentation";

    item1.innerText = "Marcar teste";
    item2.innerText = "Marcar entrevista";
    item4.innerText = "Aprovar";
    item5.innerText = "Reprovar";

    item1.onclick = () => {
        modalDropdownTitle.innerText = "Marcar teste";

        modalMore.innerHTML = `
                <div>
                    <p>Selecionar o tipo de teste:</p>
                    <select id="modalTeste">
                        <option value="testeinformatica">Informatico</option>
                        <option value="testeingles">Ingles</option>
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
    modalDropdown.appendChild(item1);
    modalDropdown.appendChild(item2);
}

function onSave() {
    let dataToSend = {};

    let modalLocal = document.getElementById("modalLocal");
    let modalDate = document.getElementById("modalDate");
    let modalTime = document.getElementById("modalTime");

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
                date: transformDate(modalDate, modalTime)
            }
            break;
        case "teste":
            let modalTeste = document.getElementById("modalTeste");
            dataToSend = {
                type: "teste",
                id: modalSaveId,
                teste: modalTeste.value,
                local: modalLocal.value,
                date: transformDate(modalDate, modalTime)
            }
            break;
    }

    console.log(dataToSend);

    api.post("/candidatos/alterStatus", dataToSend).then(res => {
        window.location.reload();
    })
}

function transformDate(modalDate, modalTime) {
    const [year, month, day] = modalDate.value.split('-');
    const [hours, minutes] = modalTime.value.split(':');

    return new Date(+year, +month - 1, +day, +hours, +minutes);
}

window.addEventListener("DOMContentLoaded", function () {
    api.get('/candidatos').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((candidato, index) => ({ ...candidato, id: index, createdAt: new Date(candidato.createdAt) }));
            console.log(data)
            dataController.addData(data);

            const query = new URLSearchParams(window.location.href);
            if(query.has(window.location.origin + window.location.pathname + "?id")) {
                let id = query.get(window.location.origin + window.location.pathname + "?id")
                let candidato = data.find((can => can._id = id));
                if(candidato) {
                    makeModal(candidato);

                    let myModal = new bootstrap.Modal(document.getElementById('modal1'), {});
                    myModal.show();
                }
            }
        }
    });
})