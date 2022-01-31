const username = document.getElementById("username");
const password = document.getElementById("password");
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById("password-error");
const error = document.getElementById("error");

username.addEventListener("input", () => {
    if (username.value === "") {
        usernameError.style.display = "block";
    } else {
        usernameError.style.display = "none";
    }
});

password.addEventListener("input", () => {
    if (password.value === "") {
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none"
    }
}); 


async function getInfo() {
    try {
        const res = await fetch("https://invoicesapi20210913135422.azurewebsites.net/users");
        const data = await res.json();
        const dataVal = data.value;

        for (let i = 0; i < dataVal.length; i++) {
            if (username.value === dataVal[i].Name && password.value === dataVal[i].Password) {
                location.assign("http://127.0.0.1:5500/invoice.html");
            }
        }

        error.style.display = "block";

        username.value = "";
        password.value = "";
    } catch (error) {
        console.log(error)
    }
}