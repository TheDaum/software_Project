const SEARCHKEY = {
    0:"NAME",
    1:"CLOSET",
    2:"CATEGORY",
    3:"DATE",
    4:"SEASON"
};

var result = [2,3,4,5,6];
var card_num=0;
var remainder;
var page_num;

//옷 정보를 불러오는데 사용되는 index
var title_index = 0;
var result_index=0;

var current_page=1;

$(document).ready(function(){
    for(var i =0;i<5;i++){
        var num=result[i]
        while(num%3!=0){
            num++;
        }
        card_num+=num;
    }
    remainder = card_num%9;
    page_num = parseInt(card_num/9)+1;
    var ul = $(".pagination");
    for(var i = 0;i<page_num;i++){
        if (i==0){
            continue;
        }
        var li = document.createElement("li");
        li.className = "page-item";
        ul.children(".page-item:last").before(li);
        
        var a = document.createElement("a");
        a.className = "page-link";
        a.innerText = String(i+1); 
        li.append(a);

        $(".pagination>.page-item:last").removeClass("disabled")

        $(".page-link").click(function(){
            $(".container-fluid").empty();

            var request_page = $(this).text();
            
            $(".pagination>.page-item:first").removeClass("disabled");
            $(".pagination>.page-item:last").removeClass("disabled");
        
            if(request_page == 1){
                $(".pagination>.page-item:first").addClass("disabled");
            }
            else if(request_page == parseInt(page_num)){
                $(".pagination>.page-item:last").addClass("disabled");
            }
            $(".pagination>.page-item").eq(current_page).removeClass("active");
            $(".pagination>.page-item").eq(request_page).addClass("active");

            print_card(request_page);
            current_page=request_page;

        });
        
    }
;
    print_card(1);
});



function print_card(page_index){
    if (page_index == page_num){
        return print_card_last();
    }
    

    

    var container = $(".container-fluid");
    
    for(var i = 0; i < 3 ;i++){
        if (result_index == 0 || i == 0) {
            var title_area = document.createElement("div");
            title_area.classList.add("d-sm-flex");
            title_area.classList.add("align-items-center");
            title_area.classList.add("justify-content-start");
            title_area.classList.add("mb-4");
            $(".container-fluid").append(title_area);

            var title = document.createElement("h1");
            title.classList.add("h3");
            title.classList.add("mb-0");
            title.classList.add("text-gray-800");
            title.innerText = "Search for " + SEARCHKEY[title_index];
            title_area.append(title);
        }
        var row = document.createElement("div");
        row.className = "row";
        container.append(row);
        row = container.children(".row").last();
        for(var j = 0;j<3;j++){
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
            $(img).attr("src","/img/background.jpg");
            // img.attr("alt","...");
            shadow.append(img);
            var card = document.createElement("div");
            card.classList.add("card-body");
            shadow.append(card);
            card = shadow.children(".card-body");

            var text = document.createElement("h5");
            text.className = "card-title";
            text.innerText = "옷 설명";
            card.append(text);
            
            var button = document.createElement("a");
            // button.attr("href", "#");
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.innerText = "show details";
            $(button).attr("href","detail.html");
            card.append(button);
            result_index++;

            if(result_index==result[title_index]){
                result_index=0;
                title_index++;
                break;
            }
        }
    }
}
function print_card_last(){
    var container = $(".container-fluid");
    var row_num = parseInt(remainder/3)+1;
    var card_num = 3;
    var last_card_num = remainder-3*(row_num-1);
    for(var i = 0; i < row_num ;i++){  

        var row = document.createElement("div");
        row.className = "row";
        container.append(row);
        row = container.children(".row").last();
        if(i+1==row_num){
            card_num = last_card_num;
        }
        for(var j = 0;j<card_num;j++){
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
            $(img).attr("src","/img/background.jpg");
            
            // img.attr("alt","...");
            shadow.append(img);

            var card = document.createElement("div");
            card.classList.add("card-body");
            shadow.append(card);
            card = shadow.children(".card-body");

            var title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = "옷 설명";
            card.append(title);
            
            var button = document.createElement("a");
            // button.attr("href", "#");
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.innerText = "show details";
            card.append(button);
        }
    }
}

$(".page-link").click(function(){
    $(".container-fluid").empty();
    var request_page = $(this).text();
    
    $(".pagination>.page-item:first").removeClass("disabled");
    $(".pagination>.page-item:last").removeClass("disabled");

    if(request_page == 1){
        $(".pagination>.page-item:first").addClass("disabled");
    }
    else if(request_page == parseInt(page_num)){
        $(".pagination>.page-item:last").addClass("disabled");
    }
    $(".pagination>.page-item").eq(current_page).removeClass("active");
    $(".pagination>.page-item").eq(request_page).addClass("active");

    print_card(request_page);
    current_page=request_page;

});