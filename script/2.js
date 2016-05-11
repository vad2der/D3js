var dataArray = [5, 20, 15, 40, 50, 2, 35, 80, 112, 15, 12, 7]

var height = 500;
var width = 500;


// scale up to full width of the canvas
var maxWidth = Math.max(...dataArray);
var widthScale = d3.scale.linear()
						 .domain([0, maxWidth])
						 .range([0, width]);

// color scale range
var colorScale = d3.scale.linear()
                         .domain([0, maxWidth])
                         .range(["blue","red"]);

// axis
var axis = d3.svg.axis()
				 .ticks(5)
				 .scale(widthScale);

var canvas = d3.select("body")
  			   .append("svg")
               .attr("width", width)
               .attr("height", height)
               		.append("g")
               		.attr("transform", "translate(20,20)");

var heightScaleFactor = 0.8*height/dataArray.length;
var bars = canvas.selectAll("rect")
				 .data(dataArray)
				 .enter()
				 	.append("rect")
				 	.attr("width", function(d) {return widthScale(d);})
				 	.attr("height", heightScaleFactor)
				 	.attr("fill", function(d) {return colorScale(d);})
				 	.attr("y", function(d, i){return heightScaleFactor*1.12*i;});
canvas.append("g")
	  .attr("transform","translate(0,460)")
	  .call(axis);