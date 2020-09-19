function showLogin()
{
    /*
    login = SI:     => Se muestra login.html
    login = NO:     => No se hace nada
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

function gotToIndex(){
    //con esta funcion entramos al index.html
    localStorage.setItem('login','NO');
    window.location="index.html";
}

function localSignIn(email){
    var user = document.getElementById('inputEmail').value;
    var pass = document.getElementById('inputPassword').value
    if (user && pass)
    {
        if(user==='Ceibal'&&pass==='2020')
        {
            localStorage.setItem('user_loged',user.split(' ')[0]);
            gotToIndex()
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

function googleSignOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}

function cerrar_sesion(){
    localStorage.setItem('login','SI');
    googleSignOut()
    showLogin();
}

function googleSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    //var user_name = get.getElementById('user_name');
    //document.getElementById("user_name").innerHTML = profile.getName();
    localStorage.setItem('user_loged',profile.getName().split(' ')[0]);

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // Entrar a la página despues del login
    gotToIndex();
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("user_name").innerHTML = localStorage.getItem('user_loged');
});