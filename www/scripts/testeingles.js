let questions = [1,1,2,1,1,1,2,1,1,2];

let pontuação = 0;

function clickButton() {

    let con = true;
    pontuação = 0;

    if(!checkIfAllAnswer()) {
        con = confirm("Não respondeu a todas as perguntas. Tem a certeza que quer continuar?")
    }

    if(con) {
        for (let index = 0; index < questions.length; index++) {
            var checkboxes = document.getElementsByName("question-" + (index + 1));
            let answer = Array.from(checkboxes).findIndex(input=> input.checked);
            if((answer + 1) === questions[index]) pontuação++;
        }

        let div = document.getElementById("mainTeste");
        div.innerHTML = `<br/><p>A sua pontuação foi de ${pontuação}/10</p><p>Pode fechar esta janela agora</p>`;
    }
    
    console.log(pontuação);
}

function checkIfAllAnswer() {
    for (let index = 0; index < questions.length; index++) {
        var checkboxes = document.getElementsByName("question-" + (index + 1));
        let hasAnswer = Array.from(checkboxes).some(input=> input.checked);
        console.log(hasAnswer);
        if(!hasAnswer) return false;
    }

    return true;
}

function selectOnlyOne(element){
    var myCheckbox = document.getElementsByName(element.name);
    Array.prototype.forEach.call(myCheckbox,function(el){
      el.checked = false;
    });
    element.checked = true;
}

window.onload = function() {
    var allCheckboxes = document.querySelectorAll("input");
    for (const checkbox of allCheckboxes) {
        checkbox.onclick = (ev) => selectOnlyOne(ev.target);
    }
}