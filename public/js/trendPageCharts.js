var optionsWaterChart = {
  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
  text: 'Water Use Graph',
  align: 'left'
},
grid: {
  borderColor: '#aaa',
},
xaxis: {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

  var waterChart = new ApexCharts(document.querySelector("#waterChart"), optionsWaterChart);
  waterChart.render();


  var optionsEatingOut = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
    text: 'Eeating Out Graph',
    align: 'left'
  },
  grid: {
    borderColor: '#aaa',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

  var eatingOutChart = new ApexCharts(document.querySelector("#eatingOutChart"), optionsEatingOut);
  eatingOutChart.render();

  var optionsAirConditioning = {
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

  var airConditioningChart = new ApexCharts(document.querySelector("#airConditioningChart"), optionsAirConditioning);
  airConditioningChart.render();


  var optionsHotOrCold = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }],
    chart: {
    type: 'bar',
    background: '#262D47',
    foreColor: '#fff',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
  };

  var chartHotOrCold = new ApexCharts(document.querySelector("#hotOrColdWaterChart"), optionsHotOrCold);
  chartHotOrCold.render();


  var optionsMeatOrVeggie = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }],
    chart: {
    type: 'bar',
    background: '#262D47',
    foreColor: '#fff',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
  };

  var chartMeatOrVeggie = new ApexCharts(document.querySelector("#meatOrVeggieChart"), optionsMeatOrVeggie);
  chartMeatOrVeggie.render();



