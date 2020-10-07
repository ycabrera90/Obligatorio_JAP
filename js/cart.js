let myBoughtaArticles;                  // variable que va a almacenar lo leido en el json para evitar lecturas innecesarias

function showMyBoughtaArticles(articles){
    let htmlContentToAppend = "";
    myBoughtaArticles = articles

    for(let i = 0; i < myBoughtaArticles.length; i++){
    htmlContentToAppend += `
        <tr>
          <th scope="row"><img src="`+ myBoughtaArticles[i].src +`" alt="..." class="img-thumbnail" style="max-width: 150px;"></th>
          <td>`+ myBoughtaArticles[i].name +`</td>
          <td>`+ myBoughtaArticles[i].currency +` `+ myBoughtaArticles[i].unitCost +`</td>
          <td>
            <input type="number" min="1" max="1000"  class="form-control text-dark bg-white" id="count`+i+`" name="sup" value="`+myBoughtaArticles[i].count+`" onclick="javascript:updateMyBill('count',`+i+`)" style="width: 70px;" onkeyup="javascript:updateMyBill('count',`+i+`)"></input>
          </td>
          <td><strong > `+ myBoughtaArticles[i].currency +` <span id="subTotal`+i+`">`+ myBoughtaArticles[i].unitCost*myBoughtaArticles[i].count +`</span> </strong></td>
          <th scope="row"><img src="img/delete.jpg" alt="..." class="img-circle" style="max-width: 30px;" onclick="javascript:updateMyBill('del',`+i+`)"></th>
        </tr>
    ` 
    }
    htmlContentToAppend += `<tr><th scope="row"></th><td></td><td></td><td></td><td></td></tr>`
    document.getElementById("myBoughtProducts").innerHTML = htmlContentToAppend;
}

function readTipoEnvio(){
    // leo el tipo de envio seleccionado por el cliente de los radio button
    let tiposDeEnvio = document.getElementsByName('tipo_envio');
        let costTipoDeEnvio = 0;
        for(let i = 0; i < tiposDeEnvio.length; i++){
            if (tiposDeEnvio[i].checked){costTipoDeEnvio = tiposDeEnvio[i].value}
        }
    //console.log(costTipoDeEnvio)
    return costTipoDeEnvio
}

function computeSubtotal(){
    let subtotal = 0
    for(let i = 0; i < myBoughtaArticles.length; i++){
        let UYUunitCost = myBoughtaArticles[i].unitCost;
        if(myBoughtaArticles[i].currency === 'USD'){UYUunitCost = myBoughtaArticles[i].unitCost *40}    // si la moneda es USD conviero a UYU
        subtotal += UYUunitCost*myBoughtaArticles[i].count;
    }
    return Math.round(subtotal)
}

function updateMyBill(atrib=false,art=false){

    // detecto si se llama a la funcion por algun cambio en la cantidad
    if(atrib||art){
        // detecto si se presiono elimiar
        if (atrib === 'del'){
            // elimino el producto seleccionado
            myBoughtaArticles.splice(art,1)
            showMyBoughtaArticles(myBoughtaArticles)
        }
        else{
            // actualizo la cantidad en el articulo cambiado
            myBoughtaArticles[art][atrib] = document.getElementById('count'+art+'').value;

            // actualizo el subtotal por articulos
            document.getElementById('subTotal'+art+'').innerHTML = myBoughtaArticles[art].unitCost * myBoughtaArticles[art].count;
        }   
    }        

    // actualizo el subtotal general multiplicando cada articulo por su correspondiente cantidad
    document.getElementById('subTotal').innerHTML = computeSubtotal();
        
    // actualizo el costo de envio aplicando el correspondiente % al subtotal.
    document.getElementById('costoDeEnvio').innerHTML = Math.round(computeSubtotal() * readTipoEnvio());

    // actualizo el total de la cuenta
    document.getElementById('total').innerHTML = Math.round(computeSubtotal() * (1 + readTipoEnvio()));
        
}

function buy(){
    // leo variables de los capos de dato de envio
    direccion = document.getElementById('street').value;
    esquina = document.getElementById('corner').value;
    casa = document.getElementById('apto').value;

    // detecto si la compra tiene retiro en el local
    if (!(readTipoEnvio()==0)){
        console.log('primero')
        // chequeo si existen campos vacios en los datos del envio
        if(!(direccion&&esquina&&casa)){
            // alerto sobre la falta de datos
            document.getElementById('alert').innerHTML = `<p style="text-align: center; margin-top: 7px; font-size: 17px;
            color: red;">Debe completar todos los datos de envío</p>`;
        }
        else{
            // escribo el msg del jon
            getJSONData(CART_BUY_URL).then(function(resultObj){if (resultObj.status === "ok"){
                document.getElementById('alert').innerHTML = `<p style="text-align: center; margin-top: 7px; font-size: 17px;
                color: blue;">`+resultObj.data.msg+`</p>`
            }});
        }
    }
    else{
        // escribo el msg del jon
        getJSONData(CART_BUY_URL).then(function(resultObj){if (resultObj.status === "ok"){
            document.getElementById('alert').innerHTML = `<p style="text-align: center; margin-top: 7px; font-size: 17px;
            color: blue;">`+resultObj.data.msg+`</p>`
        }});
    }
    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showMyBoughtaArticles(resultObj.data.articles);         // muestro los articulos
            updateMyBill();
        }
    });
});