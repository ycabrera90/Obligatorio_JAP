function showLogin(){
    console.log('step0')
    /*
    login = SI:     => Se muestra login.html
    login = NO:     => No s hace nada
    login = null    => Se muestra login.html y se crea login = NO
    */ 
    var login = localStorage.getItem('login');

    if (login){
        if(login === 'SI'){
            window.location="login.html";
            localStorage.setItem('login','NO');
        }
    }
    else{
        window.location="login.html";
        localStorage.setItem('login','NO');
    }
}

function entrar(){
    window.location="index.html";
}

function cerrar_sesion(){
    localStorage.setItem('login','SI');
    showLogin()
}

// Muestro el loggin si no se ha mostrado antes
showLogin()




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    //localStorage.setItem("email", 'esto es un prueba1');
    console.log(localStorage.getItem("email1"));
    
   

});