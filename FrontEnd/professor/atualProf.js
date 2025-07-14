let btn = document.getElementById("btn");
let res = document.getElementById("res");
let codProfessor = document.getElementById("id");
let nome = document.getElementById("nome");
let sobrenome = document.getElementById("sobrenome");
let matricula = document.getElementById("matricula");
let telefone = document.getElementById("telefone");
let email = document.getElementById("email");

codProfessor.addEventListener("change", (e) => {
  e.preventDefault();

  fetch(`http://localhost:8081/professor/${codProfessor.value}`)
    .then((res) => res.json())
    .then((data) => {
      nome.value = data.nome || "";
      sobrenome.value = data.sobrenome || "";
      matricula.value = data.matricula || "";
      telefone.value = data.telefone || "";
      email.value = data.email || "";
      if (codProfessor.value !== "") {
        codProfessor.disabled = true;
        codProfessor.style.backgroundColor = "gray";
      }
    })
    .catch((err) => {
      console.error("Erro ao carregar entregas:", err);
    });

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {
      codProfessor: codProfessor.value.trim(),
      nome: nome.value.trim(),
      sobrenome: sobrenome.value.trim(),
      matricula: matricula.value.trim(),
      telefone: telefone.value.trim(),
      email: email.value.trim(),
    };

    if (codProfessor.value === "") {
      res.innerHTML = `<p style="color:red;">Preencha o ID</p>`;
      return;
    } else {
      fetch(`http://localhost:8081/professor/${codProfessor.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((dados) => {
          res.innerHTML = `<p>Professor Atualizado com Sucesso <br><br><br> Nome: ${nome.value} <br> Sobrenome: ${sobrenome.value} <br> 
      Matricula: ${matricula.value} <br> Telefone: ${telefone.value} <br> Email: ${email.value}</p>`;
        })
        .catch(() => {
          res.innerHTML = `<p style="color:red;">Erro ao Atualizar Professor!</p>`;
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
