---
---
/*
var chart = JSC.chart('chartDiv',{
  title: {
    label_text: 'Current Lifts',
    position: 'center'
  },
  legend_visible: false,
  yAxis: [
    {
      id: 'Squat',
      line_visible: true,
      defaultTick_enabled: false,
      scale_range: [  0,  {{ site.squatGoal }}]
    },
    {
      id: 'Bench',
      line_visible: true,
      defaultTick_enabled: false,
      scale_range: [  0,  {{ site.benchGoal }}]
    },
    {
      id: 'Deadlift',
      line_visible: true,
      defaultTick_enabled: false,
      scale_range: [  0,  {{ site.deadliftGoal }}]
    }
  ],
  xAxis: [
    {
      defaultTick_gridLine_width: 0,
      spacingPercentage: 0.15
    }
  ],
  defaultSeries: {
    type: 'gauge column roundCaps',
    color: '#00eb37',
    shape: {
      innerSize: '70%',
      label: [
        { text: '%name'  },
        {
          text: '%sum / 100',
          verticalAlign: 'middle',
          style_fontSize: 20
        }
      ]
    }
  },
  series: [
    {
      shape: {
         label: [
         { text: '%name'  },
         { text: '%sum lbs/ {{ site.squatGoal }} lbs'}
       ]
      },
      name: 'Squat',
      yAxis: 'Squat',
      points: [  [ 'value', {{ site.squatMax }}  ]]
    },
    {
      shape: {
         label: [
         { text: '%name'  },
         { text: '%sum lbs/ {{ site.benchGoal }} lbs'}
       ]
      },
      name: 'Bench',
      yAxis: 'Bench',
      points: [  [ 'value', {{ site.benchMax }}  ]]
    },
    {
      shape: {
         label: [
         { text: '%name'  },
         { text: '%sum lbs/ {{ site.deadliftGoal }} lbs'}
       ]
      },
      name: 'Deadlift',
      yAxis: 'Deadlift',
      points: [  [ 'value', {{ site.deadliftMax }}  ]]
    },
  ]
});
*/

var SBDChart;
var timeChart;
var squatPoints=[];
var benchPoints=[];
var deadliftPoints=[];

JSC.fetch("{{ "/data/Records.csv" | prepend: site.baseurl }}")
 .then(function (response) {
    return response.text();
 })
 .then(function (text) {
    csvToSeries(text);
 })
 .catch(function (error) {
    //Something went wrong
    console.log(error);
 });

function csvToSeries(text) {
  let dataAsJson = JSC.csv2Json(text);
  dataAsJson.forEach(function (row) {
    if (row.lift==="Squat"){
      squatPoints.push({x: row.date, y: row.weight});
    } else if (row.lift=="Bench"){
      benchPoints.push({x: row.date, y: row.weight});
    } else if (row.lift=="Deadlift"){
      deadliftPoints.push({x: row.date,y: row.weight});
    }
  });
}

