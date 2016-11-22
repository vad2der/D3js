var cubesAnim = function(){	
	var height = function(){return document.getElementById("canvas").clientHeight;};
	var width = function(){return document.getElementById("canvas").clientWidth;};
	if (height() == 0 || width() == 0){return};
	// clear previous d3 instances
	d3.select("svg").remove();
		// canvas size
	
	var coords = [];
//console.log(width(), height());
	// create x and y 's
	var off_factor = 61;
	var x = 0
	for (var x_ind = 0; x<width(); x_ind++){		
		var y = 0;
		// coords.push(x);
		for (var y_ind = 0; y<height(); y_ind++){		
			coords.push([x,y]);
			y += off_factor;			
		};
		x +=  off_factor;
	};
	
	// canvas
	var canvas = d3.select("#canvas")
	  			   .append("svg")
	  			   .attr("width", width())
                   .attr("height", height());
                   

	var cubes = canvas.selectAll("rect")
					.data(coords)
					.enter()
					.append("rect");


	cubes
    	.attr("y", function(d) { return d[1]; })
    	.attr("x", function(d) { return d[0]; })
    	.attr("width", off_factor)
		.attr("height", off_factor)
    	.style({"fill": "black"})
    	.attr("opacity", 1)
    	.on("mouseover", handleMouseOver)
    	.on("mouseout", handleMouseOut)
    		.transition()
    		.duration(15000)
    		.attr("opacity",0);
    	

    function handleMouseOver(d,i){
    	d3.select(this).transition()
    		.duration(100)
    		.attr("opacity", 0);    		
    };

    function handleMouseOut(d,i){
    	d3.select(this).transition()
    		.duration(1000)
    		.attr("opacity", 1)
    			.transition()
    			.duration(15000)
    			.attr("opacity",0);    		
    };

    var text = canvas.selectAll("text")
    				.data([1])
           			.enter()
           			.append("text");

	//Add the text attributes
	var textLabels = text
                 .attr("opacity", 0)
                 .attr("x", width()/5)
                 .attr("y", height()/3)
                 .text("HERE is the text")
                 .attr("font-size", "40px")
                 .attr("text-transform","uppercase")
                 .attr("fill", "white")
                 .style({"text":"bold, italic"})
                 	.transition()
                 	.duration(2000)
                 	.attr("opacity", 1);
};

$( window ).resize(function() {cubesAnim()});
