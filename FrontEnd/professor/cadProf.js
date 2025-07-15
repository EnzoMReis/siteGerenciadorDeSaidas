let btn = document.getElementById("btn");
let res = document.getElementById("res");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let nome = document.getElementById("nome").value.trim();
  let sobrenome = document.getElementById("sobrenome").value.trim();
  let matricula = Number(document.getElementById("matricula").value.trim());
  let telefone = document.getElementById("telefone").value.trim();
  let email = document.getElementById("email").value.trim();

  const data = {
    nome: formatNames(nome),
    sobrenome: formatNames(sobrenome),
    matricula: matricula,
    telefone: telefone,
    email: email
  };

  console.log(data)

  fetch("http://localhost:8081/professor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((dados) => {
      res.innerHTML = `<p>Professor Cadastrado com Sucesso <br><br><br> Nome: ${nome} <br> Sobrenome: ${sobrenome} <br> 
      Matricula: ${matricula} <br> Telefone: ${telefone} <br> Email: ${email}</p>`;
    })
    .catch(() => {
      res.innerHTML = `<p style="color:red;">Erro ao cadastrar Professor!</p>`;
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