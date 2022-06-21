var title;

$(document).ready(function(){
    var address = unescape(location.href);
    if(address.indexOf("category", 0) != -1) {
        title = address.substring(address.indexOf("category", 0)+9);
        $("#title>.h3:last").text(title);
    }
    
});
