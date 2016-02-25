'use strict'
angular.module('casualApp')
.controller('HomeCtrl',['$scope', 'userData', function ($scope, userData) {
    //si esta logueado crea objecto select circular
    var images = ['img/status1.png',
            'img/status2.png',
            'img/status3.png'];
    SelectCircular('selDemo',images, 70, function(val){
      console.log('image selected: ' + val);
    });


    //radar chart
    $('#container').highcharts({
        chart: {
            polar: true
        },
        title: {
            text: null
//            align: 'left'
        },
		legend: {
            title: { text: 'Radar'},
            align: 'left',
            verticalAlign: 'top',
            y: 10,
            layout: 'vertical',

            useHTML:true,
            symbolWidth:0,
            labelFormatter: function() {
                var img = 'img/status' + this.name.split(' ')[1] + '-xxs.png';
                return '<span class="legenditem">8 people in <img src="' + img + '" width="16" height="16"></span>';
            }
        },
        credits: {enabled: false },
        xAxis: {
            tickInterval: 45,
            min: 0,
            max: 360,
            labels:
            {
                formatter: function () {
                    if (this.value === 0) return 'N';
                    if (this.value === 90) return 'E';
                    if (this.value === 180) return 'S';
                    if (this.value === 270) return 'W';
                }
            }
        },
        yAxis: {
            min: 0
        },
        series: [{
            type: 'scatter',
            name: 'State 1',
            color: 'blue',
            data: [{x:0,y:8},{x:5,y:8},{x:10,y:7},{x:15,y:6},{x:20,y:5},{x:25,y:4},{x:30,y:3},{x:35,y:2},{x:40,y:1}]
        }, {
            type: 'scatter',
            name: 'State 2',
            color: 'green',
            data: [{x:60,y:8},{x:85,y:8},{x:100,y:7},{x:150,y:6},{x:200,y:5},{x:250,y:4},{x:300,y:3},{x:350,y:2},{x:355,y:1}]

        }, {
            type: 'scatter',
            name: 'State 3',
            color: 'red',
            data: [{x:10,y:8},{x:40,y:8},{x:70,y:7},{x:80,y:6},{x:90,y:5},{x:110,y:4},{x:130,y:3},{x:150,y:2},{x:175,y:1}]
        }]
    });
}]);
