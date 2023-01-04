const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

function onCreate() {
    let nome = document.getElementById("nome").value,
        genero = document.getElementById("genero"),
        selectedGenero = genero.options[genero.selectedIndex].text,
        email = document.getElementById("email").value,
        telefone = document.getElementById("telefone").value,
        salario = document.getElementById("salario").value,
        escolaridade = document.getElementById("escolaridade"),
        selectedEscolaridade = escolaridade.options[escolaridade.selectedIndex].text,
        habilidades = document.getElementById("habilidades").value,
        vaga = data._id,
        dataToSend = { nome, selectedGenero, email, telefone, salario, selectedEscolaridade, vaga, habilidades};

    api.post("/candidatos/create", dataToSend).then(res => {
        console.log(res.data);
    })
}

/*function fillFields (data) {

    let title = document.getElementById("titulo"),
        descricao = document.getElementById("descricao"),
        validade = document.getElementById("validade"),
        requisitos = document.getElementById("requisitos"),
        escritorio = document.getElementById("escritorio"),
        isInternCheckbox = document.getElementById("checkbox"),
        objectDate = new Date(data.validade), 
        month = ((objectDate.getMonth() + 1) < 9) ? ("0" + (objectDate.getMonth() + 1)) : (objectDate.getMonth() + 1);

        title.value = data.titulo;
        descricao.value = data.descricao;
        validade.value = objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate();
        requisitos.value = data.requisitos;
        escritorio.selectedIndex = document.querySelector("#escritorio option[value='" + data.escritorio + "']").index;

        isInternCheckbox.style.display = "none";
        let groupFields = document.querySelectorAll('[data-group="formFields"]');
        groupFields.forEach(element => {
            element.disabled = true;
        });


}*/

window.onload = function () {

    let params = new URLSearchParams(window.location.search),
        buttonCreate = document.getElementById("btnCreate");

    if(params) {

        api.get("/vagas/" + params.get("id")).then((response) => {
                data = response.data;
                //fillFields(data);

                buttonCreate.innerText = "Submeter Candidatura";
                buttonCreate.addEventListener("click", () => {
                    onCreate();
                });

            })
            .catch((err) => console.log(err));

    }
}