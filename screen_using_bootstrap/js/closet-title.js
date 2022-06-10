var title;

$(document).ready(function(){
    var address = unescape(location.href);
    if(address.indexOf("name", 0) != -1) {
        title = address.substring(address.indexOf("name", 0)+5);
        $("#title>.h3:last").text(title);
    }
    
});
