var bubbleFunc = function (view) {
	// clear previous d3 instances
	d3.selectAll("svg").remove();

	// data json example. Modern browser does not allow to call a file on the host
	var jsonData = {"name": "Company N", "value": 55, "root": true,
					"children": 
						[{"name": "N Canada LIC.", "value": 27,
						"children": 
							[{"name": "Sales Department", "value": 12},
							{"name": "Development Department","value": 6},
							{"name": "Account Department","value": 3}]	
						},
						{"name": "N Czech LTD.", "value": 15,
						"children": 
							[{"name": "Support Department", "value": 18},
							{"name": "Development Department", "value": 8},
							{"name": "Management Department","value": 3}]	
						},
						{"name": "N Swiss GmbH", "value": 2}]
					};

	// canvas size
	var width = 800;
	var height = 600;
	
	// canvas
	var canvas = d3.select("#canvas")
	  			   .append("svg")
	               .attr("width", width)
	               .attr("height", height)
	               	.append("g")
	             	.attr("transform", "translate(50, 50)");

	var pack = d3.layout.pack()
				 .size([width, height-50])
				 .padding(10)

	var nodes = pack.nodes(jsonData);
	var node = canvas.selectAll(".node")
					 .data(nodes)
					 .enter()
					 .append("g")
					 	.attr("class", "node")
					 	.attr("transform", function (d) {return "translate("+d.x+","+d.y+")"; });
	node.append("circle")					 	
		.attr("r", function(d) {return d.r;})
		.attr("fill","steelblue")
		.attr("opacity", 0.25)
		.attr("stroke", "#ADADAD")
		.attr("stroke-width", "2");

	node.append("text")
		.text(function (d){return d.value;}) //return d.children ? "" : d.value;
		.attr("font-size", function (d){return d.root ? 100 : d.children ? 50 : 15;})
		.attr("font-family", "sans-serif")
		.attr("style", function (d){return d.root ? "opacity:.2" : d.children ? "opacity:.4" : "opacity:1";})
		.attr("text-align", "center"); 
};