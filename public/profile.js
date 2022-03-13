let form = document.getElementById("form")
form.addEventListener("submit", validate_profile)

function validate_profile(event) {
    var fullName = document.getElementById("fullName");
    var address_1 = document.getElementById("address_1");
    var address_2 = document.getElementById("address_2");
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    var zipcode = document.getElementById("zipcode");
    var error = document.getElementById("error")
    errorList = []
    if (fullName.value == "" || fullName.value.length > 50) {
        errorList.push("Please enter a valid full name.")
        fullName.classList.add("invalid")
    }
    if (address_1.value == "" || address_1.value.length > 100) {
        errorList.push("Please enter a valid address.")
        address_1.classList.add("invalid")
    }
    if (city.value == "" || city.value.length > 100) {
        errorList.push("Please enter a valid city.")
        city.classList.add("invalid")
    }
    if (state.value == "") {
        errorList.push("Please choose your state.")
        state.classList.add("invalid")
    }

    if (zipcode.value.length < 5 || zipcode.value.length > 9) {
        errorList.push("Please enter a valid zipcode.")
        zipcode.classList.add("invalid")
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


