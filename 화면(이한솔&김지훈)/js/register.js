

var state=false;
var checkError=0;
var userEmail;

$("#registerAccount").click(async function () {
  
  axios.get('http://localhost:8080/user').then((Response)=>{
  data=Response.data;
  for(var i = 0;i<data.length;i++){
    console.log(data[i].userEmail);
    if($("#exampleInputEmail").val()==data[i].userEmail){
      state=false;
      alert("이미 존재하는 이메일 입니다.");
      console.log(state);
      console.log('1');
      break;
    }
    else{
      state=true;
    }
  }
  
  if(state==true && $("#exampleInputPassword").val()!=$("#exampleRepeatPassword").val()){

    alert("비밀번호가 다릅니다.");
    state=false;
    console.log('3');
  }
  else{
    state=true;
  }
  }).catch((Error)=>{
  console.log(Error); 
  })

   const name =document.getElementById('exampleFirstName');
   const email = document.getElementById('exampleInputEmail');
   const password = document.getElementById('exampleInputPassword');
   const closet = document.getElementById('exampleClosetName');
  console.log(state);
  console.log('5');
   if(state){
   try {
      let res = await axios({
         method: 'POST',
         url: 'http://localhost:8080/user',
         data: {
            userName: name.value,
            userEmail: email.value,
            userPwd: password.value,
         },
      });
      let res2 = await axios({
        method: 'POST',
         url: 'http://localhost:8080/closet',
         data: {
            closetUser: email.value,
            closetName: closet.value,
         },
      });
    
      console.log(res);
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
  }

});
