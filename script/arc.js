var arcFunc = function () {
	// GENERATE THE DATA
	// just an array/list of data to display.
	var arraySize = Math.floor((Math.random() * 5) + 3);
	
	var dataArray = [];
	for (var i=0; i< arraySize; i++ ){
		dataArray.push({"NAME": "Parameter: "+i ,"VALUE": Math.floor((Math.random() * 100) + 1)})
	}	 
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
	// separate the arrays
	var valuesArray = getValues(dataArray);
	var namesArray = getNames(dataArray);

	// clear previous d3 instances
	d3.select("svg").remove();

	// canvas size
	var height = 500;
	var width = 500;

	// canvas
	var canvas = d3.select("#canvas")
	  			   .append("svg")
	               .attr("width", width)
	               .attr("height", height);

	var group = canvas.append("g")
					  .attr("transform", "translate(300, 300)");

	var radius = 200;
	//var p = Math.PI * 2;

	// color scale range
	var colorScale = d3.scale.ordinal()
	                         .range(["#006600","#006633","#006666","#006699"," #0066cc","#0066ff"]);

	var arc = d3.svg.arc()
					.innerRadius(radius-100)					  
					.outerRadius(radius)

	var pie = d3.layout.pie()
				.value(function(d){return d;})

	var arcs = group.selectAll(".arc")
		.data(pie(valuesArray))
		.enter()
			.append("g")
			.attr("class", "arc")
	
	// assign a color			
	arcs.append("path")
		.attr("d", arc)
		.attr("fill", function(d){return colorScale(d.data)});
	
	// get centroid		
	arcs.append("text")
		.attr("transform", function(d){return "translate("+arc.centroid(d)+")";})
		.attr("text-anchor", "middle")
		.text(function(d){return d.data;})
}