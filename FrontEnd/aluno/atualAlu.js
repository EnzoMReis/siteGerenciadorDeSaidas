let btn = document.getElementById("btn");
let res = document.getElementById("res");
let codAluno = document.getElementById("id");
let nome = document.getElementById("nome");
let sobrenome = document.getElementById("sobrenome");
let matricula = document.getElementById("matricula");
let telefone = document.getElementById("telefone");
let email = document.getElementById("email");

codAluno.addEventListener("change", (e) => {
  e.preventDefault();

  fetch(`http://localhost:8081/aluno/${codAluno.value}`)
    .then((res) => res.json())
    .then((data) => {
      nome.value = data.nome || "";
      sobrenome.value = data.sobrenome || "";
      matricula.value = data.matricula || "";
      telefone.value = data.telefone || "";
      email.value = data.email || "";
      if (codAluno.value !== "") {
        codAluno.disabled = true;
        codAluno.style.backgroundColor = "gray";
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar entregas:", err);
    });

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {
      codAluno: codAluno.value.trim(),
      nome: nome.value.trim(),
      sobrenome: sobrenome.value.trim(),
      matricula: matricula.value.trim(),
      telefone: telefone.value.trim(),
      email: email.value.trim(),
    };

    if (codAluno.value === "") {
      res.innerHTML = `<p style="color:red;">Preencha o ID</p>`;
      return;
    } else {
      fetch(`http://localhost:8081/aluno/${codAluno.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((dados) => {
          res.innerHTML = `<p>Aluno Atualizado com Sucesso <br><br><br> Nome: ${nome.value} <br> Sobrenome: ${sobrenome.value} <br> 
      Matricula: ${matricula.value} <br> Telefone: ${telefone.value} <br> Email: ${email.value}</p>`;
        })
        .catch(() => {
          res.innerHTML = `<p style="color:red;">Erro ao Atualizar Aluno!</p>`;
        });
    }
  });

  document.getElementById("id").addEventListener("input", (e) => {
    const idInput = e.target;
    if (idInput.value.trim() !== "") {
      idInput.disabled = true; // Desativa o campo de entrada
    }
  });
});

function toTitleCase(str) {
  return str.toLowerCase().replace(/(^|\s)(\p{L})/gu, (_, separator, char) => separator + char.toUpperCase());

  /* '_' matches the complete match of the regex
     'separator' matches the first group (^|\s) which is either the beginning of the string or a whitespace character
     'char' matches the second group (\p{L}) which is any Unicode Letter Character
  
     (^|\s): Beggining of the string or a whitespace character
     (\p{L}): any Unicode Letter Character
     /g is a global search, meaning it will search for all matches in the string
     /u is to put in unicode(UTF-16) code
     /gu is just the 2 of them at the same time */
}

function formatNames(name) {
  const formattedNames = toTitleCase(name);
  return formattedNames;
}
