
   const clothesName =document.getElementById('basic-addon1');
   const clothesCloset = document.getElementById('closetChoice');
   const clothesCategory = document.getElementById('categoryChoice');
   const clothesBuy = document.getElementById('buyDate');
   const clothesSeason = document.getElementById('seasonChoice');
   const multipartfile = document.getElementById('inputGroupFile02');
   var clothesUser;
   var Id

  $(document).ready(async function(){
    userId=location.href
    if(userId.indexOf("id",0)!=-1){
        Id = userId.substring(userId.indexOf("id",0)+3);
    }
    console.log(Id);    
    axios.get('http://localhost:8080/user').then((Response) => {
        data = Response.data;
        console.log(Id) 
        clothesUser=data[Id].userEmail
        console.log(clothesUser)
    
    })
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
    console.log("clotehs");
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
