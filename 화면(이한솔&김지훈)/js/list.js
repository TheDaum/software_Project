var pageType;

var result_num;
var remainder;
var page_num;
var result_index = 0;

var current_page = 1;
var userId
var userEmail
var clothesIden;
var clothesarr = [];
var categoriesName;
var clothesobj;
var imageobj;
var imagearr = [];
var totalobj;
var totalarr=[];

$(document).ready(async function () {
    userId = location.href
    if (userId.indexOf("id", 0) != -1) {
        Id = userId.substring(userId.indexOf("id", 0) + 3);
    }

    var address = unescape(location.href);
    if(address.indexOf("category", 0) != -1) {
        var txt = address.substring(address.indexOf("category", 0)+9,address.indexOf("&", 0));
        $("#title>.h3:last").text(txt);
        pageType=0;
    }
    else if(address.indexOf("Season", 0) != -1) {
        var txt = address.substring(address.indexOf("Season", 0)+7,address.indexOf("&", 0));
        $("#title>.h3:last").text(txt);
        pageType = 1;
    }
    else if(address.indexOf("name", 0) != -1) {
        var txt = address.substring(address.indexOf("name", 0)+5,address.indexOf("&", 0));
        $("#title>.h3:last").text(txt);
        pageType = 2;
    }

    console.log(Id);
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        setTimeout(function () {
            console.log(Id)
        }, 5);
        userEmail = data[Id].userEmail
        console.log(userEmail)
    });

    axios.get('http://localhost:8080/clothes').then((Response) => {
        data = Response.data;

        for (var i = 0; i < data.length; i++) {
            console.log(data[i].clothesUser)
            if (userEmail == data[i].clothesUser) {

                clothesIden = data[i].id
                clothesNames = data[i].clothesName
                clothesCategoryS = data[i].clothesCategory
                clothesClosets = data[i].clothesCloset
                clothesSeasons = data[i].clothesSeason
                clothesBuys = data[i].clothesBuy

                clothesobj = {
                    clothesId: clothesIden,
                    clothesName: clothesNames,
                    clothesCloset: clothesClosets,
                    clothesCategory: clothesCategoryS,
                    clothesBuy: clothesBuys,
                    clothesSeason: clothesSeasons,
                }
                clothesarr.push(clothesobj)




            }


        }


    });

    axios.get('http://localhost:8080/boardPicture').then((Response) => {
        data = Response.data;

        for (var j = 0; j < data.length; j++) {
            imageobj = {
                imageId: data[j].id,
                imagepath: data[j].filePath
            }
            imagearr.push(imageobj)
        }
    });
    setTimeout(function(){
        
    for(var i=0; i<clothesarr.length;i++){
        for(var j=0; j<imagearr.length;j++){

            if(pageType==0&&clothesarr[i].clothesCategory==txt&&clothesarr[i].clothesId==imagearr[j].imageId){
                totalobj={
                    totalId: clothesarr[i].clothesId,
                    totalName: clothesarr[i].clothesName,
                    totalPath: imagearr[j].imagepath
                }
                totalarr.push(totalobj)
                
            }else if(pageType==1&&clothesarr[i].clothesSeason==txt&&clothesarr[i].clothesId==imagearr[j].imageId){
                totalobj={
                    totalId: clothesarr[i].clothesId,
                    totalName: clothesarr[i].clothesName,
                    totalPath: imagearr[j].imagepath,
                }
                totalarr.push(totalobj)
            }else if(pageType==2&&clothesarr[i].clothescloset==txt&&clothesarr[i].clothesId==imagearr[j].imageId){
                totalobj={
                    totalId: clothesarr[i].clothesId,
                    totalName: clothesarr[i].clothesName,
                    totalPath: imagearr[j].imagepath
                }
                totalarr.push(totalobj)
            }else{
                console.log("error")
            }
            
     }
    }
    },100);
    
    setTimeout(function(){
        result_num=totalarr.length;
        remainder = result_num % 9;
        page_num = parseInt(result_num / 9) + 1;

        var ul = $(".pagination");
    for (var i = 0; i < page_num; i++) {
        if (i == 0) {
            continue;
        }
        var li = document.createElement("li");
        li.className = "page-item";
        ul.children(".page-item:last").before(li);

        var a = document.createElement("a");
        a.className = "page-link";
        a.innerText = String(i + 1);
        li.append(a);

        $(".pagination>.page-item:last").removeClass("disabled")

        $(".page-link").click(function () {
            $(".container-fluid").empty();

            var request_page = $(this).text();

            $(".pagination>.page-item:first").removeClass("disabled");
            $(".pagination>.page-item:last").removeClass("disabled");

            if (request_page == 1) {
                $(".pagination>.page-item:first").addClass("disabled");
            }
            else if (request_page == parseInt(page_num)) {
                $(".pagination>.page-item:last").addClass("disabled");
            }
            $(".pagination>.page-item").eq(current_page).removeClass("active");
            $(".pagination>.page-item").eq(request_page).addClass("active");

            print_card(request_page);
            current_page = request_page;

        });

    }
    
    print_card(1);
        },100);
});

