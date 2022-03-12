const { validate} = require("./login.js");
const { validate} = require("./signup.js");

test('should output invalid', () =>{
    const username = validate.username(' "" ');
    const password = validate.password(' "" ');
    expect(username).toBe('invalid');
})


test('check username if it contain at least 4 characters', () =>{
    const username = validate.username('airdrop');
    const username2 = validate.username('airinthewater');
    expect(username).toBe(true);
    expect(username2).toBe(true);
})

test('check username if it contain at least 4 characters', () =>{
    const username = validate.username('air');
    const username2 = validate.username('airinthewaterandunderthewater');
    expect(username).toBe(false);
    expect(username2).toBe(false);
})

describe("Help", () => {
test('check password requirement', () =>{
    const password = validate.password('adm');
    expect(password).toBe('Password must be between 5 and 20 characters.');

    const password1 = password('Admin');
    expect(password1).toBe('Password must contain at least one digit.');

    const password2 = password('admin1');
    expect(password2).toBe('Password must contain at least one uppercase character.');

    const password3 = password('ADMIN1');
    expect(password3).toBe('Password must contain at least one lowercase character.');

    const text7 = checkPwd('dvdfvdfvdfvsdsdcsdvdfvfdvsdscdsvdfbvdfvdfcscsdcsdcdsfvsdf');
    expect(text7).toBe('Password must be between 5 and 20 characters.');

    });
});