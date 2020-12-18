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
var timeChart

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
        points: [  [ 'value', {{ site.squatMax }} ]]
      },
       {
        name: 'Bench',
        yAxis: 'bench',
        points: [  [ 'value', {{ site.benchMax }} ]]
      },
       {
        name: 'Deadlift',
        yAxis: 'deadlift',
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
        color: ' {{ site.accentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: [
          { x: "1/24/2019", y: 275 },
          { x: "2/6/2019", y: 285 },
          { x: "3/22/2019", y: 295 },
          { x: "3/28/2019", y: 300 },
          { x: "4/18/2019", y: 315 },
          { x: "4/21/2019", y: 320 },
          { x: "7/5/2019", y: 325 },
          { x: "10/5/2019", y: 335 },
          { x: "10/12/2019", y: 345 },
          { x: "10/26/2019", y: 365 },
          { x: "12/5/2019", y: 405 },
          { x: "6/29/2020", y: 335 },
          { x: "8/24/2020", y: 345 },
          { x: "8/31/2020", y: 365 },
          { x: "9/7/2020", y: 385 },
          { x: "9/16/2020", y: 405 },
          { x: "9/28/2020", y: 425 },
          { x: "12/1/2020", y: 455 },
          { x: "12/4/2020", y: 465 }
        ]
      },
      {
        name: "Bench",
        color: ' {{ site.accentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: [
          { x: "8/5/2019", y: 225 },
          { x: "7/10/2020", y: 195 },
          { x: "7/17/2020", y: 200 },
          { x: "7/28/2020", y: 205 },
          { x: "8/4/2020", y: 225 },
          { x: "8/11/2020", y: 230 },
          { x: "8/21/2020", y: 240 },
          { x: "12/1/2020", y: 245 }
        ]
      },
      {
        name: "Squat",
        color: ' {{ site.accentColor }} ',
        line_width: 3,
        defaultPoint_marker: {
          size: 12,
          outline: { width: 3, color: "white" }
        },
        points: [
          { x: "2/14/2019", y: 205 },
          { x: "3/28/2019", y: 210 },
          { x: "7/5/2019", y: 275 },
          { x: "7/9/2019", y: 315 },
          { x: "7/8/2020", y: 225 },
          { x: "7/15/2020", y: 250 },
          { x: "7/22/2020", y: 275 },
          { x: "7/29/2020", y: 280 },
          { x: "8/5/2020", y: 315 },
          { x: "8/26/2020", y: 325 },
          { x: "9/2/2020", y: 340 },
          { x: "9/14/2020", y: 365 },
          { x: "11/13/2020", y: 385 }
        ]
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
    /*
    createDeadliftChart();
    createBenchChart();
    createSquatChart();
    */
  }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
