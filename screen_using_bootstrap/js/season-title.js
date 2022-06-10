var title;

$(document).ready(function(){
    var address = unescape(location.href);
    if(address.indexOf("Season", 0) != -1) {
        title = address.substring(address.indexOf("Season", 0)+7);
        $("#title>.h3:last").text(title);
    }
    
});
