const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

let data = [];

function buildDom() {
    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    /*tableBody.addEventListener('click', (event) => {
        if (event.target.className === 'button') {
            console.log('Button was clicked');

            let params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "nova_candidatura.html?" + params.toString();

        } else {
            console.log('Row was clicked');

            let params = new URLSearchParams();
            params.append("id", vaga._id);

            window.location.href = "nova_vaga.html?" + params.toString();
        }
    });*/

    for (const vaga of data) {
        let tr = document.createElement("tr"),
            objectDate = new Date(vaga.validade), 
            month = ((objectDate.getMonth() + 1) < 9) ? ("0" + (objectDate.getMonth() + 1)) : (objectDate.getMonth() + 1);

            tr.innerHTML =
            `<td>${vaga.titulo}</td>
        <td>${objectDate.getFullYear() + "-" + month + "-" + objectDate.getDate()}</td>
        <td>${vaga.escritorio}</td>`;

        let td = document.createElement("td");

        let button = document.createElement("button");
            button.id = "buttonCandidatar";
            button.type = "button";
            button.className = "btn btn-primary";
            button.innerText = "Candidatar-me";
            button.onclick = function () {
                var params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "/nova_candidatura?" + params.toString();
            }
    
        td.appendChild(button);
         
        tr.appendChild(td);

        /*tableBody.addEventListener("click", function(e) {
            if (e.target.tagName === "BUTTON") {
                var params = new URLSearchParams();
                params.append("id", vaga._id);

                window.location.href = "/nova_candidatura?" + params.toString();
            }
        });*/

        tableBody.appendChild(tr);
    }
}

window.onload = function () {

    api.get('/vagas/all').then(res => {
        if (typeof res.data === 'object') {
            data = res.data.map((vaga, index) => ({ ...vaga, id: index }));
            console.log(data)
            buildDom();
        }
    });
        
}