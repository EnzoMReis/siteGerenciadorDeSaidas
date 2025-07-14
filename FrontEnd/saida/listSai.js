let btn = document.getElementById("btn");
let res = document.getElementById("res");

function reloadTable() {
  fetch("http://localhost:8081/saida")
    .then((resposta) => resposta.json())
    .then((data) => {
      if (data.length === 0) {
        res.innerHTML = `<p style="color:red;">Nenhuma saída cadastrada!</p>`;
        return;
      }

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
      const headers = [
        "ID Saída", "Data Solicitação", "Hora Saída", "Hora Retorno",
        "Local Destino", "Motivo", "Nome Aluno", "Nome Professor",
        "Status"
      ];

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
      data.forEach((saida) => {
        const row = document.createElement("tr");

        function criaCelula(valor) {
          const td = document.createElement("td");
          td.style.padding = "4px 8px";
          td.textContent = valor;
          return td;
        }

        row.appendChild(criaCelula(saida.codSaida));
        row.appendChild(criaCelula(saida.dataSolicitacao));
        row.appendChild(criaCelula(saida.horaSaida));
        row.appendChild(criaCelula(saida.horaRetorno));
        row.appendChild(criaCelula(saida.localDestino));
        row.appendChild(criaCelula(saida.motivo));
        row.appendChild(criaCelula(saida.nomeAluno));
        row.appendChild(criaCelula(saida.nomeProfessor));
        row.appendChild(criaCelula(saida.status));

        tbody.appendChild(row);
      });

      tabela.appendChild(tbody);
      res.appendChild(tabela);
    })
    .catch((err) => {
      console.error("Erro ao ler os dados: ", err);
    });
}

document.addEventListener("DOMContentLoaded", reloadTable);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  reloadTable();
});
