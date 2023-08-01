const init = () => {
  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = regex.test(input.value);

    if (!emailTest) {
      submitButton.setAttribute("disabled", "disabled");
      input.nexElementSibling.classList.add("error");
    } else {
      submitButton.removeAttribute("disabled");
      input.nexElementSibling.classList.remove("error");
    }
  };

  const inputEmail = document.querySelector('input[type="email"]');
  const inputPassword = document.querySelector('input[type="password"]');
  const submitButton = document.querySelector("#login_button");

  inputEmail.addEventListener("input", validateEmail);
  inputPassword.addEventListener("input", validatePassword);

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail.value,
          password: inputPassword.value,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  }
  console.log(submitButton);
};

window.onload = init;
