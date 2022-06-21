// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
//init chart data - 데베랑 연동 필요
var clotheData = {"상의" : 50,"하의":44,"겉옷":55};
var clotheDataKey = Object.keys(clotheData);
var clotheDataValue = []
var userEmail;
var userName;

for(var i = 0;i<clotheDataKey.length;i++){
  clotheDataValue.push(clotheData[clotheDataKey[i]]);
}

$(document).ready(async function(){
  userId=location.href
  if(userId.indexOf("id",0)!=-1){
      Id = userId.substring(userId.indexOf("id",0)+3);
  }axios.get('http://localhost:8080/user').then((Response) => {
    data = Response.data;
    Id=Id-1;
    console.log
    userEmail=data[Id].userEmail,
    userName=data[Id].userName,
    console.log(userEmail);
    console.log(userName);

})
  
  
  console.log(Id);    
  axios.get('http://localhost:8080/clothes').then((Response) => {
      data = Response.data;
      for(var i=0; i<data.lenght;i++){
        if(userEmail[i]==data)
      }
  
  })



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
printChart();

$("#chartTypeCategory").click(function(){
  clotheData = {"상의" : 50,"하의":44,"겉옷":55};
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
  clotheData = {"봄" : 50,"여름":44,"가을":55,"겨울":30};
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