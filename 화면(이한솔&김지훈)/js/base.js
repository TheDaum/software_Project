
const editClosetName=document.getElementById('closetName-edit11')
var delcloset;
var closetarr=[];
const closetName = document.getElementById('closetName111');
var closets=[]
var target;
var userId
var Id;
var userName
var userEmail
$(document).ready(async function(){
    userId=location.href
    if (userId.indexOf("id", 0) != -1) {
        Id = userId.substring(userId.indexOf("id", 0) + 3);
        
        if(Id.indexOf("&",0)!=-1){
            Id = Id.substring(0,Id.indexOf("&", 0));
        }
    }
    console.log(Id);
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;

        userEmail=data[Id-1].userEmail,
        userName=data[Id-1].userName

    
    })
    axios.get('http://localhost:8080/closet').then((Response) => {
        data = Response.data;
        for(var i = 0;i<data.length;i++){
            if(userEmail==data[i].closetUser){
              closets.push(data[i].closetName);
            }
            
        }
        console.log(closets);
    
    })



    $("#home-btn").attr("href","index.html?id="+Id);
  

    //closet 버튼 출력
    setTimeout(function(){
        print_closet();
    },100);
    console.log("이건?");
    //collapse-item href 설정
    $("#collapseCategory>.collapse-inner>.collapse-item").each(function (index, item) {

       
        $(item).attr("href","categories.html"+"?id="+Id+"&?category="+escape($(this).text()));

    
    });

    $("#collapseSeason>.collapse-inner>.collapse-item").each(function (index, item) {
        $(item).attr("href","season.html"+"?id="+Id+"&?Season="+escape($(this).text()));
    
    });

    $("#collapseCloset>.collapse-inner>.collapse-item").each(function (index, item) {
       
        $(item).attr("href","closet.html"+"?id="+Id+"&?name="+escape($(this).text()));
    
    });

    

    $("#btn-search").click(function () {
        $("#btn-search").attr("href","search.html"+"?id="+Id+"&?key="+escape($("#text-search").val()));
    
    });
    
    $("#home-btn").click(function(){
        $("#home-btn").attr("href","index.html?id="+Id);
    });
});



