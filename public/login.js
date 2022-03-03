function validate()
{
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;


    if(username=="fuel" && password=="user")
    {
        window.location.href = 'FuelQuote.html';
        return False
    }
    else
    {
        window.location.href = 'signin.html';
        
    }

}