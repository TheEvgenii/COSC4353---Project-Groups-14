

let form = document.getElementById("form")
form.addEventListener("submit", validate)


function validate(event) {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var error = document.getElementById("error")
    errorList = []
    if (username.value == "") {
        errorList.push("Please enter an username.")
        username.classList.add("invalid")
    }

    if (password.value == "") {
        errorList.push("Please enter password.")
        password.classList.add("invalid")
    }

    if (username.value != "" && password.value != "") {
        if (username.value != "fuel" || password.value != "user") {
            errorList.push("Username or password is not correct.")
            username.classList.add("invalid")
            password.classList.add("invalid")
        }
    }
    if (errorList.length != 0) {
        event.preventDefault()
        let html = "<ul>"
        for (let err of errorList) {
            html = html + "<li>" + err + "</li>"
        }
        html = html + "</ul>"
        error.style.display = "block"
        error.innerHTML = html
    }

}