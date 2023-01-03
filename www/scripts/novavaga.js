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

function fillFields (data) {

    let title = document.getElementById("titulo"),
        descricao = document.getElementById("descricao"),
        validade = document.getElementById("validade"),
        requisitos = document.getElementById("requisitos"),
        escritorio = document.getElementById("escritorio"),
        isInternCheckbox = document.getElementById("checkbox"),
        objectDate = new Date(data.validade), 
        month = ((objectDate.getMonth() + 1) < 9) ? ("0" + (objectDate.getMonth() + 1)) : (objectDate.getMonth() + 1);

        descricao.value = data.descricao;
        validade.value = objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate();
        requisitos.value = data.requisitos;
        escritorio.selectedIndex = document.querySelector("#escritorio option[value='" + data.escritorio + "']").index;

        isInternCheckbox.style.display = "none";
        let groupFields = document.querySelectorAll('[data-group="formFields"]');
        groupFields.forEach(element => {
            element.disabled = true;
        });


}

window.onload = function () {

    let params = new URLSearchParams(window.location.search),
        buttonCreate = document.getElementById("btnCreate");

    if(params) {

        api.get("/vagas/" + params.get("id")).then((response) => {
                let data = response.data;
                fillFields(data);

                buttonCreate.innerText = "Candidatar-me";
                buttonCreate.addEventListener("click", () => {
                    window.location.href = "nova_candidatura.html";
                });;

            })
            .catch((err) => console.log(err));

    } else {
        buttonCreate.addEventListener("click", () => {
            onCreate();
        });;
    }
}