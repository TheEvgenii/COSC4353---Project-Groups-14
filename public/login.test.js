const validate = require('./login')

test('properly read user login', () => {
    const username = ""; 
    const password = "";
    expect(validate.require(username)).toBe("")

})