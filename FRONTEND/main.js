const token = sessionStorage.getItem("jwtToken");
fetch("http://localhost:3030/api/auth/getuser", {
  method: "POST",
  headers: {
    "auth-token": token,
  },
})
  .then((res) => res.json())
  .then((userdata) => {
    let user = document.querySelector(".info");
    user.innerHTML = `Welcome ${userdata.name} ${userdata.email}`;
  });
window.addEventListener("beforeunload", () => {
  sessionStorage.removeItem("jwtToken");
});
