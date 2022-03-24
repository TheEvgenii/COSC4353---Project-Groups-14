
document.body.innerHTML = `
    <form id="form">
    <input type="email" id="email">
    <input type="text" id="username">
    <input type="password" id="password">
    <input type="password" id="passwordConf">
    <div id="error"></div>
    <button id="button" type="submit"></button>
    </form>
    `
require('./signup.js');
var username = document.getElementById("username");
var password = document.getElementById("password");
var passConfirm = document.getElementById("passwordConf")
var email = document.getElementById("email")
var error = document.getElementById("error")
var form = document.getElementById("form")
var button = document.getElementById("button")


test('check if email is valid', () => {
    username.value = "abcdef"
    password.value = "Abcdef1"
    passConfirm.value = "Abcdef1"
    email.value = "123"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Invalid or missing email address.</li></ul>`)
})

test('check empty username', () => {
    username.value = ""
    password.value = "Abcdef1"
    passConfirm.value = "Abcdef1"
    email.value = "123@gmail.com"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Please enter an username.</li></ul>`)
})

test('check if password is valid', () => {
    username.value = "abcdef"
    password.value = ""
    passConfirm.value = ""
    email.value = "123@gmail.com"
    button.click()
    expect(error.innerHTML).toEqual(`<ul><li>Password must be between 5 and 20 characters.</li><li>Password must contain at least one lowercase character.</li><li>Password must contain at least one uppercase character.</li><li>Password must contain at least one digit.</li></ul>`)
})


// test('check username if it contain at least 4 characters', () => {
//     const username = validate_signup.username('airdrop');
//     const username2 = validate_signup.username('airinthewater');
//     expect(username).toBe(true);
//     expect(username2).toBe(true);
// })

// test('check username if it contain at least 4 characters', () => {
//     const username = validate_signup.username('air');
//     const username2 = validate_signup.username('airinthewaterandunderthewater');
//     expect(username).toBe(false);
//     expect(username2).toBe(false);
// })

// describe("Help", () => {
//     test('check password requirement', () => {
//         const password = validate_signup.password('adm');
//         expect(password).toBe('Password must be between 5 and 20 characters.');

//         const password1 = password('Admin');
//         expect(password1).toBe('Password must contain at least one digit.');

//         const password2 = password('admin1');
//         expect(password2).toBe('Password must contain at least one uppercase character.');

//         const password3 = password('ADMIN1');
//         expect(password3).toBe('Password must contain at least one lowercase character.');

//         const text7 = checkPwd('dvdfvdfvdfvsdsdcsdvdfvfdvsdscdsvdfbvdfvdfcscsdcsdcdsfvsdf');
//         expect(text7).toBe('Password must be between 5 and 20 characters.');

//     });
// });


