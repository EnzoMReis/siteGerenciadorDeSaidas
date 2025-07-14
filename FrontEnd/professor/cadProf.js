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
    nome: nome,
    sobrenome: sobrenome,
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
