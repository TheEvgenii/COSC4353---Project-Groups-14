document.body.innerHTML = `
    <form id="form">
    <input type="text" id="username">
    <input type="password" id="password">
    <div id="error"></div>
    <button id="button" type="submit"></button>
    </form>
    `
require('./login.js');
var username = document.getElementById("username");
var password = document.getElementById("password");
var error = document.getElementById("error")
var form = document.getElementById("form")
var button = document.getElementById("button")


test('check if empty username', () => {
    username.value = ""
    password.value = "user"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter an username.</li></ul>`)
})

test('check if empty password', () => {
    username.value = "fuel"
    password.value = ""
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter password.</li></ul>`)
})

test('check if username and password are correct', () => {
    username.value = "fuel"
    password.value = "123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Username or password is not correct.</li></ul>`)
})