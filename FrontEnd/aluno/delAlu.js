let btn = document.getElementById("btn");
let res = document.getElementById("res");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let id = document.getElementById("id").value.trim();

  fetch(`http://localhost:8081/aluno/${id}`, {
    method: "DELETE",
  })
    .then((dados) => {
        res.innerHTML = `<p>Aluno Deletado com Sucesso!</p>`;  
    })
    .catch((err) => {
      res.innerHTML = `<p style="color:red;">Erro ao Deletar Aluno!</p>`;
      console.error("Erro:", err);
    });
});
