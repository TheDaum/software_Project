var param = "";

$(document).ready(function(){
    var address = unescape(location.href);
    if(address.indexOf("tab", 0) != -1) {
        param = address.substring(address.indexOf("tab", 0) + 4);
        $('.title').text(param);
    }
    
});


