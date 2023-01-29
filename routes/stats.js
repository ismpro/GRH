const User = require('../models/User');
const Vaga = require('../models/Vaga');
const Candidato = require('../models/Candidato');
const Teste = require('../models/Testes');
const Entrevista = require('../models/Entrevista');
const Testes = require('../models/Testes');

const getCandidatos = async function (id) {
    let output = [];

    let manager = await User.findById(id);
    let vagas = await Vaga.find({ manager: manager._id });

    for (const vaga of vagas) {
        let candidatos = await Candidato.find({ vaga: vaga._id });

        for (const candidato of candidatos) {
            candidato._doc.vaga = vaga;
            output.push(candidato)
        }
    }
    return output
}

module.exports = function () {
    return async function (req, res) {
        if (req.session.userid) {

            let numOfEntrevistas = 0;
            let numOfTestes = 0;
            let mediaPorTestes = { testeinformatica: 0, testeingles: 0 };
            let taxaAceitacao = 0;

            let candidatos = await getCandidatos(req.session.userid);

            let newCandidatos = candidatos.filter(candidato => candidato.status === 'triagem').length;


            let totalSelectionTime = 0;
            let doneCandidatos = candidatos.filter(candidato => candidato.status === 'aprovado' && candidato.status === 'reprovado');
            
            doneCandidatos.forEach(candidate => {
                const selectionTime = (candidate.done.getTime() - candidate.createdAt.getTime());
                totalSelectionTime += selectionTime;
              });
              
            let mediaAceitacao = (totalSelectionTime / doneCandidatos.length) / (1000 * 60 * 60 * 24);
              
            for (const candidato of candidatos) {
                numOfEntrevistas += await Entrevista.countDocuments({ candidato: candidato._id });

                let testes = await Testes.find({ candidato: candidato._id });
                numOfTestes += testes.length;

                let informatica = testes.filter(teste => teste.type === "testeinformatica" && teste.status === 'done')
                let ingles = testes.filter(teste => teste.type === "testeingles" && teste.status === 'done')

                mediaPorTestes.testeinformatica += informatica.reduce((acc, teste) => teste.score + acc, 0);
                mediaPorTestes.testeingles += ingles.reduce((acc, teste) => teste.score + acc, 0);
            }

            mediaPorTestes.testeinformatica /= await Testes.countDocuments({ status: "done", type: "testeinformatica" });
            mediaPorTestes.testeingles /= await Testes.countDocuments({ status: "done", type: "testeingles" });

            mediaPorTestes.testeinformatica = Math.round(mediaPorTestes.testeinformatica || 0);
            mediaPorTestes.testeingles = Math.round(mediaPorTestes.testeingles || 0);

            let aceites = candidatos.filter((candidato) => candidato.status === "aprovado").length;
            taxaAceitacao = (aceites / candidatos.length) * 100;

            res.send({
                numCandidatos: candidatos.length || 0,
                newCandidatos: newCandidatos || 0,
                taxaAceitacao: taxaAceitacao || 0,
                mediaAceitacao: mediaAceitacao || 0,
                numOfEntrevistas: numOfEntrevistas || 0,
                numOfTestes: numOfTestes || 0,
                mediaPorTestes
            })

        } else {
            res.sendStatus(401);
        }
    }
}