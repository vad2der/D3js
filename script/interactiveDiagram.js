	// function* f(prev = null, current = 0, next = 1) { 	  
 //  		yield current;
 //  		yield *f(prev-1, next, current + next);
	// }
  // b = f();
  // var a = function(){
  //   document.getElementById("result").append(b.next().value+", ");
  // }
  // window.a=a;
var interactiveDiagram = function(){

var data = {
  name: 'All',
  children:
    [{name: 'Value 1',
    children:
      [{ name: 'Value 1.1', value: 107 },
      { name: 'Value 1.2', value: 91 },
      { name: 'Value 1.3', value: 66 },
      { name: 'Value 1.4', value: 215 }]
    },
    {
      name: 'Value 2',
      children:
        [{ name: 'Value 2.1', value: 70 },
        { name: 'Value 2.2', value: 12 },
        { name: 'Value 2.3', value: 55 }]
    },
    {
      name: 'Value 3',
      children:
        [{ name: 'Value 3.1',
          children:
            [{ name: 'Value 3.1.1', value: 183 },
            { name: 'Value 3.1.2', value: 132 },
            { name: 'Value 3.1.3', value: 112 }]
        },
        { name: 'Value 3.2',
          children:
            [{ name: 'Value 3.2.1', value: 86 },
            { name: 'Value 3.2.2', value: 56 },
            { name: 'Value 3.2.3', value: 99 },
            { name: 'Value 3.2.4', value: 120 }]
        }]
    },
    {
      name: 'Value 4',
      children:
        [{ name: 'Value 4.1', value: 401 },
        { name: 'Value 4.2', value: 102 },
        { name: 'Value 4.3', value: 104 },
        { name: 'Value 4.4', value: 118 },
        { name: 'Value 4.5', value: 150 }]
    },
    {
      name: 'Value 5',
      children:
        [{ name: 'Value 5.1',
        children: [
          { name: 'Value 5.1.2', value: 104 }],
        }],
    }]
};

var height = document.getElementById("canvas").clientHeight;
var width = document.getElementById("canvas").clientWidth;
if (height == 0 || width == 0){return};
// clear previous d3 instances
d3.selectAll("svg").remove();

var radius = width / 3;

// Partition layout
const partition = d3.layout.partition();

const nodes = partition.nodes(data);

let arc_transition; // save arc transition
// Create scales
const x = d3.scale.linear().range([0, 2 * Math.PI]);
const y = d3.scale.sqrt().range([0, width / 2]);
const color = d3.scale.category20c();

// Arc generator
const arc_generator = d3.svg.arc()
      .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x))))
      .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))))
      .innerRadius(d => Math.max(0, y(d.y)))
      .outerRadius(d => Math.max(0, y(d.y + d.dy)));

// Append a centered group for the burst to be added to
const burst_group = d3.select('#canvas')
      .append('svg')
      .attr({ width, height })
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

// Append Arcs
const arcs_g = burst_group.selectAll('path.ark')
                          .data(nodes)
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .on('mouseover', hoverOver)
                          .on('mouseout', hoverOut);

const arcs = arcs_g.append('path')
                  .attr({d: arc_generator,
                    class: d => `ark -depth-${d.depth}`})
                  .style('fill', (d, i) => d.depth > 0 ? color(i) : null)
                  .on('click', click);

var arc = d3.svg.arc()
          .innerRadius(radius-100)            
          .outerRadius(radius)

function hoverOver(d,i){  
  if (d.depth > 0) {
        fade(arcs, 0.1, getNameArray(d).reverse()[getNameArray(d).length-1].toString(), 'name');
        update_crumbs(d);
  }
  d3.select(this).append("text")
    //.attr("transform", function(d){return "translate("+arc.centroid(d)+")";})
    .attr("text-anchor", "middle")
    .text(function(d){return d.name+": "+d.value;})
    .style("font-size", "15px");
};

function hoverOut(d,i){
  fade(arcs, 1);
  remove_crumbs()
  d3.select(this).selectAll("text").remove();
}

// Add legend
function addLegend() {
  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var line = { width: 500, height: 30, spacing: 1, radius: 5 };
  var legend_canvas = d3.select('#canvas')
                .append('ul')                
  
  var legend = legend_canvas.selectAll('ul')                
                .data(color.domain())
                .enter()
                  .append("li")
                    .append('svg')
                    .attr('transform', (d, i) => `translate(0,${i * (line.height + line.spacing)})`);
  
  legend.append('svg:rect')
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', d => color(d));
  
  legend.append('svg:text')
    .data(nodes)
    .attr('x', line.width / 20)
    .attr('y', line.height / 2.5)
    .text(function(d){return getNameArray(d).reverse()[getNameArray(d).length-1].toString();})
    .style('fill', '#1c1c23');
};

function getNameArray(d, array) {
  array = array || [];
  // Push the current objects name to the array
  array.push(d.name);
  // Recurse to retrieve parent names
  if (d.parent) getNameArray(d.parent, array);
  return array;
};

addLegend();

// Updates breadcrumbs
function update_crumbs(d) {
  const crumb_container = d3.select('.crumbs');
  const sections = getNameArray(d);
  // Remove existing crumbs
  remove_crumbs();
  // Append new crumbs
  sections.reverse().forEach((name) => {
    crumb_container.append('span')
      .classed('crumb', true)
      .text(" > "+name);
  });
};
// Removes all crumb spans
function remove_crumbs() {
  d3.select('.crumbs').selectAll('.crumb').remove();
};
// Handle Clicks
function click(d) {
  arc_transition = arcs.transition('arc_tween')
    .duration(750)
    .attrTween('d', arcTween(d));
};

// Interpolate the scales!
function arcTween(d) {
  const xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]);
  const yd = d3.interpolate(y.domain(), [d.y, 1]);
  const yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return (d, i) => {
    return i ? t => arc_generator(d) : t => {
      x.domain(xd(t));
      y.domain(yd(t)).range(yr(t));
      return arc_generator(d);
    };
  };
};

// Fade a selection filtering out the comparator(s)
function fade(selection, opacity, comparators, comparatee) {
  const type = typeof comparators;
  const key = comparatee || 'value';
  selection.filter((d, i) => {
    if (type === 'string' || type === 'number')
    { // Remove elements based on a string or number
      return d[key] !== comparators;
    }else if(type === 'object' && typeof comparators.slice === 'function')
    { // Remove elements based on an array
      return comparators.indexOf(d[key]) === -1;
    }
    return true; // If there is no comparator keep everything
  })
          .transition('fade')
          .duration(250)
          .style('opacity', opacity);
};



};