var dataset;
var w = 1200;
var h = 1200;
d3.csv("diabetes.csv", function (data) {
    dataset = data;

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) { return d['Glucose']; })])
        .range([0, w]);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) { return d['BloodPressure']; })])
        .range([0, h]);
    var svg = d3.select("body") //creates svg
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("circle") //prints rectangles from data
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return d['Glucose'] * 5;
        })
        .attr("cy", function (d) {
            return d['BloodPressure'] * 5 + 100;
        })
        .attr("r", 3);

        svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
    return "("+ d['Glucose'] + "," + d['BloodPressure'] + ")";
})
.attr("x", function(d) {
    return d['Glucose'] * 5;
})
.attr("y", function(d) {
    console.log(d['BloodPressure'])
    return d['BloodPressure'] * 5 + 100;
})

   .attr("fill", "white")
   .on("mouseover", function (d) {
    d3.select(this)
      .attr("fill", "yellow")
  })
  .on("mouseout", function(d){
    d3.select(this)
        .transition()
        .duration(1000)
        .attr("fill", "white")
  })

});