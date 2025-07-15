function createCard(saida) {
  let cod_aluno, cod_professor;

  fetch(`http://localhost:8081/aluno`)
    .then((res) => res.json())
    .then((alunos) => {
      alunos.forEach((aluno) => {
        if (aluno.nome === saida.nomeAluno) {
          cod_aluno = aluno.codAluno;
        }
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar alunos", err);
    });

  fetch(`http://localhost:8081/professor`)
    .then((res) => res.json())
    .then((professores) => {
      professores.forEach((professor) => {
        if (professor.nome === saida.nomeProfessor) {
          cod_professor = professor.codProfessor;
        }
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar professores", err);
    });

  const card = document.createElement("div");
  card.className = "card-entry";

  card.innerHTML = `
      <div class="card-info">
        <div style="margin-left: 10px;" class="card-name">
          <small>Nome Aluno</small>
          <h2>${saida.nomeAluno}</h2>
        </div>
        <div class="card-time">
          <small>${
            saida.status === "Aprovado"
              ? "Horário de Saída"
              : "Horário de Pedido"
          }</small>
          <span>${saida.horaSaida}</span>
        </div>
        <div class="card-time">
          <small>Status</small>
          <span>${saida.status}</span>
        </div>
        <div class="card-time">
          <small>Local</small>
          <span>${saida.localDestino}</span>
        </div>
        <div class="card-time">
          <small>Motivo</small>
          <span>${saida.motivo}</span>
        </div>
      </div>
      <div class="card-actions">
        ${
          saida.status === "Aprovado"
            ? `
          <button style="scale:0.8;" class="btn_finalize">Finalizar Saída</button>
          <button style="scale:0.8; cursor: default; background-color: #9ab5ff; color: #9ab5ff;" class="btn_disabled-cancel" disabled>.</button>
        `
            : `
          <button style="scale:0.8;" class="btn_approve">Aceitar Saída</button>
          <button style="scale:0.8;" class="btn_reject">Recusar Saída</button>
        `
        }
      </div>
      <div>
        <button class="btn_edit" style="background-color: #9ab5ff; margin-right: 25px;">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="black"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </button>
      </div>
    `;

  const btnApprove = card.querySelector(".btn_approve");
  if (btnApprove) {
    btnApprove.addEventListener("click", () => {
      const now = new Date();
      const ms = now.getMilliseconds().toString().padStart(6, "0");
      const timeWithMs =
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + `.${ms}`;

      const payload = {
        dataSolicitacao: saida.dataSolicitacao,
        horaSaida: timeWithMs,
        horaRetorno: saida.horaRetorno,
        motivo: saida.motivo,
        localDestino: saida.localDestino,
        status: "Aprovado",
        nomeAluno: saida.nomeAluno,
        nomeProfessor: saida.nomeProfessor,
        aluno_cod: cod_aluno,
        professor_cod: cod_professor,
      };

      console.log("PUT payload:", payload);
      fetch(`http://localhost:8081/saida/${saida.codSaida}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((txt) => {
              console.error("Erro do servidor:", txt);
              throw new Error("Falha ao aprovar saída");
            });
          }
          return res.json();
        })
        .then(() => loadCards())
        .catch((err) => console.error(err));
    });
  }

  const btnReject = card.querySelector(".btn_reject");
  if (btnReject) {
    btnReject.addEventListener("click", () => {
      const payload = {
        dataSolicitacao: saida.dataSolicitacao,
        horaSaida: saida.horaSaida,
        horaRetorno: saida.horaRetorno,
        motivo: saida.motivo,
        localDestino: saida.localDestino,
        status: "Recusado",
        nomeAluno: saida.nomeAluno,
        nomeProfessor: saida.nomeProfessor,
        aluno_cod: cod_aluno,
        professor_cod: cod_professor,
      };

      console.log("PUT payload:", payload);

      fetch(`http://localhost:8081/saida/${saida.codSaida}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((txt) => {
              console.error("Erro do servidor:", txt);
              throw new Error("Falha ao recusar saída");
            });
          }
          return res.json();
        })
        .then(() => loadCards())
        .catch((err) => console.error(err));
    });
  }

  const btnFinalize = card.querySelector(".btn_finalize");
  if (btnFinalize) {
    const now1 = new Date();
    const ms1 = now1.getMilliseconds().toString().padStart(6, "0");
    const timeWithMs1 =
      now1.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) + `.${ms1}`;

    btnFinalize.addEventListener("click", () => {
      const payload = {
        dataSolicitacao: saida.dataSolicitacao,
        horaSaida: saida.horaSaida,
        horaRetorno: timeWithMs1,
        motivo: saida.motivo,
        localDestino: saida.localDestino,
        status: "Finalizado",
        nomeAluno: saida.nomeAluno,
        nomeProfessor: saida.nomeProfessor,
        aluno_cod: cod_aluno,
        professor_cod: cod_professor,
      };

      console.log("PUT payload:", payload);

      fetch(`http://localhost:8081/saida/${saida.codSaida}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((txt) => {
              console.error("Erro do servidor:", txt);
              throw new Error("Falha ao recusar saída");
            });
          }
          return res.json();
        })
        .then(() => loadCards())
        .catch((err) => console.error(err));
    });
  }

  const btnEdit = card.querySelector(".btn_edit");
  btnEdit.addEventListener("click", () => {
    const payload = {
      ...saida,
      aluno_cod: cod_aluno,
      professor_cod: cod_professor,
    };

    // Armazena os dados num objeto serializado e passa como parâmetro de URL
    const params = encodeURIComponent(JSON.stringify(payload));
    window.location.href = `./atualSai.html?data=${params}`;
  });

  return card;
}

function loadCards() {
  const container = document.getElementById("filaVirtual");
  container.innerHTML = "";

  fetch("http://localhost:8081/saida")
    .then((res) => res.json())
    .then((saidas) => {
      const hoje = new Date().toISOString().slice(0, 10);
      const filtradas = saidas.filter((s) => {
        const rawDate = s.dataSolicitacao;
        const dataStr = rawDate.split("T")[0];
        return (
          dataStr === hoje &&
          (s.status === "Aprovado" || s.status === "Pendente")
        );
      });

      // Ordenar: aprovados em cima
      filtradas.sort((a, b) => {
        if (a.status === "Aprovado" && b.status !== "Aprovado") return -1;
        if (a.status !== "Aprovado" && b.status === "Aprovado") return 1;
        return 0;
      });

      filtradas.forEach((saida) => {
        const card = createCard(saida);
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar saídas", err);
    });
}

window.onload = () => {
  loadCards();
};
