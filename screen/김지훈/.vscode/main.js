var id;
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
    location.href = "카테고리.html?tab=" + $(this).find("span").text();
});
$('.box_area:nth-child(8)>.carousel>.carousel-inner>.carousel-item>.button_box').click(function () {
    var address = "옷장_detail.html?tab=" + $(this).find("span").text();
    var encodedAddress = encodeURI(address);
    location.href = encodedAddress;
});
function logout() {
    location.replace("../../1차screen/메인new.html");
}

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