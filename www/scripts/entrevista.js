const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];
let modalSaveId = "";

function buildDom() {
    let table = document.getElementById("table");

    table.innerHTML = "";

    for (const entrevista of data) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            `<td><a href="/candidatura?id=${entrevista.candidato}">${entrevista.candidato}</a></td>
            <td>TODO</td>
            <td>${entrevista.local}</td>
            <td>${(new Date(entrevista.date)).toLocaleString()}</td>`;

        let td = document.createElement("td");

        if (entrevista.status === "undone") {

            let div = document.createElement("div");
            let buttoninsert = document.createElement("button");
            let buttoncancel = document.createElement("button");

            buttoninsert.type = "button";
            buttoninsert.className = "btn btn-primary";
            buttoninsert.innerText = "Insert";
            buttoninsert.setAttribute("data-bs-toggle", "modal");
            buttoninsert.setAttribute("data-bs-target", "#modal1");
            buttoninsert.onclick = function () {
                let modalNotes = document.getElementById("modalNotes");
                modalNotes.value = entrevista.notes || "";
                modalSaveId = entrevista._id;
            }

            buttoncancel.type = "button";
            buttoncancel.className = "btn btn-primary";
            buttoncancel.innerText = "Cancel";
            buttoncancel.style = "margin-left: 0px;background: var(--bs-red);border-style: none;";
            buttoncancel.onclick = function () {
                api.post("/entrevistas/cancel", { id: entrevista._id }).then(res => {
                    console.log(res.data)
                    entrevista.status = "cancel";
                    buildDom();
                })
            }

            div.appendChild(buttoninsert);
            div.appendChild(buttoncancel);
            td.appendChild(div);
        } else if(entrevista.status === "cancel") {
            td.innerText = `Entrevista Cancelada`
        } else {

            let div = document.createElement("div");
            let buttoninsert = document.createElement("button");

            buttoninsert.type = "button";
            buttoninsert.className = "btn btn-primary";
            buttoninsert.innerText = "Edit Notes";
            buttoninsert.setAttribute("data-bs-toggle", "modal");
            buttoninsert.setAttribute("data-bs-target", "#modal1");
            buttoninsert.onclick = function () {
                let modalNotes = document.getElementById("modalNotes");
                modalNotes.value = entrevista.notes || "";
                modalSaveId = entrevista._id;
            }

            div.appendChild(buttoninsert);
            td.appendChild(div);
        }

        tr.appendChild(td);
        table.appendChild(tr);
    }
}

function onSave() {
    let modalNotes = document.getElementById("modalNotes");
    let notes = modalNotes.value;

    let dataToSend = { id: modalSaveId, notes };

    api.post("/entrevistas", dataToSend).then(res => {
        console.log(res.data)

        let index = data.findIndex(e => e._id === modalSaveId)
        data[index].notes = notes;
        data[index].status = "done";
        buildDom();

        let myModal = new bootstrap.Modal(document.getElementById('modal1'), {});
        myModal.hide();
    })
}


window.onload = function () {
    api.get('/entrevistas').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((entrevista, index) => ({ ...entrevista, id: index }));
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