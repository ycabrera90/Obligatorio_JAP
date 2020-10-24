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

function ask_for_card_datas(){
    htmlContentToAppend = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="margin-left: 30px;">Datos del pago con tarjeta</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form style="margin-left: 33px;">
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <label for="no_card">Numero de la tarjeta</label>
                        <input type="number" id="no_card" class="form-control" placeholder="1234-5678-0123-45678"  maxlength="19" style="width: 220px;" required>
                        <div class="invalid-feedback" id="no_card_inv_feedback">Inserte su número de tarjeta</div>
                    </div>
                    <div class="col-md-5" style="margin-left: 14px;">
                        <label for="code_card">Codigo de verificacion</label>
                        <input type="number" class="form-control" id="code_card" placeholder="559" maxlength="3" style="width: 80px;" required>
                        <div class="invalid-feedback" id="code_card_inv_feedback">Insete el codigo de su tarjeta</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <label for="date_card">Fecha de vencimiento</label>
                        <input type="number" class="form-control" id="date_card" placeholder="MM/AA" maxlength="5" style="width: 110px;" required>
                        <div class="invalid-feedback" id="date_card_inv_feedback">Inserte la fecha de vencimeinto</div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="javascript:card_data_validation()">Aceptar</button>
        </div>
        </div>
    </div>
    `
    // escribo y muestro el modal
    document.getElementById('cards_data').innerHTML = htmlContentToAppend;
    $('#cards_data').modal('show');

    // desmarco el radiobutton para validar este solo cuando todos los campos esten completos
    document.getElementById('pago_con_tarjeta').checked = false;
}

function ask_for_acount_datas(){
    htmlContentToAppend = `<div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Datos de la cuenta</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
            <div class="col-md-8">
                <label for="inputState">Seleccione su banco</label>
                <select id="acount_datas_bank" class="form-control" style="width: 130px; background-image: none;">
                    <option selected>---</option>
                    <option>Itaú</option>
                    <option>Bandes</option>
                    <option>BBVA</option>
                    <option>BHU</option>
                    <option>BROU</option>
                    <option>HSBC</option>
                    <option>Santander</option>
                    <option>Scotiabank</option>
                    <option>Citibank</option>
                    <option>Heritage</option>
                    <option>FUCEREP</option>
                </select>
                <div class="invalid-feedback" id="acount_datas_bank_inv_feedback">Seleccione su banco</div>
            </div>
            <br>
            <div class="col-md-8 mb-3">
                <label for="validationServer01">Numero de cuenta</label>
                <input type="number" class="form-control" id="acount_datas_bank_number" placeholder="" maxlength="19" style="width: 220px;" required>
                <div class="invalid-feedback" id="acount_datas_bank_number_inv_feedback">Inserte su numero de cuenta</div>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="javascript:acount_data_validation()">Aceptar</button>
        </div>
        </div>
    </div>
    `
    // escribo y muestro el modal
    document.getElementById('acount_data').innerHTML = htmlContentToAppend;
    $('#acount_data').modal('show');

    // desmarco el radiobutton para validar este solo cuando todos los campos esten completos
    document.getElementById('pago_con_transferencia').checked = false;
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
    direccion = document.getElementById('street');
    esquina = document.getElementById('corner');
    casa = document.getElementById('apto');
    formaPago = document.getElementsByName("formaDePago")
    purchaseStatus = true
    htmlContentToAppend = "";

    // detecto si la compra tiene retiro en el local
    if (!(readTipoEnvio()==0)){
        // chequeo si existen campos vacios en los datos del envio
        if(!(direccion.value&&esquina.value&&casa.value)){
            // alerto sobre la falta de datos
            htmlContentToAppend += `<p style="text-align: center; margin-top: 7px; font-size: 17px;
            color: red;">Debe completar todos los datos de envío</p>`;
            purchaseStatus = false
        }

        if(!direccion.value){
            direccion.className = "form-control is-invalid";
        }
        else{
            direccion.className = "form-control is-valid";
        }

        if(!esquina.value){
            esquina.className = "form-control is-invalid";
        }
        else{
            esquina.className = "form-control is-valid";
        }

        if(!casa.value){
            casa.className = "form-control is-invalid";
        }
        else{
            casa.className = "form-control is-valid";
        }

    }

    // detecto si hay seleccionado algún metodo de pago
    if(!(formaPago[0].checked||formaPago[1].checked)){
        // alerto sobre la falta de datos
        htmlContentToAppend += `<p style="text-align: center; margin-top: 7px; font-size: 17px;
        color: red;">Debe seleccionar un método de pago</p>`;
        purchaseStatus = false
    }

    // si estan insertados todos los datos completamos la compra
    if(purchaseStatus){
        // muestro modal de finalizacion de compra
        $('#purchase_status').modal('show');

        // escribo el msg del jon
        getJSONData(CART_BUY_URL).then(function(resultObj){if (resultObj.status === "ok"){
            document.getElementById('message').innerHTML = `<p style="text-align: center; margin-top: 7px; font-size: 17px;
            color: blue;">`+resultObj.data.msg+`</p>`
        }});
    }
    else{
        // muestro mensaje de error
        document.getElementById('alert').innerHTML = htmlContentToAppend;
    }
}

