const btn = document.getElementById("btn");
const res = document.getElementById("res");

function montarTabela(professores) {
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
  professores.forEach((stud) => {
    const row = document.createElement("tr");
    ["codProfessor", "nome", "sobrenome", "matricula", "telefone", "email"].forEach(
      (key) => {
        const td = document.createElement("td");
        td.style.padding = "4px 8px";
        td.textContent = stud[key] ?? "-";
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

  fetch(`http://localhost:8081/professor/${id}`)
    .then((r) => {
      if (!r.ok) throw new Error("Professor não encontrado");
      return r.json();
    })
    .then((data) => {
      // data pode vir como objeto único ou array
      const lista = Array.isArray(data) ? data : [data];
      montarTabela(lista);
    })
    .catch((err) => {
      console.error("Erro ao consultar Professor:", err);
      res.textContent = "Nenhum Professor encontrado com esse ID.";
    });
});
