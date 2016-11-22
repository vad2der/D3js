var barFunc = function() {
	// just an array/list of data to display.
	var arraySize = Math.floor((Math.random() * 15) + 3);
	
	var dataArray = [];
	for (var i=0; i< arraySize; i++ ){
		dataArray.push({"NAME": "Parameter: "+i ,"VALUE": Math.floor((Math.random() * 100) + 1)})
	}	 
	
	//canvas size
	var height = 500;
	var width = 500;

	// clear previous d3 instances
	d3.selectAll("svg").remove();

	// couple helpers
	var getValues = function(AR){
		var outputAr = []
		for (var i = 0; i < AR.length; i++) {
			outputAr.push(AR[i].VALUE);
		}
		return outputAr;
	}

	var getNames = function(AR){
		var outputAr = []
		for (var i = 0; i < AR.length; i++) {
			outputAr.push(AR[i].NAME);
		}
		return outputAr;
	}

	//separate the array
	var valuesArray = getValues(dataArray);
	var nameArray = getNames(dataArray);

	// scale up to full width of the canvas
	var maxWidth = Math.max(...valuesArray);
	var widthScale = d3.scale.linear()
							 .domain([0, maxWidth])
							 .range([0, width]);

	// color scale range
	var colorScale = d3.scale.linear()
	                         .domain([0, maxWidth])
	                         .range(["green","red"]);

	// axis instance and properties
	var axis = d3.svg.axis()
					 .ticks(5)
					 .scale(widthScale);

	var canvas = d3.select("#canvas")
	  			   .append("svg")
	               .attr("width", width)
	               .attr("height", height)
	               		.append("g")
	               		.attr("transform", "translate(20,20)");

	// height scale factor
	var heightScaleFactor = 0.8*height/dataArray.length;

	// bars to show from data
	var bars = canvas.selectAll("rect")
					 .data(valuesArray)
					 .enter()
					 	.append("rect")
					 	.attr("width", function(d) {return widthScale(d);})
					 	.attr("height", heightScaleFactor)
					 	.attr("fill", function(d) {return colorScale(d);})
					 	.attr("y", function(d, i){return heightScaleFactor*1.12*i;});
					 	
	bars.on('mouseover', mouseOverBar)
	 	.on('mouseout', mouseOutBar);

	function mouseOverBar(){		
		var circleUnderMouse = this
		d3.selectAll("rect")
			.filter(function(d,i) {
      			return (this !== circleUnderMouse);})
			.transition()
    		.duration(200)
			.style("opacity", 0.2);

		d3.select(this)
			.style("opacity", 1);		
	};

	function mouseOutBar(){
		d3.selectAll("rect")
			.transition()
    		.duration(400)
			.style("opacity", 1);
	};

	// labels for bars
	var labels = canvas.selectAll("text")
					   .data(nameArray)
					   .enter()
					   .append("text")
					   .attr("fill", "black")
					   .attr("x", 5)
					   .attr("y", function(n, i){return heightScaleFactor*1.13*i+heightScaleFactor/2})
					   .text(function(n){return n;})


	// putting the axis in
	canvas.append("g")
		  .attr("transform","translate(0,"+ height*0.9+")")
		  .call(axis);
}