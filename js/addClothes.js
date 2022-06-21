
   const clothesName =document.getElementById('basic-addon1');
   const clothesCloset = document.getElementById('closetChoice');
   const clothesCategory = document.getElementById('categoryChoice');
   const clothesBuy = document.getElementById('buyDate');
   const clothesSeason = document.getElementById('seasonChoice');
   const multipartfile = document.getElementById('inputGroupFile02');

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
