const api = axios.create({
    baseURL: window.location.origin,
    withCredentials: true,
});

const typeEnum = {
    'testeinformatica': "Teste de Informatica",
    'testeingles': 'Teste de Ingles'
}

window.addEventListener("DOMContentLoaded", function () {
    api.get('/stats').then((res) => {
        if (res.status === 200) {
            let data = res.data;

            let mediaTeste = document.getElementById("mediaTeste");
            let mediaAceitacao = document.getElementById("mediaAceitacao");
            let taxaAceitacao = document.getElementById("taxaAceitacao");
            let newCandidatos = document.getElementById("newCandidatos");
            let numCandidatos = document.getElementById("numCandidatos");
            let chartDiv = document.getElementById("chartDiv");

            numCandidatos.innerText = data.numCandidatos;
            newCandidatos.innerText = data.newCandidatos;

            taxaAceitacao.innerHTML = `
            <div class="col-auto">
                <div class="text-dark fw-bold h5 mb-0 me-3"><span>${data.taxaAceitacao}%</span></div>
            </div>
            <div class="col">
                <div class="progress progress-sm">
                    <div class="progress-bar bg-info" aria-valuenow="${data.taxaAceitacao}" aria-valuemin="0" aria-valuemax="100" style="width: ${data.taxaAceitacao}%;">
                        <span class="visually-hidden">${data.taxaAceitacao}%</span></div>
                </div>
            </div>`

            mediaAceitacao.innerText = dif(data.mediaAceitacao);

            for (const key in data.mediaPorTestes) {
                mediaTeste.innerHTML +=
                    `
                <h4 class="small fw-bold">${typeEnum[key]}<span class="float-end">${data.mediaPorTestes[key]}/20</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-danger" aria-valuenow="${data.mediaPorTestes[key]}" aria-valuemin="0" aria-valuemax="20" style="width: ${to10(data.mediaPorTestes[key])}%;"><span class="visually-hidden">${data.mediaPorTestes[key]}%</span></div>
                </div>
                `
            }

            let canvas = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Numero de Entrevistas", "Numero de Testes"],
                    datasets: [{
                        data: [data.numOfEntrevistas, data.numOfTestes],
                        backgroundColor: [
                            'rgba(78, 115, 223, 1)',
                            'rgba(28, 200, 138, 1)'
                        ],
                        borderColor: [
                            'rgba(78, 115, 223, 1)',
                            'rgba(28, 200, 138, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });

            chartDiv.appendChild(canvas);

        }
    });
})

function to10(num) {
    return (100 * num) / 10;
}

function dif(diffInMs) {
    const rtf = new Intl.RelativeTimeFormat(window.navigator.language);

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30.44;

    if (diffInDays < 7) {
        return rtf.format(Math.round(diffInDays), 'day').replace("in", "");
    } else if (diffInWeeks < 4) {
        return rtf.format(Math.round(diffInWeeks), 'week').replace("in", "");
    } else {
        return rtf.format(Math.round(diffInMonths), 'month').replace("in", "");
    }
}