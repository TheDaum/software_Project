

var state=false;
var checkError=0;
var userEmail;

$("#registerAccount").click(async function () {
  
  axios.get('http://localhost:8080/user').then((Response)=>{
  data=Response.data;
  for(var i = 0;i<data.length;i++){
    if($("#exampleInputEmail").val()==data[i].userEmail){
      state=false;
      alert("이미 존재하는 이메일 입니다.");
      break;
    }
    //이메일 주소 확인하기
    else if(!checkIt($("#exampleInputEmail"))){
      alert("이메일형식이 올바르지 않습니다.");

      $("#exampleInputEmail").focus();
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
    
      $("#registerAccount").attr("href","login.html");
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
  }

});

function checkIt(email){
  var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if(exptext.test(email.val())==false){

    //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우			

   

    return false;
    }
  return true;
}