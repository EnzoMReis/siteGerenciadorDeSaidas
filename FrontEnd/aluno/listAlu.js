let btn = document.getElementById("btn");
let res = document.getElementById("res");

function reloadTable() {
  fetch("http://localhost:8081/aluno")
    .then((resposta) => resposta.json())
    .then((data) => {
      if (data.length === 0) {
        res.innerHTML = `<p style="color:red;">Nenhum Professor cadastrado!</p>`;
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
      const headers = ["ID", "Nome", "Sobrenome", "Matrícula", "Telefone", "Email"];

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

        row.appendChild(criaCelula(saida.codAluno));
        row.appendChild(criaCelula(saida.nome));
        row.appendChild(criaCelula(saida.sobrenome));
        row.appendChild(criaCelula(saida.matricula));
        row.appendChild(criaCelula(saida.telefone));
        row.appendChild(criaCelula(saida.email));

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