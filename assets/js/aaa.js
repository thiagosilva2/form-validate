const submitButton = document.querySelector("#login_button");
const emailRemove = document.querySelector('input[type="email"]');

if (submitButton) {
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    const loginMessage = document.createElement("p");
    loginMessage.textContent = "Carregando...";
    submitButton.parentElement.appendChild(loginMessage);

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loginMessage.remove(); // Remove a mensagem de "Carregando..."

        if (data.error) {
          // Se ocorrer um erro, exibe a mensagem de erro e adiciona a classe de erro ao campo do e-mail
          const title = document.querySelector("#title");
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "E-mail ou senha incorretos.";
          title.parentElement.appendChild(errorMessage);
          errorMessage.style.color = "red";
          errorMessage.style.textAlign = "center";
          errorMessage.id = "errorMessage";
        } else {
          // Caso contrário, exibe uma mensagem de sucesso ou executa outra ação necessária após o login
          const carregandoSucesso = document.createElement("p");
          const messageRemove = document.querySelector("#errorMessage");
          carregandoSucesso.textContent = "Login bem sucedido!";
          submitButton.parentElement.appendChild(carregandoSucesso);
          messageRemove.remove();
          //title.remove();
          //console.log("Login bem sucedido!");
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro na requisição:", error);
        loginMessage.remove(); // Remove a mensagem de "Carregando..."
      });
  });
}
const validateEmail = (event) => {
  const input = event.currentTarget;
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailTest = regex.test(input.value);

  if (!emailTest) {
    submitButton.setAttribute("disabled", "disabled");
    input.nextElementSibling.classList.add("error");
  } else {
    submitButton.removeAttribute("disabled");
    input.nextElementSibling.classList.remove("error");

    const errorMessage = document
      .querySelector('input[type="email"]')
      .parentElement.querySelector("p");
    if (errorMessage) {
      errorMessage.remove();
    }
  }
};
