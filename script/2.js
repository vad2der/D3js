var barFunc = function() {
	// just an array/list of data to display.
	var dataArray = [5, 20, 15, 40, 50, 2, 35, 80, 112, 15, 12, 7]

	//canvas size
	var height = 500;
	var width = 500;

	// clear previous d3 instances
	d3.select("svg").remove();

	// scale up to full width of the canvas
	var maxWidth = Math.max(...dataArray);
	var widthScale = d3.scale.linear()
							 .domain([0, maxWidth])
							 .range([0, width]);

	// color scale range
	var colorScale = d3.scale.linear()
	                         .domain([0, maxWidth])
	                         .range(["blue","red"]);

	// axis instance and properties
	var axis = d3.svg.axis()
					 .ticks(5)
					 .scale(widthScale);

	var canvas = d3.select("#bar_canvas")
	  			   .append("svg")
	               .attr("width", width)
	               .attr("height", height)
	               		.append("g")
	               		.attr("transform", "translate(20,20)");

	// height scale factor
	var heightScaleFactor = 0.8*height/dataArray.length;

	// bars to show from data
	var bars = canvas.selectAll("rect")
					 .data(dataArray)
					 .enter()
					 	.append("rect")
					 	.attr("width", function(d) {return widthScale(d);})
					 	.attr("height", heightScaleFactor)
					 	.attr("fill", function(d) {return colorScale(d);})
					 	.attr("y", function(d, i){return heightScaleFactor*1.12*i;});

	// putting the axis in
	canvas.append("g")
		  .attr("transform","translate(0,"+ height*0.9+")")
		  .call(axis);
}