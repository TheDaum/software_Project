var userId;
var totalObj;

$(document).ready(function(){
    userId = location.href
    if (userId.indexOf("id", 0) != -1) {
        Id = userId.substring(userId.indexOf("id", 0) + 3,address.indexOf("&", 0));
    }

    var address = unescape(location.href);
    if(address.indexOf("clothesId", 0) != -1) {
        var txt = address.substring(address.indexOf("clothesId", 0)+10);
    }

    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        setTimeout(function () {
            console.log(Id)
        }, 5);
        userEmail = data[Id].userEmail
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
                        totalCategoryS : data[i].clothesCategory,
                        totalClosets : data[i].clothesCloset,
                        totalSeasons : data[i].clothesSeason,
                        totalBuys : data[i].clothesBuy,
                        totalPath: imagearr[j].imagepath,
                    }
                    
                    
                
                }else{
                    console.log("error")
                }
                
         }
        }

        $("#basic-addon1").text(totalName);
        $("#closetChoice").val(totalClosets);
        $("#categoryChoice").val(totalCategoryS);
        $("#clothesDate").val(totalBuys);
        $("#seasonChoice").val(totalSeasons);
        //이미지 경로 넣기
        },100);
});