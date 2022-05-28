var param = "";

$(document).ready(function(){
    var address = unescape(location.href);
    console.log(decodeURI(address));
    if(address.indexOf("tab", 0) != -1) {
        param = address.substring(address.indexOf("tab", 0) + 4);
        console.log(param);
        $('.title').text(param);
    }
    
});


