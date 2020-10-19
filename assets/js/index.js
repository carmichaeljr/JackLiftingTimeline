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
    ["", "Squat", "Bench", "Deadlift", "Total", "Wilks"],
    ["Current Weights", {{ site.squatMax }}, {{ site.benchMax }}, {{ site.deadliftMax }}, {{ site.wilksMax }}],
    ["Goal Weights", {{ site.squatGoal }}, {{ site.benchGoal }}, {{ site.deadliftGoal }}, "" ],
  ];
JSC.Grid("gridDiv", {
  data: data.slice(1),
  columns: [
    { header: "", value: "%0" },
    { header: "Current Weights", value: "%1", align: "right" },
    { header: "Goal Weights", value: "%2", align: "right" },
    { header: "Percentage achieved", value: "{ %1/%2:c}", align: "right" }
  ]
}).then(function(g) {
  grid = g;
});
