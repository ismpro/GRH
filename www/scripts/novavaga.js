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
    console.log(dataToSend);
    api.post("/vagas/create", dataToSend).then(res => {
        console.log(res.data);
        window.location.href = "/vagas";
    })
}

function onEdit() {
    let params = new URLSearchParams(window.location.search);
    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let tipoVaga = document.getElementById("formCheck-2").checked;
    let validade = document.getElementById("validade").value;
    let requisitos = document.getElementById("requisitos").value;
    let escritorio = document.getElementById("escritorio");
    let selectedOffice = escritorio.options[escritorio.selectedIndex].text;
    let buttonCreate = document.getElementById("btnCreate");
    let tituloContainer = document.getElementById("tituloContainer");
    buttonCreate.innerText = "Submeter";
    tituloContainer.innerText = "Vaga";
    let id = params.get("id");
    
    buttonCreate.addEventListener("click", () =>{
        let dataToSend = { id, titulo, descricao, selectedOffice, tipoVaga, validade, requisitos};
        api.post("/vagas/edit", dataToSend).then((res) =>{
            console.log(res.data);
            window.location.href = "/vagas";
        })
        
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

        title.value = data.titulo;
        descricao.value = data.descricao;
        validade.value = objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate();
        requisitos.value = data.requisitos;
        if(data.tipoVaga == true){
            isInternCheckbox.checked = true;
        }
        
        escritorio.selectedIndex = document.querySelector("#escritorio option[value='" + data.escritorio + "']").index;
        console.log(data);
}
function onAuth(){
    let params = new URLSearchParams(window.location.search);
    let buttonCreate = document.getElementById("btnCreate");
 if(params.has("id")) {
    api.get("/vagas/" + params.get("id")).then((response) => {
            let data = response.data;
            fillFields(data);
            onEdit();
        })
        .catch((err) => console.log(err));

} else {
    buttonCreate.addEventListener("click", () => {
        onCreate();
    });;
}}
