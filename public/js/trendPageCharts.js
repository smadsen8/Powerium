//Get User Data
const userDataString = document.getElementById("userInputs").getAttribute("userData");
const userData = JSON.parse(userDataString);

function getTimeXAxis(data){
  var dateXAxis = [];
    for(let i = 0; i < data.length; i++){
        const tempEntry = data[i];
        const tempTime = tempEntry.DateCreated;
        var tempDate = new Date(tempTime);
        tempDate = tempDate.toLocaleDateString();
        dateXAxis.push(tempDate);
  }
  return dateXAxis;
}


function getShowerLength(data){
  var lengths = [];
  for(let i = 0; i < data.length; i++){
    const tempEntry = data[i];
    const tempLength = tempEntry.ShowerLength;
    lengths.push(parseInt(tempLength));
  }
  return lengths;
}

function getAir(data){
  var lengths = [];
  for(let i = 0; i < data.length; i++){
    const tempEntry = data[i];
    const tempLength = tempEntry.AirConditioningTemp;
    lengths.push(parseInt(tempLength));
  }
  return lengths;
}


function getYesNo(data){
  var numYes = 0;
  var numNo = 0;
  var lengths = [];
  for(let i = 0; i < data.length; i++){
    const tempEntry = data[i];
    if(tempEntry.LEDLights === "Yes"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.NaturalLights === "Yes"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.TintUse === "Yes"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.SmartThermo === "Yes"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.SmartPlug === "Yes"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.WaterTemp === "Cold"){
      numYes++;
    } else{
      numNo++;
    }

    if(tempEntry.SinkUsage === "Yes"){
      numYes++;
    } else{
      numNo++;
    }
  }
  lengths.push(numYes);
  lengths.push(numNo);
  return lengths;
}

function getEat(data){
  var lengths = [];
  for(let i = 0; i < data.length; i++){
    const tempEntry = data[i];
    const tempLength = tempEntry.NumEatingOut;
    lengths.push(parseInt(tempLength));
  }
  return lengths;
}




//Construct the Graphs
var optionsShowerLength = {
  series: [{
    name: "Minutes",
    data: getShowerLength(userData),
}],
  chart: {
  height: 350,
  type: 'line',
  background: '#262D47',
  foreColor: '#fff',
  zoom: {
    enabled: false
  },
  dropShadow: {
    enabled: true,
    opacity: 0.5,
    blur: 5,
    left: -7,
    top: 22,
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'straight'
},
title: {
  text: 'Shower Length Graph',
  align: 'left'
},
grid: {
  borderColor: '#aaa',
},
xaxis: {
  categories: getTimeXAxis(userData),
  axisTicks: {
    color: "#333"
  },
  axisBorder: {
    color: "#333"
  }
},
stroke: {
  width: 5,
  dashArray: 0,
  colors: '#FCCF31',
},
  };

  var showerChart = new ApexCharts(document.querySelector("#showerChart"), optionsShowerLength);
  showerChart.render();


  var optionsAir = {
    series: [{
      name: "Temperature (F)",
      data:  getAir(userData),
  }],
    chart: {
    height: 350,
    type: 'line',
    background: '#262D47',
    foreColor: '#fff',
    zoom: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      opacity: 0.5,
      blur: 5,
      left: -7,
      top: 22,
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Air Conditioning Graph',
    align: 'left'
  },
  grid: {
    borderColor: '#aaa',
  },
  xaxis: {
    categories: getTimeXAxis(userData),
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  stroke: {
    width: 5,
    dashArray: 0,
    colors: '#FCCF31',
  },
  };

  var airChart = new ApexCharts(document.querySelector("#airChart"), optionsAir);
  airChart.render();

  var optionsEat = {
    series: [{
      name: "Num. Eating Out",
      data: getEat(userData),
  }],
    chart: {
    height: 350,
    type: 'line',
    background: '#262D47',
    foreColor: '#fff',
    zoom: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      opacity: 0.5,
      blur: 5,
      left: -7,
      top: 22,
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Eating Out Graph',
    align: 'left'
  },
  grid: {
    borderColor: '#aaa',
  },
  xaxis: {
    categories: getTimeXAxis(userData),
    axisTicks: {
      color: "#333"
    },
    axisBorder: {
      color: "#333"
    }
  },
  stroke: {
    width: 5,
    dashArray: 0,
    colors: '#FCCF31',
  },
  };

  var eatChart = new ApexCharts(document.querySelector("#eatChart"), optionsEat);
  eatChart.render();


  var optionsYesNo = {
    series: getYesNo(userData),
    chart: {
    //width: 380,
    type: 'pie',
    background: '#262D47',
    foreColor: '#fff',
  },
  labels: ['Positive Habits', 'Negative Habits'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var yesNochart = new ApexCharts(document.querySelector("#yesNoChart"), optionsYesNo);
  yesNochart.render();
