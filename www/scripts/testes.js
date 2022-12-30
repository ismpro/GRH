const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];
let modalSaveId = "";

const statusEnum = {
    'done': "Feito",
    'cancel': 'Cancelado', 
    'expired': "Expirado"
}

const typeEnum = {
    'testeinformatica': "Teste de Informatica",
    'testeingles': 'Teste de Ingles'
}

function buildDom() {
    let table = document.getElementById("table");

    table.innerHTML = "";

    for (const teste of data) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            `<td><a href="/candidatura?id=${teste.candidato}">${teste.candidato}</a></td>
            <td>TODO</td>
            <td>${typeEnum[teste.type]}</td>
            <td>${teste.schedule.local}</td>
            <td>${(new Date(teste.schedule.date)).toLocaleString()}</td>`;

        let td = document.createElement("td");

        if (teste.status === "undone") {
            if (teste.schedule.local === "online") {

                let button = document.createElement("button");
                button.type = "button";
                button.className = "btn btn-primary";
                button.innerText = "Cancel";
                button.style = "margin-left: 0px;background: var(--bs-red);border-style: none;";
                button.onclick = function () {
                    api.post("/testes/cancel", { id: teste._id }).then(res => {
                        console.log(res.data)
                        teste.status = "cancel";
                        buildDom();
                    })
                }

                td.appendChild(button);
            } else {
                let div = document.createElement("div");
                let buttoninsert = document.createElement("button");
                let buttoncancel = document.createElement("button");

                buttoninsert.type = "button";
                buttoninsert.className = "btn btn-primary";
                buttoninsert.innerText = "Insert";
                buttoninsert.setAttribute("data-bs-toggle", "modal");
                buttoninsert.setAttribute("data-bs-target", "#modal1");
                buttoninsert.onclick = function () {
                    let modalScore = document.getElementById("modalScore");
                    modalScore.value = 0;
                    modalSaveId = teste._id;
                }

                buttoncancel.type = "button";
                buttoncancel.className = "btn btn-primary";
                buttoncancel.innerText = "Cancel";
                buttoncancel.style = "margin-left: 0px;background: var(--bs-red);border-style: none;";
                buttoncancel.onclick = function () {
                    api.post("/testes/cancel", { id: teste._id }).then(res => {
                        console.log(res.data)
                        teste.status = "cancel";
                        buildDom();
                    })
                }

                div.appendChild(buttoninsert);
                div.appendChild(buttoncancel);
                td.appendChild(div);
            }
        } else {
            td.innerText = `Teste ${teste.status === "done" ?  teste.score + "/10" : statusEnum[teste.status]}`
        }

        tr.appendChild(td);
        table.appendChild(tr);
    }
}

function onSave() {
    let modalScore = document.getElementById("modalScore");
    let score = parseInt(modalScore.value);

    if(score <= 10 && score >= 0) {
        let dataToSend = { id: modalSaveId, score };

        api.post("/testes", dataToSend).then(res => {
            console.log(res.data)

            let index = data.findIndex(teste => teste._id === modalSaveId)
            data[index].score = score;
            data[index].status = "done";
            buildDom();

            let myModal = new bootstrap.Modal(document.getElementById('modal1'), {});
            myModal.hide();
        })
    } else {
        alert("Score invalido")
    }
}


window.onload = function () {
    api.get('/testes').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((teste, index) => ({ ...teste, id: index }));
            console.log(data)
            buildDom();

            /* const query = new URLSearchParams(window.location.href);
            if(query.has(window.location.origin + window.location.pathname + "?id")) {
                let id = query.get(window.location.origin + window.location.pathname + "?id")
                let teste = data.find((can => can._id = id));
                if(teste) {
                    makeModal(teste);

                    let myModal = new bootstrap.Modal(document.getElementById('modal1'), {});
                    myModal.show();
                }
            } */
        }
    });
}