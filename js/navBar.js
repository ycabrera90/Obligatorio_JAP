function show_navBar()
{
    display =  document.getElementById('navBar_cel').style.display;
    
    if(!display || (display =='none'))
    {
        document.getElementById('navBar_cel').style.display = 'block';
        console.log('true')
    }
    else{
        document.getElementById('navBar_cel').style.display = 'none';
        console.log('true')
    }
}
