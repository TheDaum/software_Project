
   const clothesName =document.getElementById('basic-addon1');
   const clothesCloset = document.getElementById('closetChoice');
   const clothesCategory = document.getElementById('categoryChoice');
   const clothesBuy = document.getElementById('buyDate');
   const clothesSeason = document.getElementById('seasonChoice');
   const multipartfile = document.getElementById('inputGroupFile02');
   var clothesUser;
   var result=[];
    var idd;
  $(document).ready(async function(){
    userId=location.href
    if(userId.indexOf("id",0)!=-1){
        Id = userId.substring(userId.indexOf("id",0)+3);
        console.log(Id)

    }
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        console.log(idd) 
        clothesUser=data[Id-1].userEmail
        console.log(clothesUser)
    
    });
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
    },500)
    
  });


$("#save-clothes-btn").click(async function () {
  console.log("clotehs");
  const uploadfile = multipartfile.files[0];
  const formData = new FormData()
  formData.append('file',uploadfile)
  console.log(uploadfile);
  try {
    let res = await axios({
       method: 'POST',
       url: 'http://localhost:8080/clothes',
       data: {
          clothesUser: clothesUser,
          clothesName: clothesName.value,
          clothesCloset: clothesCloset.value,
          clothesCategory: clothesCategory.value,
          clothesBuy: clothesBuy.value,
          clothesSeason: clothesSeason.value
       },
    });
    let res2 = await axios({
      method: 'POST',
      url: 'http://localhost:8080/boardPicture',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
    }
  });
