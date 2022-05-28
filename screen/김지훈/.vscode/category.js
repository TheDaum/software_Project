var param = "";

function selectButton(target){
    $(".btn-light").removeClass('btn-light');
    $(target).addClass('btn-light');
}

$(document).ready(function(){
    var address = unescape(location.href);
    var target;
    if(address.indexOf("tab", 0) != -1) {
        param = address.substring(address.indexOf("tab", 0) + 4);
        if($('.btn-secondary[value="'+param+'"]').length){
            $('.btn-secondary[value="'+param+'"]').trigger('click');
        }
        
        else if($('.dropdown-item:contains("'+param+'")').length){
            $('.dropdown-item:contains("'+param+'")').trigger('click');
        }
    }
    
});

$('.btn-secondary').click(function () {
    selectButton(this);
});

$('.dropdown-item').click(function () {
    var tmp = $('input[name = first-button]').val();
    $('input[name = first-button]').val($(this).text());
    $(this).text(tmp);
    $('input[name = first-button]').trigger('click');
});