function createSBDChart(){
  SBDChart = JSC.chart('SBDChartDiv',{
    title: {
      label_text: 'SBD Maxes',
      position: 'center'
    },
    legend_visible: false,
    yAxis: [
      {id: 'bench', line_visible: true, scale_range: [  0,  {{ site.benchGoal }} ] },
      {id: 'squat', line_visible: true, scale_range: [  0,  {{ site.squatGoal }} ] },
      {id: 'deadlift', line_visible: true, scale_range: [  0,  {{ site.deadliftGoal }} ] },
      {
        id: 'total',
        line_visible: true,
        defaultTick_enabled: false,
        scale_range: [  0,  {{ site.totalGoal }}]
      },
      {
        id: 'wilks',
        line_visible: true,
        defaultTick_enabled: false,
        scale_range: [  0,  {{ site.absMaxWilks }}]
      },
    ],
    xAxis: [
      {
        defaultTick_gridLine_width: 0,
        spacingPercentage: 0.15
      }
    ],
    defaultSeries: {
      type: 'gauge linear column roundCaps',
      color: ' {{ site.accentColor }} ',
      shape: {label: [  { text: '%name'  }] },
    },
    series: [
      {
        name: 'Squat',
        yAxis: 'squat',
        color: ' {{ site.squatAccentColor }} ',
        points: [  [ 'value', {{ site.squatMax }} ]]
      },
       {
        name: 'Bench',
        yAxis: 'bench',
        color: ' {{ site.benchAccentColor }} ',
        points: [  [ 'value', {{ site.benchMax }} ]]
      },
       {
        name: 'Deadlift',
        yAxis: 'deadlift',
        color: ' {{ site.deadliftAccentColor }} ',
        points: [  [ 'value', {{ site.deadliftMax }} ]]
      },
      {
          name: 'Total',
          type: 'gauge column roundCaps',
          color: ' {{ site.accentColor }} ',
          shape: {
              innerSize: '70%',
              label: [
                  { text: '%name'  },
                  {
                      text: '%sum lbs/ {{ site.totalGoal }} lbs',
                      verticalAlign: 'middle',
                      style_fontSize: 20
                  }
              ]
          },
          yAxis: 'total',
          points: [[ 'value', {{ site.totalMax }} ]]
      },
      {
          name: 'Wilks',
          type: 'gauge column roundCaps',
          color: ' {{ site.accentColor }} ',
          shape: {
              innerSize: '70%',
              label: [
                  { text: '%name'  },
                  {
                      text: '%sum / {{ site.absMaxWilks }}',
                      verticalAlign: 'middle',
                      style_fontSize: 20
                  }
              ]
          },
          yAxis: 'wilks',
          points: [[ 'value', {{ site.wilksMax }}  ]]
      }
    ]
  });  
}

function createTimeChart(){
  timeChart = JSC.chart("timeChart", {
    type: "lineSpline",
    yAxis_label_text: "Weight (lbs)",
    legend_position:'bottom right',
    xAxis_scale_type: "time",
    defaultSeries_firstPoint: { label_text: "%seriesName" },
    series: [
      {
        name: "Deadlift",
        color: ' {{ site.deadliftAccentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: deadliftPoints,
      },
      {
        name: "Bench",
        color: ' {{ site.benchAccentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: benchPoints,
      },
      {
        name: "Squat",
        color: ' {{ site.squatAccentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: squatPoints,
      }
    ],
    xAxis: {
      crosshair_enabled: true,
      scale_type: "time"
    }
  });
}

var grid,
  data = [
      ["Category","Squat", "Bench","Deadlift","Total","Wilks"],
      ["Current Weight",{{ site.squatMax }},{{ site.benchMax }},{{ site.deadliftMax }},{{ site.totalMax }},{{ site.wilksMax }}],
      ["Goal Weight",{{ site.squatGoal }},{{ site.benchGoal }},{{ site.deadliftGoal }},{{ site.totalGoal }},{{ site.absMaxWilks }}],
      ["Percent of Goal",
        ({{ site.squatMax }}/{{ site.squatGoal }}*100).toString().substring(0,4)+"%",
        ({{ site.benchMax }}/{{ site.benchGoal }}*100).toString().substring(0,4)+"%",
        ({{ site.deadliftMax }}/{{ site.deadliftGoal }}*100).toString().substring(0,4)+"%",
        ({{ site.totalMax }}/{{ site.totalGoal }}*100).toString().substring(0,4)+"%",
        ({{ site.wilksMax }}/{{ site.absMaxWilks }}*100).toString().substring(0,4)+"%"
      ],
  ];
JSC.Grid("gridDiv", {
  data: data.slice(1),
  //cssFile: 
  columns: [
    { header: "Categories", value: "%0" },
    { header: "Squat", value: "%1", align: "right" },
    { header: "Bench", value: "%2", align: "right" },
    { header: "Deadlift", value: "%3", align: "right" },
    { header: "Total", value: "%4", align: "right" },
    { header: "Wilks", value: "%5", align: "right" },
  ]
}).then(function(g) {
  grid = g;
});

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  if (tabName==="Stats"){
    createSBDChart();
    createTimeChart();
  }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


/*toggle between hiding and showing the dropdown content */
function userSelect() {
  document.getElementById("userDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
