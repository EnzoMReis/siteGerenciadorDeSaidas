let btn = document.getElementById("btn");
let res = document.getElementById("res");

document.addEventListener("DOMContentLoaded", () => {
    const alunoSelect = document.getElementById("aluno");
    const professorSelect = document.getElementById("professor");
  
    fetch("http://localhost:8081/aluno")
      .then(res => res.json())
      .then(alunos => {
        alunos.forEach(aluno => {
          alunoSelect.innerHTML += `<option data-nome="${aluno.nome} ${aluno.sobrenome}" value="${aluno.codAluno}">${aluno.nome} ${aluno.sobrenome}</option>`;
        });
      })
    .catch(err => {
        console.error("Erro ao carregar entregas:", err);
    });
    
    fetch("http://localhost:8081/professor")
      .then(res => res.json())
      .then(professores => {
        professores.forEach(professor => {
            professorSelect.innerHTML += `<option data-nome="${professor.nome} ${professor.sobrenome}" value="${professor.codProfessor}">${professor.nome} ${professor.sobrenome}</option>`;
        });
      })
    .catch(err => {
        console.error("Erro ao carregar entregas:", err);
    });

    // Puxar Aluno e Professor ^ ^
    // Cadastro v v

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const now = new Date();
      const ms = now.getMilliseconds().toString().padStart(6, "0");
      const timeWithMs =
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + `.${ms}`;
  
      let dataSolicitacao = new Date().toISOString().slice(0, 10);
      let horaSaida = timeWithMs; // hora do pedido
      let horaRetorno = "00:00";
      let motivo = document.getElementById("motivo").value;
      let localDestino = document.getElementById("local").value;
      let status = "Pendente";
      let nomeAluno = alunoSelect.options[alunoSelect.selectedIndex].dataset.nome;
      let nomeProfessor = professorSelect.options[professorSelect.selectedIndex].dataset.nome;
      let aluno_cod = alunoSelect.value;
      let professor_cod = professorSelect.value;
  
      const data = {
        dataSolicitacao: dataSolicitacao,
        horaSaida: horaSaida,
        horaRetorno: horaRetorno,
        motivo: motivo,
        localDestino: localDestino,
        status: status,
        nomeAluno: nomeAluno,
        nomeProfessor: nomeProfessor,
        aluno_cod: aluno_cod,
        professor_cod: professor_cod
      };
  
      fetch("http://localhost:8081/saida", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(dados => {
        res.innerHTML = `<p>Saída cadastrada com sucesso! <br><br><br> Data de Solicitação: ${dataSolicitacao} <br> Motivo: ${motivo} 
        <br> Local: ${localDestino} <br> status: ${status} <br> Aluno Requisitando: ${nomeAluno} <br> Professor em Atividade: ${nomeProfessor}</p>`;
      })
      .catch(() => {
        res.innerHTML = `<p style="color:red;">Erro ao cadastrar Saída!</p>`;
      });
    });
  });