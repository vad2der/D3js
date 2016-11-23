var circlesAnim = function(){	
	var height = function(){return document.getElementById("canvas").clientHeight;};
	var width = function(){return document.getElementById("canvas").clientWidth;};
	if (height() == 0 || width() == 0){return};
	// clear previous d3 instances
	d3.selectAll("svg").remove();
		// canvas size
	
	var coords = [];
//console.log(width(), height());
	// create x and y 's
	var off_factor = 12;
	var x = 0
	for (var x_ind = 0; x<width(); x_ind++){		
		x +=  off_factor;
		var y = 0;
		// coords.push(x);
		for (var y_ind = 0; y<height(); y_ind++){		
			y += off_factor;
			coords.push([x+(y_ind & 1)*0.5*off_factor,y]);
		};
	};
	
	// canvas
	var canvas = d3.select("#canvas")
	  			   .append("svg")
	  			   .attr("width", width())
                   .attr("height", height())
                   .on("mousemove", handleMouseMove);
	
	var radius = 5;

	var circles = canvas.selectAll("circle")
					.data(coords)
					.enter()
					.append("circle");


	circles
    	.attr("cy", function(d) { return d[1]; })
    	.attr("cx", function(d) { return d[0]; })
    	.attr("r", radius )
    	.style({"fill": "grey"})
    	.attr("opacity", 1)
    	.on("mouseover", handleMouseOver)
    	.on("mouseout", handleMouseOut);
    	

    function handleMouseOver(d,i){
    	d3.select(this).transition()
    		.duration(100)
    		.attr("r", radius*1.5)
    		.attr("opacity", .7);    		
    };

    function handleMouseOut(d,i){
    	d3.select(this).transition()
    		.duration(500)
    		.attr("r", radius)
    		.attr("opacity", .2);    		
    };

    function handleMouseMove(){
    	var coordinates = [0, 0];
		coordinates = d3.mouse(this);
		var x = coordinates[0];
		var y = coordinates[1];
		// console.log(x,y);
		// console.log(this);
		

		// if (Math.pow((Math.pow((x-this.attributes[1].value),2)+Math.pow((y-this.attributes[0].value),2)),.5)<40 &&
		// 	Math.pow((Math.pow((x-this.attributes[1].value),2)+Math.pow((y-this.attributes[0].value),2)),.5)>13){
		// 	return 0.5;
		// }else if (Math.pow((Math.pow((x-this.attributes[1].value),2)+Math.pow((y-this.attributes[0].value),2)),.5)>=40){
		// 	return 0.1;
		// }
	};		
  };

