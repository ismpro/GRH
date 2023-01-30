const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let modalSaveId = "";

let dataController = tableMaker("table", (entrevista)=> {
    let tr = document.createElement("tr");

        tr.innerHTML =
            `<td><a href="/candidatura?id=${entrevista.candidato._id}">${entrevista.candidato.nome}</a></td>
            <td>${entrevista.candidato.vaga.titulo}</td>
            <td>${entrevista.local}</td>
            <td>${(new Date(entrevista.date)).toLocaleString()}</td>`;

        let td = document.createElement("td");

        if (entrevista.status === "undone") {

            let div = document.createElement("div");
            let buttoninsert = document.createElement("button");
            let buttoncancel = document.createElement("button");

            buttoninsert.type = "button";
            buttoninsert.className = "btn btn-primary";
            buttoninsert.innerText = "Notas";
            buttoninsert.setAttribute("data-bs-toggle", "modal");
            buttoninsert.setAttribute("data-bs-target", "#modal1");
            buttoninsert.onclick = function () {
                let modalNotes = document.getElementById("modalNotes");
                modalNotes.value = entrevista.notes || "";
                modalSaveId = entrevista._id;
            }

            buttoncancel.type = "button";
            buttoncancel.className = "btn btn-primary";
            buttoncancel.innerText = "Cancelar";
            buttoncancel.style = "margin-left: 0px;background: var(--bs-red);border-style: none;";
            buttoncancel.onclick = function () {
                api.post("/entrevistas/cancel", { id: entrevista._id }).then(res => {
                    window.location.reload()
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

    return tr;
})

function onSave() {
    let modalNotes = document.getElementById("modalNotes");
    let notes = modalNotes.value;

    let dataToSend = { id: modalSaveId, notes };

    api.post("/entrevistas", dataToSend).then(res => {
        window.location.reload();
    })
}


window.onload = function () {
    api.get('/entrevistas').then(res => {
        if (typeof res.data === 'object') {
            let data = res.data.map((entrevista, index) => ({ ...entrevista, id: index }));
            dataController.addData(data);

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