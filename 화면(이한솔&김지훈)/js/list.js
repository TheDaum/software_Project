var result_num = 10;
var remainder = result_num%9;
var page_num = parseInt(result_num/9)+1;
var result_index = 0;

var current_page=1;
var userId
var userEmail
var clothesIden;
var clothesarr=[];
var categoriesName;


$(document).ready(async function(){
    userId=location.href
    if(userId.indexOf("id",0)!=-1){
        Id = userId.substring(userId.indexOf("id",0)+3);
    }
    
    console.log(Id);    
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        setTimeout(function(){
            console.log(Id)
        },5);
        userEmail=data[Id].userEmail
    
    });

    axios.get('http://localhost:8080/clothes').then((Response) => {
        data = Response.data;
        for(var i = 0;i<data.length;i++){
            if(userEmail==data[i].clothesUser){
                clothesIden=data[i].Id

                axios.get('http://localhost:8080/boardPicture').then((Response) => {
                    data1 = Response.data;  
                    for(var j=0; j<data1.length;j++){
                        if(clothesIden==data1[j].Id){
                            var clothesobj={
                                clothesId: clothesIden,
                                clothesName : data[i].clothesName,
                                clothesCloset : data[i].clothesCloset,
                                clothesCategory : data[i].clotheCategory,
                                clothesBuy: data[i].clothesBuy,
                                clothesSeason: data[i].clothesSeason,
                                clothesImage: data1[i].filePath
                            }
                            console.log(clothesobj)
                            clothesarr.push(clothesobj)
                        }
                    }
                });
                
                
            }
            
            
        }
        
    
    })
    console.log(clothesarr)

});

$(document).ready(function(){
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

            var title = document.createElement("h5");
            title.className = "card-title";
            title.innerText = "옷 설명";
            card.append(title);
            
            var button = document.createElement("a");
            // button.attr("href", "#");
            button.classList.add("btn");
            button.classList.add("btn-danger");
            button.innerText = "show details";
            $(button).attr("href","detail.html");
            card.append(button);
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