function print_card(page_index) {
    if (page_index == page_num) {
        return print_card_last();
    }
    var result_index = 9 * (page_index - 1);
    var container = $(".container-fluid");

    for (var i = 0; i < 3; i++) {

        var row = document.createElement("div");
        row.className = "row";
        container.append(row);
        row = container.children(".row").last();
        for (var j = 0; j < 3; j++) {
            var area = document.createElement("div");
            area.classList.add("col-xl-4");
            area.classList.add("col-lg-7");
            row.append(area);
            area = row.children(".col-xl-4").last();

            var shadow = document.createElement("div");
            shadow.classList.add("card");
            shadow.classList.add("shadow");
            shadow.classList.add("mb-4");
            area.append(shadow);
            shadow = area.children(".card").last();

            var img = document.createElement("img");
            img.className = "card-img-top";
            img.classList.add("rounded");
            var path = "http://localhost:8080"+totalarr[result_index].totalPath;
            $(img).attr("src", path);

            shadow.append(img);
            var card = document.createElement("div");
            card.classList.add("card-body");
            shadow.append(card);
            card = shadow.children(".card-body");

            var title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = result_index;
            card.append(title);

            var button = document.createElement("a");
            $(button).attr("href", "detail.html?id="+Id+"&?clothesId="+totalarr[result_index++].totalId);
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.innerText = "show details";
            $(button).attr("href", "detail.html");
            card.append(button);
        }
    }
}
function print_card_last() {
    var result_index = 9 * (page_num - 1);
    var container = $(".container-fluid");
    var row_num = parseInt(remainder / 3) + 1;
    var card_num = 3;
    var last_card_num = remainder - 3 * (row_num - 1);
    for (var i = 0; i < row_num; i++) {

        var row = document.createElement("div");
        row.className = "row";
        container.append(row);
        row = container.children(".row").last();
        if (i + 1 == row_num) {
            card_num = last_card_num;
        }
        for (var j = 0; j < card_num; j++) {
            var area = document.createElement("div");
            area.classList.add("col-xl-4");
            area.classList.add("col-lg-7");
            row.append(area);
            area = row.children(".col-xl-4").last();

            var shadow = document.createElement("div");
            shadow.classList.add("card");
            shadow.classList.add("shadow");
            shadow.classList.add("mb-4");
            area.append(shadow);
            shadow = area.children(".card").last();

            var img = document.createElement("img");
            img.classList.add("card-img-top");
            img.classList.add("rounded");
            var path = "http://localhost:8080"+totalarr[result_index].totalPath;
            $(img).attr("src", path);

            shadow.append(img);

            var card = document.createElement("div");
            card.classList.add("card-body");
            shadow.append(card);
            card = shadow.children(".card-body");

            var title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = result_index;
            card.append(title);

            var button = document.createElement("a");
            $(button).attr("href", "detail.html?id="+Id+"&?clothesId="+totalarr[result_index++].totalId);
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.innerText = "show details";
            card.append(button);

        }
    }
}

$(".page-link").click(function () {
    $(".container-fluid").empty();
    var request_page = $(this).text();

    $(".pagination>.page-item:first").removeClass("disabled");
    $(".pagination>.page-item:last").removeClass("disabled");

    if (request_page == 1) {
        $(".pagination>.page-item:first").addClass("disabled");
    }
    else if (request_page == parseInt(page_num)) {
        $(".pagination>.page-item:last").addClass("disabled");
    }
    $(".pagination>.page-item").eq(current_page).removeClass("active");
    $(".pagination>.page-item").eq(request_page).addClass("active");

    print_card(request_page);
    current_page = request_page;

});