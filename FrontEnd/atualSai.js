const params = new URLSearchParams(window.location.search);
window.history.replaceState({}, document.title, window.location.pathname);
const codified = params.get("data");
const jsonData = decodeURIComponent(codified);
const dataObject = JSON.parse(jsonData);

let btn = document.getElementById("btn");
let res = document.getElementById("res");
let motivo = document.getElementById("motivo");
let localDestino = document.getElementById("localDestino");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const payload = {
    dataSolicitacao: dataObject.dataSolicitacao,
    horaSaida: dataObject.horaSaida,
    horaRetorno: dataObject.horaRetorno,
    motivo: motivo.value ? motivo.value : dataObject.motivo,
    localDestino: localDestino.value ? localDestino.value : dataObject.localDestino,
    status: dataObject.status,
    nomeAluno: dataObject.nomeAluno,
    nomeProfessor: dataObject.nomeProfessor,
    aluno_cod: dataObject.aluno.codAluno,
    professor_cod: dataObject.professor.codProfessor,
  };

  fetch(`http://localhost:8081/saida/${dataObject.codSaida}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((dados) => {
      res.innerHTML = `<p>Saída Atualizada com sucesso! <br><br><br> Data de Solicitação: ${payload.dataSolicitacao} <br> Motivo: ${payload.motivo} 
        <br> Local: ${payload.localDestino} <br> Status: ${payload.status} <br> Aluno Requisitando: ${payload.nomeAluno}<br> Professor em Atividade: ${payload.nomeProfessor}</p>`;
    })
    .catch(() => {
      res.innerHTML = `<p style="color:red;">Erro ao cadastrar Saída!</p>`;
    });
});
