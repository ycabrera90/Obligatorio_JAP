var products = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showStars(amountStars){
    let htmlContentToAppend = "";
    for(let i = 1; i <= 5; i++){
        if (i <= amountStars){htmlContentToAppend += `<span class="fa fa-star checked"></span>`}
        else{htmlContentToAppend += `<span class="fa fa-star"></span>`}
    }
    return htmlContentToAppend
}

function formatedDateTime(dateTimeraw){
    let dateList = dateTimeraw.split(' ')[0].split('-')
    dateFormated = dateList[2]+'/'+dateList[1]+'/'+dateList[0]
    let hourList = dateTimeraw.split(' ')[1]
    return(dateFormated+` `+hourList)
}
function formatedName(nameRaw){
    //let nameRaw = 'maria_sanchez'
    let nameLetters = [];
    let formatedName = '';
    nameAndLastName = nameRaw.split('_');

    for(let i = 0; i < nameAndLastName.length; i++)
    {
        nameLetters = nameAndLastName[i].split('')
        for(let i = 0; i < nameLetters.length; i++){
            if (i===0){formatedName += nameLetters[i].toUpperCase()}
            else{formatedName += nameLetters[i]}
        }
        formatedName += ' '
    }
    return formatedName
}
function sendComment(){
    let htmlContentToAppend = '';
    let currentDateTime = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
    htmlContentToAppend = showStars(document.getElementById('myScore').value)
    htmlContentToAppend +=`
        <p><span>`+currentDateTime+`</span>: <span>`+ localStorage.getItem('user_loged') +`</span>
        <br>`+document.getElementById('myComment').value+`</p>`
    document.getElementById('comments-list-container').innerHTML += htmlContentToAppend
    document.getElementById('myComment').value = '';        //limpio el área de texto
}
function showRelatedProductos(retaledProductos){
    console.log(retaledProductos)
    //let productsList = [];
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        console.log(retaledProductos)
        if (resultObj.status === "ok"){productsList = resultObj.data;}
        
        console.log(productsList)

        for(let i = 0; i < retaledProductos.length; i++)
        {
            n = retaledProductos[i]         //ubicacion de los productos relacionados en la lista de productos

            // muetro productos relacionados
            let htmlContentToAppend = ''
            htmlContentToAppend += `
            <a class="col-lg-3 col-md-4 col-6" href="product-info.html" style="text-decoration: none; ">
                <div class="d-block mb-4 h-100">
                    <h4>`+productsList[n].name+`</h4>
                    <img class="img-fluid img-thumbnail" src=`+productsList[n].imgSrc+` alt="">
                </div>
            </a>
            `
            document.getElementById('relatedProducts').innerHTML += htmlContentToAppend
        }
        



    });

    



    
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCosttHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
                        
            productNameHTML.innerHTML = products.name;
            productDescriptionHTML.innerHTML = products.description;
            productCosttHTML.innerHTML = products.cost;
            productCurrencyHTML.innerHTML = products.currency;
            productSoldCountHTML.innerHTML = products.soldCount;
            productCategoryHTML.innerHTML = products.category;
            
            // Muestro las imagenes en forma de galería
            showImagesGallery(products.images);

            // muestro productos relacionados
            showRelatedProductos(products.relatedProducts)
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            console.log(comments[0].score)
            // muestro los comentarios
            for(let i = 0; i < comments.length; i++){
                let htmlContentToAppend = ''
                htmlContentToAppend = showStars(comments[i].score)
                htmlContentToAppend +=`
                <p><span>`+formatedDateTime(comments[i].dateTime)+`</span>: <span>`+ formatedName(comments[i].user) +`</span>
                <br>`+comments[i].description+`</p>`
                document.getElementById('comments-list-container').innerHTML += htmlContentToAppend
            }
        }
    });




    

});