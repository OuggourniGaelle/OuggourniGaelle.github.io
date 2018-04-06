var color = Chart.helpers.color;
var scatterChartData = {
    datasets: [{
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.purple,
        label: 'Medailles 2',
        data: [{
            x: 1,
            y: -1.711e-2,
        }, {
            x: 1.26,
            y: -2.708e-2,
        }, {
            x: 50,
            y: -2.708e-2,
        }, {
            x: 100,
            y: -3.596e1,
        }]
    }]
};
    
window.onload = function() {
    Chart.defaults.global.elements.point.radius=10;
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myScatter = Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }                
        }
    });
};