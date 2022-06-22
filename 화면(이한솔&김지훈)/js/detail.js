var userId;
var totalObj;
var id;
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
$(document).ready(function(){
    userId = location.href
    

    if (userId.indexOf("id", 0) != -1) {
        id = userId.substring(userId.indexOf("id", 0) + 3,userId.indexOf("&", 0));
        idd=parseInt(id);
        

    }

    var address = unescape(location.href);

    if(address.indexOf("clothesId", 0) != -1) {
        var txt = userId.substring(userId.indexOf("clothesId", 0)+10);
        
    }
    
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        console.log(data[0].userEmail); 
       
        userEmail = data[idd].userEmail;
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
        console.log(totalobj);
        
        axios.get('http://localhost:8080/closet').then((Response) => {
            data = Response.data;
            
            for(var i = 0;i<data.length;i++){
                if(userEmail==data[i].closetUser){
                  result.push(data[i].closetName);
                }
                
            }
        
        });

        //closet들의 배열
        setTimeout(function(){
        for(var i=0;i<result.length;i++){
            var option = document.createElement("option");
            $(option).val(result[i]);
            $(option).text(result[i]);

            $("#closetChoice").append(option);
        }
    },)
        //이미지 경로 넣기
     },100);
        setTimeout(function(){
        console.log('hi')
        $("#name").val(totalobj.totalName);
        $("#closetChoice").val(totalobj.totalClosets);
        $("#categoryChoice").val(totalobj.totalCategoryS);
        $("#clothesDate").val(totalobj.totalBuys);
        $("#seasonChoice").val(totalobj.totalSeasons);
        },700);

     
});