function print_closet(){
    var inner = $("#collapseCloset>.collapse-inner");
    for(var i = 0;i<closets.length;i++){
        var d_flex = document.createElement("div");
        d_flex.classList.add("d-flex");
        inner.children("hr").before(d_flex);
        d_flex = inner.children("hr").prev();

        var w_100 = document.createElement("a");
        w_100.classList.add("w-100");
        w_100.classList.add("collapse-item");
        w_100.innerText = closets[i];
        $(w_100).attr("href","closet.html"+"?id="+Id+"&?name="+escape($(w_100).text()));
        if(i==0){
            w_100.innerText+="(기본)"
        }
        d_flex.append(w_100);

        var dropdown = document.createElement("div");
        dropdown.classList.add("flex-shrink-1");
        dropdown.classList.add("collapse-item");
        dropdown.classList.add("dropdown");
        dropdown.classList.add("no-arrow");
        d_flex.append(dropdown);
        dropdown = d_flex.children(".dropdown");

        var dropdown_toggle = document.createElement("a");
        dropdown_toggle.classList.add("dropdown-toggle");
        $(dropdown_toggle).attr("href","#");
        $(dropdown_toggle).attr("role","button");
        $(dropdown_toggle).attr("id","dropdownCloset");
        $(dropdown_toggle).attr("data-toggle","dropdown");
        $(dropdown_toggle).attr("aria-haspopup","true");
        $(dropdown_toggle).attr("aria-expanded","false");
        dropdown.append(dropdown_toggle);
        dropdown_toggle = dropdown.children(".dropdown-toggle");

        var fas = document.createElement("i");
        fas.classList.add("fas");
        fas.classList.add("fa-ellipsis-v");
        fas.classList.add("fa-sm");
        fas.classList.add("fa-fw");
        fas.classList.add("text-gray-400");
        dropdown_toggle.append(fas);

        var dropdown_menu = document.createElement("div");
        dropdown_menu.classList.add("dropdown-menu");
        dropdown_menu.classList.add("dropdown-menu-right");
        dropdown_menu.classList.add("shadow");
        dropdown_menu.classList.add("animated--fade-in");
        $(dropdown_menu).attr("aria-labelledby","dropdownCloset");
        dropdown.append(dropdown_menu);
        dropdown_menu = dropdown.children(".dropdown-menu");

        var dropdown_header = document.createElement("div");
        dropdown_header.classList.add("dropdown-header");
        dropdown_header.innerText = "메뉴";
        dropdown_menu.append(dropdown_header);

        var edit = document.createElement("a");
        edit.classList.add("dropdown-item");
        edit.classList.add("btn-edit");
        $(edit).attr("href","#");
        $(edit).attr("data-toggle","modal");
        $(edit).attr("data-target","#editClosetModalToggle");
        edit.innerText = "수정";
        dropdown_menu.append(edit);

        if (i != 0) {
            var del = document.createElement("a");
            del.classList.add("dropdown-item");
            del.classList.add("btn-del");
            $(del).attr("href", "#");
            $(del).attr("data-toggle", "modal");
            $(del).attr("data-target", "#deleteClosetModalToggle");
            del.innerText = "삭제";
            dropdown_menu.append(del);
        }
        

    }
    $("#userName").text(userName);
    $("#btn-profile").click(function(){
        $("#firstName").val(userName[0]);
        $("#lastName").val(userName.substring(1));
        $("#email").val(userEmail);
    });
    $(".btn-edit").click(function(){        
        target = $(this).parent().parent().prev().text();
        // '(기본)'문자열이 포함되어 있으면 제거한다.
        console.log(target)

        axios.get('http://localhost:8080/closet').then((Response) => {
            data = Response.data;
            for(var i = 0;i<data.length;i++){
                if(userEmail==data[i].closetUser&&target==data[i].closetName){
                    editcloset=data[i].id
                    console.log(editcloset)
                 }
                  
            
             
        
            }
            } );
        
        var form_check = $("#editCheck");
        var check_box = document.createElement("input");
        check_box.classList.add("form-check-input");
        $(check_box).attr("type","checkbox");
        if(target.indexOf("(기본)")!=-1){
            $(check_box).attr("disabled",true);
            $(check_box).attr("checked",true);
            target = target.replace("(기본)","");
        }
        $("#closetName-edit").val(target);
        $("#editText").before(check_box);
        console.log($("#default_closet_checkbox"));
        
        $("#save-btn").click(async function(){
            console.log(target)
            try {
                let res = await axios({
                   method: 'PUT',
                   url: 'http://localhost:8080/closet/'+editcloset,
                   data: {
                        closetUser: userEmail,
                        closetName: editClosetName.value
                        
                   },
                });
              } catch (err) {
                console.log(err);
                throw new Error(err);
              }
        
        
            location.reload();
    

        });
    });

    $(".btn-del").click(function(){        
        target = $(this).parent().parent().prev().text();
        var text = "옷장 "+ target + " 을(를) 삭제하시겠습니까?"
        $("#text-del").text(text);

        axios.get('http://localhost:8080/closet').then((Response) => {
        data = Response.data;
        for(var i = 0;i<data.length;i++){
            if(userEmail==data[i].closetUser&&target==data[i].closetName){
                delcloset=data[i].id
             }
              
            
         
    
        }
        } );

        $("#save-btn-del-closet").click(async function(){
            console.log(delcloset)    
            console.log(target)
            try {
                let res = await axios({
                   method: 'DELETE',
                   url: 'http://localhost:8080/closet/'+ delcloset,
                   data: {
                        
                   },
                });
              } catch (err) {
                console.log(err);
                throw new Error(err);
              }
        
        
            location.reload();
        });
    });
}

$("#save-btn").click(async function () {
    console.log(userEmail)
    console.log(closetName.value)
    try {
      let res = await axios({
         method: 'POST',
         url: 'http://localhost:8080/closet',
         data: {
            closetUser: userEmail,
            closetName: closetName.value
         },
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
    
    // 입력 초기화
    $("#closetName111").val("");
    $("#default_closet_checkbox").prop("checked", false);
    location.reload()
    // 같은이름이 있으면
    // if(1){
    //     alert("이미 존재하는 이름입니다.");
    // }
    
    // else
    //서버에 업데이트 필요
    // location.reload();
});



$("#save-btn-clothe-del").click(function(){
    closets = closets.filter(function(item) {
        return item !== target;
    });
    
    //서버에 업데이트 필요
    history.back();
});

$("#addClotheBtn").click(function(){
    for(var i = 0;i<closets.length;i++){
        var item = document.createElement("option");
        $(item).attr("value",closets[i]);
        $(item).text(closets[i]);
        $("#closetChoice").append(item);

    }

});

// end of base
$("save-btn-edit").click(function(){
    
    

});