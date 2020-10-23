---
---
/*var chart = JSC.chart('chartDiv',{
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
});*/

var chart = JSC.chart('chartDiv',{
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
    color: '#ffae00',
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
        color: '#ffae00',
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
        color: '#ffae00',
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
        ({{ site.wilksMax }}/{{ site.absMaxWilks }}).toString().substring(0,4)+"%"
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
    tablinks[i].tabName = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
