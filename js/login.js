var index;

$("#logincheck").click(async function () {

  axios.get('http://localhost:8080/user').then((Response) => {
    data = Response.data;
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].userEmail);
      if ($("#exampleInputEmail").val() == data[i].userEmail) {
        index = i;

        break;
      }

    }
    if(data[index].userPwd==$("#exampleInputPassword").val()){
        location.href="index.html?id="+data[index].id;
    }
  }
  )
});
