
document.body.innerHTML = `
<form id="form">
<input type="text" id="fullName">
<input type="text" id="address_1">
<input type="text" id="city">
<input type="text" id="state">
<input type="text" id="zipcode">
<div id="error"></div>
<button id="button" type="submit"></button>
</form>
`
require('./profile.js');
var fullName = document.getElementById("fullName");
var address_1 = document.getElementById("address_1");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zipcode = document.getElementById("zipcode");
var form = document.getElementById("form")
var button = document.getElementById("button")


test('check if fullname is valid', () => {
    fullName.value = ""
    address_1.value = "123 Washington Avenue"
    city.value = "Houston"
    state.value = "TX"
    zipcode.value = "77123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter a valid full name.</li></ul>`)
})

test('check if address 1 is valid', () => {
    fullName.value = "Mr Bean"
    address_1.value = ""
    city.value = "Houston"
    state.value = "TX"
    zipcode.value = "77123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter a valid address.</li></ul>`)
})

test('check if city is valid', () => {
    fullName.value = "Mr Bean"
    address_1.value = "123 Washington Avenue"
    city.value = ""
    state.value = "TX"
    zipcode.value = "77123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter a valid city.</li></ul>`)
})


test('check if state is valid', () => {
    fullName.value = "Mr Bean"
    address_1.value = "123 Washington Avenue"
    city.value = "Houston"
    state.value = ""
    zipcode.value = "77123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please choose your state.</li></ul>`)
})

test('check if zipcode is valid', () => {
    fullName.value = "Mr Bean"
    address_1.value = "123 Washington Avenue"
    city.value = "Houston"
    state.value = "TX"
    zipcode.value = ""
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter a valid zipcode.</li></ul>`)
})






