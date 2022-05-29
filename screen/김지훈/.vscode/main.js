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
// 옷장삭제를 누르면
$('.box_area:nth-child(8)>.carousel>.carousel-inner>.carousel-item>.button_area>.delete_closet').click(function () {
    deleteTarget=$(this).parent().children("button.closet_button").children('span');
    $("#deleteMessage").text(deleteTarget.text()+"을(를) 삭제하시겠습니까?");
});
$('#deleteButton').click(function(){
    deleteTarget.text("");
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