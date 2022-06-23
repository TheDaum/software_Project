var userId;
var totalObj;
var Id;
var clothesarr = [];
var imagearr = [];
var totalobj;
var totalName;
var totalClosets;
var totalCategoryS;
var totalBuys;
var totalSeasons;
var closetUser;
var closetName;
var priority;
var result=[];
var idd;
var userEmail;
var prevpagetype
$(document).ready(function(){
    userId = location.href
    

    if (userId.indexOf("id", 0) != -1) {
        Id = userId.substring(userId.indexOf("id", 0) + 3,userId.indexOf("&", 0));
        
    }

    var address = unescape(location.href);
console.log(userId)
    if(address.indexOf("category",0)!=-1){
        prevpagetype=0;
    }
    else if(address.indexOf("Season",0)!=-1){
        prevpagetype=1;
    }
    else if(address.indexOf("name",0)!=-1){
        prevpagetype=2;
    }
    if(address.indexOf("clothesId", 0) != -1) {
        var txt = userId.substring(userId.indexOf("clothesId", 0)+10);
        
    }
    
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        console.log(data[0].userEmail); 
       
        userEmail = data[Id-1].userEmail;
        console.log(data[0].userEmail);
    });

    axios.get('http://localhost:8080/clothes').then((Response) => {
        data = Response.data;

        for (var i = 0; i < data.length; i++) {
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
                console.log(clothesobj)
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
                
                if(clothesarr[i].clothesId==txt&&imagearr[j].imageId==txt){
                    totalobj={
                        totalId: clothesarr[i].clothesId,
                        totalName: clothesarr[i].clothesName,
                        totalCategoryS : clothesarr[i].clothesCategory,
                        totalClosets : clothesarr[i].clothesCloset,
                        totalSeasons : clothesarr[i].clothesSeason,
                        totalBuys : clothesarr[i].clothesBuy,
                        totalPath: imagearr[j].imagepath,
                    }
                    console.log(totalobj);
                    
                
                }else{
                    console.log("error")
                }
                
         }
        }
        
        axios.get('http://localhost:8080/closet').then((Response) => {
            data = Response.data;
            
            for(var i = 0;i<data.length;i++){
                if(userEmail==data[i].closetUser){
                  result.push(data[i].closetName);
                }
                
            }console.log(result.length)
        
        });
    },200);
    setTimeout(function(){
        console.log(result)
    },400)
        //closet들의 배열
        setTimeout(function(){
        for(var i=0;i<result.length;i++){
            console.log("1")
            var option = document.createElement("option");
            $(option).val(result[i]);
            $(option).text(result[i]);

            $("#closetdetail").append(option);
        }
    
        //이미지 경로 넣기
        },500);
        setTimeout(function(){
        console.log(totalobj)
        $("#name").val(totalobj.totalName);
        $("#closetdetail").val(totalobj.totalClosets);
        $("#categoryChoice").val(totalobj.totalCategoryS);
        $("#clothesDate").val(totalobj.totalBuys);
        $("#seasonChoice").val(totalobj.totalSeasons);
        $("#detail-image").attr("src","http://localhost:8080/"+totalobj.totalPath)
        },1000);

        $("#btn-del-clothe").click(function(){
            console.log(prevpagetype)
            if(prevpagetype==0){
                window.location.href = "categories.html"+userId.substring(userId.indexOf("?id",0),userId.indexOf("&?clothesId",0));
            }
            else if(prevpagetype==1){
                window.location.href = "season.html"+userId.substring(userId.indexOf("?id",0),userId.indexOf("&?clothesId",0));
            }
            else if(prevpagetype==2){
                window.location.href = "closet.html"+userId.substring(userId.indexOf("?id",0),userId.indexOf("&?clothesId",0));
            }
        });
     
});
