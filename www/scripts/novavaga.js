const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

function onCreate() {
    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let tipoVaga = document.getElementById("formCheck-2").checked;
    let validade = document.getElementById("validade").value;
    let requisitos = document.getElementById("requisitos").value;
    let escritorio = document.getElementById("escritorio");
    let selectedOffice = escritorio.options[escritorio.selectedIndex].text;

    let dataToSend = { titulo, descricao, selectedOffice, tipoVaga, validade, requisitos};

    api.post("/vagas/create", dataToSend).then(res => {
        console.log(res.data);
    })
}

window.onload = function () {
/*    api.get('/vagas').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
            console.log(data)
        }
    });*/
}