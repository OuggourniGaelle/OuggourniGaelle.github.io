var width = 1200,
height=1000;
d3.csv('./data/participants3.csv', function(error, data) {
    if (error) {
        console.error('Error getting or parsing the data.');
        throw error;
    }
    // selection.datum() returns the bound datum for the first element in the selection and
    //  doesn't join the specified array of data with the selected elements
    var chart = participantsBubbleChart(-10).width(width).height(height);
    d3.select('#participants-chart').datum(data).call(chart);
});

var participationsNumberCompare = parseInt(document.getElementById("rangeParticipations").value);

function changeDataParticipants(){
    var participationsNumber = parseInt(document.getElementById("rangeParticipations").value);

    d3.csv('./data/participants3.csv', function(error, data) {
        if (error) {
            console.error('Error getting or parsing the data.');
            throw error;
        }

        //on ne garde que les données pour lesquels la participation est sup a number
        var filteredDataParticipants = data.filter(function(d){
            return d.Participations >= parseInt(participationsNumber) ;
        });

        //Replace value in the button
        document.getElementById("participations").innerHTML = parseInt(participationsNumber) + ' games and more';

        var increaseParticipationsNumber = false;
        if(participationsNumber > participationsNumberCompare || typeof participationsNumberCompare === 'undefined'){
            increaseParticipationsNumber = true;
        }

        var strength = participationsNumber > 4 ? '-30':'-10';

        console.log('participations',increaseParticipationsNumber, participationsNumber, participationsNumberCompare);
        if(!increaseParticipationsNumber){
            d3.select('#participants-chart')
                            .selectAll("circle")
                            .remove();
            var chart = participantsBubbleChart(strength).width(width).height(height);
            d3.select('#participants-chart')
                .datum(filteredDataParticipants)
                .call(chart);
        }
        else {
            //rejoin data
            var circle = d3.select('#participants-chart')
                            .selectAll("circle")
                            .data(filteredDataParticipants);

            circle.exit().remove();//remove unneeded circles

            d3.forceSimulation(filteredDataParticipants)
                .force("charge", d3.forceManyBody().strength([strength]))
                .force("x", d3.forceX())
                .force("y", d3.forceY());
        }

        participationsNumberCompare = participationsNumber;
    });
}

//TODO: Couleur = continent
function participantsBubbleChart(strengthBubbles) {
    var width = 1200,
        height = 800,
        maxRadius = 6,
        columnForColors = "Trigram",
        columnForRadius = "Total";

    function chart(selection) {
        var data = selection.datum();
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "black")
            .style("padding", "8px")
            .style("background-color", "rgb(255,255,255,0.85)")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("width", "400px")
            .text("");


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([strengthBubbles]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        }

        var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range([3, 20])

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr('r', function(d) {
                return scaleRadius(d[columnForRadius])
            })
            .style("fill", function(d) {
                return colorCircles(d[columnForColors])
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function(d) {
                tooltip.html(tooltipContent(d));
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                return tooltip.style("visibility", "hidden");
            });

            function tooltipContent(d){
                var content = "<h2>" + d.Athlete.split(',')[1] + " " + d.Athlete.split(',')[0] + "</h2>"
                            + d.Country + "<br>"
                            + "Sport: " + d.Sport + "<br/>"
                            + d.Participations + " participations<br>"
                            + d.Total + " medal(s)<br>"
                            + "G: " + d.Gold + " - S: " + d.Silver + " - B: " + d.Bronze;
                if(d.Athlete_unique_url === "/olympics/athletes/mi/ian-millar-1.html"){
                    content = "<h2>Ian Millar a.k.a Captain Canada!</h2>"
                            + "Sport: " + d.Sport + "<br/>"
                            + "He hold the most games participations record.<br/>"
                            + "Ian Millar appeared in 10 summer competitions<br/>"
                            + "(from 1974 to 2012),<br/>"
                            + "and he won his first medal in 2008."
                            + "<img alt=\"Image illustrative de l\'article Ian Millar\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ian_Millar_on_horse.jpg/200px-Ian_Millar_on_horse.jpg\" width=\"200\" height=\"419\">";
                }
                return content;
            }
    }

    chart.width = function(value) {
        if (!arguments.length) {
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) {
            return height;
        }
        height = value;
        return chart;
    };


    chart.columnForColors = function(value) {
        if (!arguments.columnForColors) {
            return columnForColors;
        }
        columnForColors = value;
        return chart;
    };

    chart.columnForRadius = function(value) {
        if (!arguments.columnForRadius) {
            return columnForRadius;
        }
        columnForRadius = value;
        return chart;
    };

    chart.strengthBubbles = function(value) {
        if (!arguments.strengthBubbles) {
            return strengthBubbles;
        }
        strengthBubbles = value;
        return chart;
    };

    return chart;
}
