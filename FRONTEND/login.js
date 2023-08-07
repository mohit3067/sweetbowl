const forms = document.querySelector(".forms"),
  eyeicon = document.querySelector("#eye-icon"),
  ceyeicon = document.querySelector("#ceyeicon"),
  leyeicon = document.querySelector("#leyeicon"),
  links = document.querySelectorAll(".link");

eyeicon.addEventListener("click", () => {
  let password = document.querySelector(".singup-pass");
  if (password.type === "password") {
    password.type = "text";
    eyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  password.type = "password";
  eyeicon.classList.replace("bx-show", "bx-hide");
});
ceyeicon.addEventListener("click", () => {
  let cpassword = document.querySelector(".confirm-password");
  if (cpassword.type === "password") {
    cpassword.type = "text";
    ceyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  cpassword.type = "password";
  ceyeicon.classList.replace("bx-show", "bx-hide");
});
leyeicon.addEventListener("click", () => {
  let lpassword = document.querySelector(".login-pass");
  if (lpassword.type === "password") {
    lpassword.type = "text";
    leyeicon.classList.replace("bx-hide", "bx-show");
    return;
  }
  lpassword.type = "password";
  leyeicon.classList.replace("bx-show", "bx-hide");
});
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-singup");
  });
});
//-----> code for find user from backend <------//
const formlogin = document.querySelector(".form-login");
formlogin.addEventListener("submit", loginuser);
async function loginuser(event) {
  event.preventDefault();
  const email = document.querySelector(".login-email").value;
  const password = document.querySelector(".login-pass").value;
  const result = await fetch("http://localhost:3030/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
  console.log(result);
  sessionStorage.setItem("jwtToken", result);
  if (result) {
    window.location.href = "sweet.html";
  }
}
const formsingup = document.querySelector(".form-singup");
formsingup.addEventListener("submit", singupuser);
async function singupuser(event) {
  event.preventDefault();
  const name = document.querySelector(".singin-name").value;
  const email = document.querySelector(".singup-email").value;
  const password = document.querySelector(".singup-pass").value;
  const confirmpassword = document.querySelector(".confirm-password").value;
  if (password === confirmpassword) {
    const result = await fetch("http://localhost:3030/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => res.json());
    console.log(result);
    sessionStorage.setItem("jwtToken", result);
  } else {
    alert("confirm password is not same as password");
  }
}
