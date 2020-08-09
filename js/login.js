function showLogin()
{
    /*
    login = SI:     => Se muestra login.html
    login = NO:     => No s hace nada
    login = null    => Se muestra login.html
    */ 
    var login = localStorage.getItem('login');

    if (login)
    {
        if(login === 'SI'){
            window.location="login.html";
        }
    }
}

function entrar(email)
{
    localStorage.setItem('login','NO');
    var user = document.getElementById('inputEmail').value;
    var pass = document.getElementById('inputPassword').value
    if (user && pass)
    {
        if(user==='Ceibal'&&pass==='2021')
        {
            window.location="index.html";
        }
        else
        {
            alert('Usuario o contraseñas incorrectos');
        }
        
    }
    else
    {
        alert('Se deben completar todos los campos');
    }
}

function cerrar_sesion(){
    localStorage.setItem('login','SI');
    showLogin()
}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});