var treeFunc = function (view) {


	// clear previous d3 instances
	d3.select("svg").remove();

	// data json example. Modern browser does not allow to call a file on the host
	var jsonData = {"name": "Company N",
					"children": 
						[{"name": "N Canada LIC.",
						"children": 
							[{"name": "Sales Department"},
							{"name": "Development Department"},
							{"name": "Account Department"}]	
						},
						{"name": "N Czech LTD.",
						"children": 
							[{"name": "Support Department"},
							{"name": "Development Department"},
							{"name": "Management Department"}]	
						}]
					};

	// canvas size
	var width = 1000;
	var height = 1000;

	// radius of a node
	var r = 5;
	//horizontal or vertical tree view
	var horView = view;

	// canvas
	var canvas = d3.select("#tree_canvas")
	  			   .append("svg")
	               .attr("width", width)
	               .attr("height", height)
	               	.append("g")
	             	.attr("transform", "translate(70, 70)");

	var tree = d3.layout.tree()
		.size([400,400])

	var nodes = tree.nodes(jsonData);
	
	var links = tree.links(nodes);

	var node;

	if (horView == true){
		node = canvas.selectAll(".node")
		.data(nodes)
		.enter()
			.append("g")
			.attr("class", "node")
			.attr("transform", function(d){return "translate("+d.x+","+d.y+")rotate(-45)";});
	}else{
	 	node = canvas.selectAll(".node")
		.data(nodes)
		.enter()
			.append("g")
			.attr("class", "node")
			.attr("transform", function(d){return "translate("+d.y+","+d.x+")rotate(-45)";});
	}

	// putting nodes in place
	node.append("circle")			
		.attr("r", r)
		.attr("fill", "steelblue");

	// putting labels
	node.append("text")
		.text(function (d) {return d.name;})
		.attr("transform", "translate(5,5)")

	var diagonal;
	
	if (horView == true){
		diagonal = d3.svg.diagonal();
			
	}else{
		diagonal = d3.svg.diagonal()
			.projection(function(d){return [d.y, d.x];});
	}

	canvas.selectAll(".link")
		.data(links)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("fill", "none")
		.attr("stroke", "#ADADAD")
		.attr("d", diagonal);

	// add horizontal - vertical controller
}