function card_data_validation(){
    data_validation = true;
    
    // detecto campo vacio en el numero de la tarjeta
    if(!document.getElementById('no_card').value){
        data_validation = false;
        document.getElementById('no_card').className = "form-control is-invalid";
        //document.getElementById('no_card_inv_feedback').innerHTML = 'Inserte su número de tarjeta';
    }
    else{
        document.getElementById('no_card').className = "form-control is-valid";
        //document.getElementById('no_card_inv_feedback').innerHTML = '';
    }

    // detecto campo vacio en el codigo de la tarjeta
    if(!document.getElementById('code_card').value){
        data_validation = false;
        document.getElementById('code_card').className = "form-control is-invalid";
        //document.getElementById('code_card_inv_feedback').innerHTML = 'Insete el codigo de su tarjeta';
    }
    else{
        document.getElementById('code_card').className = "form-control is-valid";
        //document.getElementsById('code_card_inv_feedback').innerHTML = '';
    }

    // detecto campo vacio en el vencimiento de la tarjeta
    if(!document.getElementById('date_card').value){
        data_validation = false
        document.getElementById('date_card').className = "form-control is-invalid";
        //document.getElementById('date_card_inv_feedback').innerHTML = 'Insete el codigo de su tarjeta';
    }
    else{
        document.getElementById('date_card').className = "form-control is-valid";
        //document.getElementsById('date_card_inv_feedback').innerHTML = '';
    }

    // detecto si algunos de los campos anteriores no es valido
    if (data_validation){
        document.getElementById('pago_con_tarjeta').checked = true;
        $('#cards_data').modal('hide')
    }
    

}

function acount_data_validation(){
    data_validation = true;
    // detecto que se haya seleccionado un banco
    if (document.getElementById('acount_datas_bank').value === '---'){
        
        data_validation = false;
        document.getElementById('acount_datas_bank').className = "form-control is-invalid";
        //document.getElementById('acount_datas_bank_inv_feedback').innerHTML = 'Seleccione su banco';
    }
    else{
        document.getElementById('acount_datas_bank').className = "form-control is-valid";
        //document.getElementById('acount_datas_bank_inv_feedback').innerHTML = '';
    }
        
    // detecto campo vacio en el numero de cuenta.
    if(!document.getElementById('acount_datas_bank_number').value){
        data_validation = false;
        document.getElementById('acount_datas_bank_number').className = "form-control is-invalid";
        //document.getElementById('acount_datas_bank_number_inv_feedback').innerHTML = 'Insete el codigo de su tarjeta';
    }
    else{
        document.getElementById('acount_datas_bank_number').className = "form-control is-valid";
        //document.getElementsById('acount_datas_bank_number_inv_feedback').innerHTML = '';
    }
  
    // detecto si algunos de los campos anteriores no es valido
    if (data_validation){
        document.getElementById('pago_con_transferencia').checked = true;
        $('#acount_data').modal('hide')
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    //ask_for_card_dates();
    //$('#acount_data').modal('show');
    
    

    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showMyBoughtaArticles(resultObj.data.articles);         // muestro los articulos
            updateMyBill();
        }
    });
});