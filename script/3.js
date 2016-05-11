var animFunc = function(){
	// just a piece to bind in svg element
	var data = ["one"];

	// clear previous d3 instances
	d3.select("svg").remove();

	// canvas size
	var width = 500;
	var height = 500;
	
	// canvas for playing
	var canvas = d3.select("#anim_canvas")
			   .append("svg")
			   .attr("width", width)
			   .attr("height", height);

	// 2d gemetry element "svg" to play with
	var circle = canvas.selectAll("circle")
				   .data(data)
				   .enter()
				   		.append("circle")
				   		.attr("cx", 50)
				   		.attr("cy", 50)
				   		.attr("r", 25)
				   		.attr("fill", "pink");
	
	// action part: transformations
	circle.transition()
	  .duration(2000)
	  .delay(500)
	  .attr("cx", 450)
	  	.transition()
	  	.attr("fill", "red")
	  	.attr("cy", 450)
	  		.transition()
	  		.attr("fill", "purple")
	  		.attr("cx", 50)
	  			.transition()
	  			.attr("fill", "grey")
	  			.attr("cy", 50)
	  			.each("end", function() {d3.select(this).attr("fill", "pink")});

}
