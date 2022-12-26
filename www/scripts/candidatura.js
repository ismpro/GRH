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
        button.onclick = function() {
            makeModal(candidato);
        }

        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}

function makeModal(candidato) {
    //modalInfo modalDropdown
    let modalInfo = document.getElementById("modalInfo");
    let modalDropdown = document.getElementById("modalDropdown");
    let modalDropdownTitle = document.getElementById("modalDropdownTitle");

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

    modalDropdown.innerHTML = "";
    

    {/* <a class="dropdown-item" role="presentation" href="#">Aprovar</a>
        <a class="dropdown-item" role="presentation" href="#">Reprovar</a>
        <a class="dropdown-item" role="presentation" href="#">Passar para teste</a>
        <a class="dropdown-item" role="presentation" href="#">Marcar entrevista</a>
        <a class="dropdown-item" role="presentation" href="#">Passar para decisão</a> */}
}

window.onload = function () {
    api.get('/candidatos').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((candidato, index) => ({ ...candidato, id: index, createdAt: new Date(candidato.createdAt)}));
            console.log(data)
            buildDom();
        }
    });
}