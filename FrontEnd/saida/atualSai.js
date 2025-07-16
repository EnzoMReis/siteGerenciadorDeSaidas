let btn = document.getElementById("btn");
let res = document.getElementById("res");
let codSaida = document.getElementById("id");
let dataSolicitacao = document.getElementById("dataSolicitacao");
let horaSaida = document.getElementById("horaSaida");
let horaRetorno = document.getElementById("horaRetorno");
let motivo = document.getElementById("motivo");
let localDestino = document.getElementById("localDestino");
let status = document.getElementById("status");

document.addEventListener("DOMContentLoaded", () => {
  let alunoSelect = document.getElementById("aluno");
  let professorSelect = document.getElementById("professor");

  fetch("http://localhost:8081/aluno")
    .then((res) => res.json())
    .then((alunos) => {
      alunos.forEach((aluno) => {
        alunoSelect.innerHTML += `<option data-nome="${aluno.nome} ${aluno.sobrenome}" value="${aluno.codAluno}">${aluno.nome} ${aluno.sobrenome}</option>`;
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar entregas:", err);
    });

  fetch("http://localhost:8081/professor")
    .then((res) => res.json())
    .then((professores) => {
      professores.forEach((professor) => {
        professorSelect.innerHTML += `<option data-nome="${professor.nome} ${professor.sobrenome}" value="${professor.codProfessor}">${professor.nome} ${professor.sobrenome}</option>`;
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar entregas:", err);
    });

  // Puxar Aluno e Professor ^ ^
  // Atualização v v

  codSaida.addEventListener("change", (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/saida/${codSaida.value}`)
      .then((res) => res.json())
      .then((data) => {
        let status = document.getElementById("status");

        dataSolicitacao.value = data.dataSolicitacao || "";
        horaSaida.value = data.horaSaida || "";
        horaRetorno.value = data.horaRetorno || "";
        motivo.value = data.motivo || "";
        localDestino.value = data.localDestino || "";
        status.value = data.status || "";

        // Selecionar a opção correta no alunoSelect
        for (let i = 0; i < alunoSelect.options.length; i++) {
          if (alunoSelect.options[i].dataset.nome === data.nomeAluno) {
            alunoSelect.selectedIndex = i;
            break;
          }
        }

        // Selecionar a opção correta no professorSelect
        for (let i = 0; i < professorSelect.options.length; i++) {
          if (professorSelect.options[i].dataset.nome === data.nomeProfessor) {
            professorSelect.selectedIndex = i;
            break;
          }
        }
        if (codSaida.value !== "") {
          codSaida.disabled = true;
          codSaida.style.backgroundColor = "gray";
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar entregas:", err);
      });
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let nomeAluno = alunoSelect.options[alunoSelect.selectedIndex].dataset.nome;
    let nomeProfessor = professorSelect.options[professorSelect.selectedIndex].dataset.nome;
    let aluno_cod = alunoSelect.value;
    let professor_cod = professorSelect.value;

    const data = {
      dataSolicitacao: dataSolicitacao.value,
      horaSaida: horaSaida.value,
      horaRetorno: horaRetorno.value,
      motivo: motivo.value,
      localDestino: localDestino.value,
      status: status.value,
      nomeAluno: nomeAluno,
      nomeProfessor: nomeProfessor,
      aluno_cod: aluno_cod,
      professor_cod: professor_cod,
    };

    console.log(data, "data", codSaida.value);

    fetch(`http://localhost:8081/saida/${codSaida.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((dados) => {
        res.innerHTML = `<p>Saída Atualizada com sucesso! <br><br><br> Data de Solicitação: ${data.dataSolicitacao} <br> Motivo: ${data.motivo} 
        <br> Local: ${data.localDestino} <br> Status: ${data.status} <br> Aluno Requisitando: ${data.nomeAluno}<br> Professor em Atividade: ${data.nomeProfessor}</p>`;
      })
      .catch(() => {
        res.innerHTML = `<p style="color:red;">Erro ao cadastrar Saída!</p>`;
      });
  });
});
