// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
//init chart data - 데베랑 연동 필요
var clotheData = {"상의" : clothesTop,"하의":clothesBottom,"겉옷":clothesOutter};
var clotheDataKey = Object.keys(clotheData);
var clotheDataValue = []
var userEmail;
var userName;
var clothesTop;
var clothesBottom;
var clothesOutter;
var spring;
var summer;
var winter;
var fall;

for(var i = 0;i<clotheDataKey.length;i++){
  clotheDataValue.push(clotheData[clotheDataKey[i]]);
}

$(document).ready(async function(){
  clothesTop=0;
  clothesBottom=0;
  clothesOutter=0;
  spring=0;
  summer=0;
  winter=0;
  fall=0;
  userId=location.href
  if(userId.indexOf("id",0)!=-1){
      Id = userId.substring(userId.indexOf("id",0)+3);
  }axios.get('http://localhost:8080/user').then((Response) => {
    data = Response.data;
    console.log(Id)
    userEmail=data[Id-1].userEmail

  })
  
  //ddd
  console.log(idd);    
  axios.get('http://localhost:8080/clothes').then((Response) => {
      data = Response.data;
      for(var i=0; i<data.length;i++){
        if(userEmail==data[i].clothesUser){
          console.log(clothesUser)
          if(data[i].clothesCategory=='상의'){
            clothesTop++;
            console.log("상의"+clothesTop)
          }else if(data[i].clothesCategory='하의'){
            clothesBottom++;
            console.log("하의"+clothesBottom)
          }else{
            clothesOutter++;
            console.log("겉옷"+clothesOutter)
          }
          if(data[i].clothesSeason=='봄'){
            spring++;
            console.log("봄"+spring)
          }else if(data[i].clothesSeason=='여름'){
            summer++;
            console.log("여름"+summer)
          }else if(data[i].clothesSeason=='가을'){
            fall++;
            console.log("가을"+fall)
          }else if(data[i].clothesSeason=='겨울'){
            winter++;
            console.log("겨울"+winter)
          }
        }
      }
  
  })
  
  setTimeout(function(){
    clotheData = {"상의" : clothesTop,"하의":clothesBottom,"겉옷":clotheData};
  clotheDataKey = Object.keys(clotheData);
  clotheDataValue = []

  for(var i = 0;i<clotheDataKey.length;i++){
    clotheDataValue.push(clotheData[clotheDataKey[i]]);
  }
  printChart();
  },100)
 
});



// Pie Chart Example
function printChart() {
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: clotheDataKey,
      datasets: [{
        // 요소 개수
        data: clotheDataValue,
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#ff0000'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#ff0000'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}



$("#chartTypeCategory").click(function(){
  clotheData = {"상의" : clothesTop,"하의":clothesBottom,"겉옷":clotheData};
  clotheDataKey = Object.keys(clotheData);
  clotheDataValue = []

  for(var i = 0;i<clotheDataKey.length;i++){
    clotheDataValue.push(clotheData[clotheDataKey[i]]);
  }
  printChart();
  $("#chartLabel").empty();
  var color = ["text-primary","text-success","text-info","text-danger"];
  for(var i = 0;i<clotheDataKey.length;i++){
    var mr_2 = document.createElement("span");
    mr_2.classList.add("mr-2");
    
    var fas = document.createElement("i");  
    fas.classList.add("fas");
    fas.classList.add("fa-circle");
    fas.classList.add(color[i]);
    mr_2.append(fas);

    var text = document.createElement("span");
    $(text).text(" "+clotheDataKey[i]);
    mr_2.append(text);

    $("#chartLabel").append(mr_2);

  }
});

$("#chartTypeSeason").click(function(){
  clotheData = {"봄" : spring,"여름":summer,"가을":fall,"겨울":winter};
  clotheDataKey = Object.keys(clotheData);
  clotheDataValue = []

  for(var i = 0;i<clotheDataKey.length;i++){
    clotheDataValue.push(clotheData[clotheDataKey[i]]);
  }
  printChart();
  $("#chartLabel").empty();
  var color = ["text-primary","text-success","text-info","text-danger"];
  for(var i = 0;i<clotheDataKey.length;i++){
    var mr_2 = document.createElement("span");
    mr_2.classList.add("mr-2");
    
    var fas = document.createElement("i");  
    fas.classList.add("fas");
    fas.classList.add("fa-circle");
    fas.classList.add(color[i]);
    mr_2.append(fas);

    var text = document.createElement("span");
    $(text).text(" "+clotheDataKey[i]);
    mr_2.append(text);

    $("#chartLabel").append(mr_2);

  }
});