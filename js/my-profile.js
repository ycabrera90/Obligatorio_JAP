let user_loged = localStorage.getItem('user_loged');
let user_Information = JSON.parse(localStorage.getItem(user_loged+'_inf'));

function showUserInformation(user_Information){
    if(!user_Information){
        // oculto bloque de informacion de usuario por no haber datos
        document.getElementById('boxUserInformation').style.display = 'None';
        
        // muestro formulario para llenar los datos
        askForUserDatas()
    }
    else{
        // actualizo la informacion del bloque de informacion de usuario
        document.getElementById('boxUserInformation_name').innerHTML = user_Information.name;
        document.getElementById('boxUserInformation_lastName').innerHTML = user_Information.lastName;
        document.getElementById('boxUserInformation_age').innerHTML = user_Information.age;
        document.getElementById('boxUserInformation_email').innerHTML = user_Information.emal;
        

        // alterno entre el logo masculino y el femenino segun el tipo de usuario
        if (user_Information.sex === 'Femenino'){
            document.getElementById('boxUserInformation_sex').src = "img/female_user.png";
        }
        else{
            document.getElementById('boxUserInformation_sex').src = "img/male_user.png";
            document.getElementById('boxUserInformation_sex').src = "https://lh3.googleusercontent.com/a-/AOh14GhDjML_SFya1dJX-rkXwTQ3EU7kf0OoA_gOV8k-1Q=s96-c";
            console.log(user_Information)
        }
        


        // muestro bloque de informacion de usuario
        document.getElementById('boxUserInformation').style.display = 'flex';
    }
}

function askForUserDatas(){
    // muestro y oculto el formulario
    display = document.getElementById('personal_datas').style.display;
    if (display === 'block'){
        document.getElementById('personal_datas').style.display = 'None';
    }
    else{
        document.getElementById('personal_datas').style.display = 'block';
    }
}

function saveUserDatas(){
    userDataName = document.getElementById('userDataName');
    userDataLastName = document.getElementById('userDataLastName');
    userDataAge = document.getElementById('userDataAge');
    userDataSex = document.getElementById('userDataSex');
    userDataEmail = document.getElementById('userDataEmail');

    console.log('userDataSex');
    console.log(userDataSex.value);

    // BLOQUE DE VALIDACION DE DATOS
    data_validation = true;
    // detecto campo vacio en el nombre de usuario
    if(!userDataName.value){
        data_validation = false;
        userDataName.className = "form-control is-invalid";
    }
    else{
        userDataName.className = "form-control";
    }

    // detecto campo vacio en los apellidos del usuario
    if(!userDataLastName.value){
        data_validation = false;
        userDataLastName.className = "form-control is-invalid";
    }
    else{
        userDataLastName.className = "form-control";
    }

    // detecto campo vacio en la edad del usuario
    if(!userDataAge.value){
        data_validation = false;
        userDataAge.className = "form-control is-invalid";
    }
    else{
        userDataAge.className = "form-control";
    }

    // detecto campo vacio en el sexo del usuario
    if(userDataSex.value === '---'){
        data_validation = false;
        userDataSex.className = "form-control is-invalid";
    }
    else{
        userDataSex.className = "form-control";
    }


    // detecto campo vacio en el correo del usuario
    if(!userDataEmail.value){
        data_validation = false;
        userDataEmail.className = "form-control is-invalid";
    }
    else{
        userDataEmail.className = "form-control";
    }

    if (data_validation){
        // objeto para la informacion del usuario 
        userData = {'lastUpdate':'localUser', 'name':userDataName.value,'lastName':userDataLastName.value,'age':userDataAge.value,'sex':userDataSex.value,'emal':userDataEmail.value};
        
        // guardo objeto en el local storage
        localStorage.setItem(user_loged+'_inf',JSON.stringify(userData));

        // actualizo datos introducidos por el usuario
        user_loged = localStorage.getItem('user_loged');
        user_Information = JSON.parse(localStorage.getItem(user_loged+'_inf'));
                
        // actualizo el box de datos de usuario
        showUserInformation(user_Information);
        
        // cierro el formulario
        document.getElementById('personal_datas').style.display = 'None';
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // muestro la informacion del usuario almacenada en el storage.
    showUserInformation(user_Information)
});