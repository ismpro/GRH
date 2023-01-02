const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

function onCreate() {
    let title = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let tipoVaga = document.getElementById("formCheck-2").checked;
    let validade = document.getElementById("validade").value;
    let requisitos = document.getElementById("requisitos").value;

    let dataToSend = { title, descricao, tipoVaga, validade, requisitos};

    api.post("/vagas/create", dataToSend).then(res => {
        console.log(res.data)
        data.title = title;
        data.descricao = descricao;
        data.tipoVaga = tipoVaga;
        data.validade = validade;
        data.requisitos = requisitos;
    })

    console.log("OLA");
}

window.onload = function () {
    api.get('/vagas').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
            console.log(data)
        }
    });
}