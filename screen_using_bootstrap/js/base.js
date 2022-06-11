// base

var closets = ["closet1","closet2","closet3"];
var target;
$(document).ready(function(){
    //closet 버튼 출력
    print_closet();
    //collapse-item href 설정
    $("#collapseCategory>.collapse-inner>.collapse-item").each(function (index, item) {
       
        $(item).attr("href","categories.html?category="+escape($(this).text()));
    
    });

    $("#collapseSeason>.collapse-inner>.collapse-item").each(function (index, item) {
       
        $(item).attr("href","season.html?Season="+escape($(this).text()));
    
    });

    $("#collapseCloset>.collapse-inner>.collapse-item").each(function (index, item) {
       
        $(item).attr("href","closet.html?name="+escape($(this).text()));
    
    });

    $("#collapseCloset>.collapse-inner>.d-flex>.collapse-item").each(function (index, item) {
       
        $(item).attr("href","closet.html?name="+escape($(this).text()));
    
    });

    

});

function print_closet(){
    var inner = $("#collapseCloset>.collapse-inner");
    var item = document.createElement("a");
    item.className = "collapse-item";
    var text = closets[0]+"(기본)";
    item.innerText = text;    
    inner.children("hr").before(item);
    
    for(var i = 1;i<closets.length;i++){
        var d_flex = document.createElement("div");
        d_flex.classList.add("d-flex");
        inner.children("hr").before(d_flex);
        d_flex = inner.children("hr").prev();

        var w_100 = document.createElement("a");
        w_100.classList.add("w-100");
        w_100.classList.add("collapse-item");
        w_100.innerText = closets[i];
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

        var del = document.createElement("a");
        del.classList.add("dropdown-item");
        del.classList.add("btn-del");
        $(del).attr("href","#");
        $(del).attr("data-toggle","modal");
        $(del).attr("data-target","#deleteClosetModalToggle");
        del.innerText = "삭제";
        dropdown_menu.append(del);

        $(".btn-edit").click(function(){        
            target = $(this).parent().parent().prev().text();
            console.log($("#closetName-edit"));
            $("#closetName-edit").val(target);
        });

        $(".btn-del").click(function(){        
            target = $(this).parent().parent().prev().text();
            var text = "옷장 "+ target + " 을(를) 삭제하시겠습니까?"
            $("#text-del").text(text);
        });

    }
    
}

$("#save-btn").click(function(){
    var text = $("#closetName").val();
    if($("#default_closet_checkbox").is(":checked")){
        closets.unshift(text);
    }

    else{
        closets.push(text);
    }

    // 입력 초기화
    $("#closetName").val("");
    $("#default_closet_checkbox").prop("checked", false);
    //서버에 업데이트 필요
    // location.reload();
});

$("#save-btn-del").click(function(){
    closets = closets.filter(function(item) {
        return item !== target;
    });
    
    //서버에 업데이트 필요
    location.reload();
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
for(var i = 0;i<closets.length;i++){
    var item = document.createElement("option");
    $(item).attr("value",closets[i]);
    $(item).text(closets[i]);
    $("#closetChoice").append(item);

}
// end of base