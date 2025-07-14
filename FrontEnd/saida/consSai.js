const btn = document.getElementById("btn");
const res = document.getElementById("res");

function montarTabela(saidas) {
  res.innerHTML = "";

  const tabela = document.createElement("table");
  tabela.style.backgroundColor = "#333";
  tabela.style.border = "1px solid black";
  tabela.style.color = "#9ab5ff";
  tabela.style.fontFamily = "Arial, sans-serif";
  tabela.style.fontSize = "16px";
  tabela.style.textAlign = "center";
  tabela.setAttribute("border", "1");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["ID de Saída", "Data de Solicitação", "Hora de Saída", "Hora de Retorno", "Local de Destino", "Motivo", "Nome do Aluno", "Nome do Professor", "Status"];
  headers.forEach((texto) => {
    const th = document.createElement("th");
    th.style.padding = "4px 8px";
    th.style.backgroundColor = "black";
    th.textContent = texto;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  tabela.appendChild(thead);

  const tbody = document.createElement("tbody");
  saidas.forEach((stud) => {
    const row = document.createElement("tr");
    ["codSaida", "dataSolicitacao", "horaSaida", "horaRetorno", "localDestino", "motivo", "nomeAluno", "nomeProfessor", "status"].forEach(
      (key) => {
        const td = document.createElement("td");
        td.style.padding = "4px 8px";
        td.textContent = stud[key] ?? "-"; // Use "-" if the key is not present
        row.appendChild(td);
      }
    );
    tbody.appendChild(row);
  });
  tabela.appendChild(tbody);

  res.appendChild(tabela);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value.trim();
  if (!id) {
    alert("Por favor, insira um ID válido!");
    return;
  }

  fetch(`http://localhost:8081/saida/${id}`)
    .then((r) => {
      if (!r.ok) throw new Error("Saída não encontrada");
      return r.json();
    })
    .then((data) => {
      // data pode vir como objeto único ou array
      const lista = Array.isArray(data) ? data : [data];
      montarTabela(lista);
    })
    .catch((err) => {
      console.error("Erro ao consultar Saída:", err);
      res.textContent = "Nenhuma Saída encontrada com esse ID.";
    });
});
