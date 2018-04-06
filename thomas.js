var color = Chart.helpers.color;
var scatterChartData = {
    datasets: [{
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.purple,
        label: 'EUR',
        data: [{
            x: 1,
            y: 1,
        }, {
            x: 10,
            y: 10,
        }, {
            x: 50,
            y: 50,
        }, {
            x: 100,
            y: 100,
        }]
    }]
};
    
window.onload = function() {
    //Chart.defaults.global.elements.point.radius=10;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myScatter = Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            title: {
				display: true,
				text: 'Olympic Medals for 2018 Winter Games'
			},
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }                
        }
    });
};