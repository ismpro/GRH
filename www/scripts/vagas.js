const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

function buildDom() {
    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (const vaga of data) {
        let tr = document.createElement("tr");

        tr.innerHTML =
            `<td>${vaga.funcao}</td>
        <td>${vaga.validade}</td>
        <td>${vaga.escritorio}</td>`;

        //<td><button class="btn btn-primary" type="button">Button</button></td>
        let td = document.createElement("td");
         
        tr.appendChild(td);

        tr.addEventListener("click", (oEvent) => {

            var id = data[oEvent.pointerId - 1]._id;

            api.get("/vagas/" + id).then((response) => {
                var params = new URLSearchParams();
                params.append("id", response.data._id);

                window.location.href = "nova_vaga.html?" + params.toString();
            })
            .catch((err) => console.log(err));

        });

        tableBody.appendChild(tr);
    }
}

function transformDate(modalDate, modalTime) {
    const [year, month, day] = modalDate.value.split('-');
    const [hours, minutes] = modalTime.value.split(':');

    return new Date(+year, +month - 1, +day, +hours, +minutes);
}

window.onload = function () {
    let buttonAdicionarVaga = document.getElementById("adicionarVaga");

    buttonAdicionarVaga.addEventListener("click", () => {
        window.location.href = "nova_vaga.html";
    });

    api.get('/vagas').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
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