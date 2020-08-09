function showLogin(){
    window.location="login.html";
}

function entrar(){
    window.location="index.html";
}



getJSONData("json/login.js").then(function(resultObj){
    if (resultObj.status === "ok"){
        console.log(resultObj.data);
    }
})


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});