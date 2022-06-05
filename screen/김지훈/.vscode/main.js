var id;
var deleteTarget;

$('#logout').click(function () {
    logout();
});

$('#all_clothes').click(function () {
    show_all();
});

$('#closet_detail').click(function () {
    closet()
});

$('#category').click(function () {
    category();
});

$('#add_clothe').click(function () {
    add_clothe();
});

$('.box_area:nth-child(5)>.carousel>.carousel-inner>.carousel-item>.button_box').click(function () {
    location.href = "카테고리.html?tab=" + escape($(this).find("span").text());
});
$('.box_area:nth-child(8)>.carousel>.carousel-inner>.carousel-item>.button_area>.closet_button').click(function () {
    if ($(this).find("span").text()!=0){
        var address = "옷장_detail.html?tab=" + escape($(this).find("span").text());
        location.href = address;
    }
});
//옷장 추가 - 저장을 누르면
$("#exampleModal>.modal-dialog>.modal-content>.modal-footer>.btn").click(function(){
    var cur_html = $("#carouselExampleDark2>.carousel-inner").html();
    var title = $("#exampleModal>.modal-dialog>.modal-content>.modal-body>.mb-3>#recipient-name").val();
    // 페이지를 추가해야하는 경우
    if($("#carouselExampleDark2>.carousel-inner>.carousel-item:last-of-type>.button_area").length>=3){
        cur_html= cur_html + '<div class="carousel-item " data-bs-interval="10000"><div class="button_area"><button class="closet_button"><div class="circle"><p class="check_mark">&#10004</p></div><span>'+title+'</span></button><button class="delete_closet" data-bs-toggle="modal" data-bs-target = "#deleteModal"><img src="../icons8-폐물-30.png" /></button></div></div>';
        $("#carouselExampleDark2>.carousel-inner").html(cur_html);
        var carousel_indicator_html = $('#carouselExampleDark2>.carousel-indicators').html();
        var slide_num = parseInt($('#carouselExampleDark2>.carousel-indicators>button').length);
        carousel_indicator_html = carousel_indicator_html + '<button type="button" data-bs-target="#carouselExampleDark2" data-bs-slide-to="'+String(slide_num)+'"aria-label="Slide '+String(slide_num+1)+'"></button>';
        $('#carouselExampleDark2>.carousel-indicators').html(carousel_indicator_html);
        
    }

    else{
        cur_html = $("#carouselExampleDark2>.carousel-inner>.carousel-item:last-of-type").html();
        cur_html = cur_html + '<div class="button_area"><button class="closet_button"><div class="circle"><p class="check_mark">&#10004</p></div><span>'+title+'</span></button><button class="delete_closet" data-bs-toggle="modal" data-bs-target = "#deleteModal"><img src="../icons8-폐물-30.png" /></button></div>';
        $("#carouselExampleDark2>.carousel-inner>.carousel-item").html(cur_html);
    }
    // 기본옷장으로 지정하는 경우
    if($("#flexCheckDefault").is(":checked")){
        var btn1 = $("#carouselExampleDark2>.carousel-inner>.carousel-item:first-of-type>.button_area:first-of-type>.closet_button>span");
        var btn2 = $("#carouselExampleDark2>.carousel-inner>.carousel-item:last-of-type>.button_area:last-of-type>.closet_button>span");
        var tmp = btn1.text().slice(0,-4);
        btn1.text(btn2.text()+"(기본)");
        btn2.text(tmp);  
    }
    $('.box_area:nth-child(8)>#carouselExampleDark2>.carousel-inner>.carousel-item>.button_area>.delete_closet').click(function () {
        var deleteTarget=$(this).parent().children(".closet_button").children('span');
        $("#deleteMessage").text(deleteTarget.text()+"을(를) 삭제하시겠습니까?");
    });
    $('#deleteButton').click(function(){
        console.log(deleteTarget.parent().find('.button_area'));
        console.log(deleteTarget.parent().find('.button_area').index(deleteTarget));
    })
    $('.box_area:nth-child(8)>.carousel>.carousel-inner>.carousel-item>.button_area>.closet_button').click(function () {
        if ($(this).find("span").text()!=0){
            var address = "옷장_detail.html?tab=" + escape($(this).find("span").text());
            location.href = address;
        }
    });
});
// 옷장삭제를 누르면
$('.box_area:nth-child(8)>#carouselExampleDark2>.carousel-inner>.carousel-item>.button_area>.delete_closet').click(function () {
    deleteTarget=$(this).parent();
    $("#deleteMessage").text(deleteTarget.children(".closet_button").children('span').text()+"을(를) 삭제하시겠습니까?");
});
$('#deleteButton').click(function(){
    console.log(deleteTarget.parent().find('.button_area'));
    console.log(deleteTarget.parent().find('.button_area').index(deleteTarget));
})
function logout() {
    location.replace("../../1차screen/메인new.html");
}
$('.bi').click(function () {
    
});
function show_all() {
    location.href = "전체옷.html";
}

function closet() {
    location.href = "옷장_detail.html";
}

function category() {
    location.href = "카테고리.html";
}

function add_clothe() {
    location.href = "옷추가.html";
}