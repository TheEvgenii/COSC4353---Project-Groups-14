function validate_signup(event) {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var passConfirm = document.getElementById("passwordConf")
    var email = document.getElementById("email")
    var error = document.getElementById("error")
    errorList = []

    let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/
    if (!re.test(email.value)) {
        errorList.push("Invalid or missing email address.")
        email.classList.add("invalid")

    }
    if (username.value == "") {
        errorList.push("Please enter an username.")
        username.classList.add("invalid")
    }


    if (password.value.length < 4 || password.value.length > 20) {
        errorList.push("Password must be between 5 and 20 characters.")
        password.classList.add("invalid")
    }

    let lowercase = 0
    let uppercase = 0
    let digit = 0
    for (let i = 0; i < password.value.length; i++) {
        let code = password.value.charCodeAt(i)
        if (code >= 65 && code <= 90) {
            uppercase++
        }
        else if (code >= 97 && code <= 122) {
            lowercase++
        }
        else if (code >= 48 && code <= 57) {
            digit++
        }
    }
    if (lowercase == 0) {
        errorList.push("Password must contain at least one lowercase character.")
        password.classList.add("invalid")

    }
    if (uppercase == 0) {
        errorList.push("Password must contain at least one uppercase character.")
        password.classList.add("invalid")
    }

    if (digit == 0) {
        errorList.push("Password must contain at least one digit.")
        password.classList.add("invalid")
    }
    if (passConfirm.value != password.value) {
        errorList.push("Password and confirmation password don't match.")
        passConfirm.classList.add("invalid")
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

let form = document.getElementById("form")
form.addEventListener("submit", validate_signup)

