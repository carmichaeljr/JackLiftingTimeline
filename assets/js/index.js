/*JSC.Chart('chartDiv', {
   type: 'column',
   series: [
      {
         points: [
            {x: 'Squat', y: 365},
            {x: 'Bench', y: 240},
            {x: 'Deadlift', y: 425}
         ]
      }
   ]
});
*/

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
      scale_range: [  0,  600]
    },
    {
      id: 'Bench',
      line_visible: true,
      defaultTick_enabled: false,
      scale_range: [  0,  405]
    },
    {
      id: 'Deadlift',
      line_visible: true,
      defaultTick_enabled: false,
      scale_range: [  0,  800]
    }
  ],
  xAxis: [
    {
      defaultTick_gridLine_width: 0,
      
/*Reduces column size to pad against axis line.*/
      spacingPercentage: 0.15
    }
  ],
  defaultSeries: {
    type: 'gauge column roundCaps',
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
         { text: '%sum / 600'}
       ]
      },
      name: 'Squat',
      yAxis: 'Squat',
      points: [  [ 'value', 365  ]]
    },
    {
      shape: {
         label: [
         { text: '%name'  },
         { text: '%sum / 405'}
       ]
      },
      name: 'Bench',
      yAxis: 'Bench',
      points: [  [ 'value', 260  ]]
    },
    {
      shape: {
         label: [
         { text: '%name'  },
         { text: '%sum / 800'}
       ]
      },
      name: 'Deadlift',
      yAxis: 'Deadlift',
      points: [  [ 'value', 425  ]]
    },
  ]
});
