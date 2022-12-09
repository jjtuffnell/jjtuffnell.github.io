var dataset; //global variable to hold csv data
var w = 1400;
var h = 300;



d3.csv("diabetes.csv", function (data) {
  dataset = data;


 
  var svg = d3.select("body") //creates svg
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  //sorts bars on click 
  var sortBars = function () {
    //flips value of sortOrder
    svg.selectAll("rect")
    .transition()
    .duration(1500)
    .attr("x", function (d, i) {
      return d['Glucose'] * 5;
    });
     
  };
  var clearText = function () {
    //clears blood pressure numbers once clicked
    d3.selectAll("text").remove()

  }
  var addBack = function(){
    addText.text(function(d) {
      return d['BMI'];
 })
  }

  svg.selectAll("rect") //prints rectangles from data
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return h - d['Age']
    })
    .attr("x", function (d, i) {
      return i * (w / dataset.length);  //Bar width of 20 plus 1 for padding
    })
    .attr("width", w / dataset.length)
    .attr("height", function (d) { //height reflects age
      return h - d['Age'];
    })
    .attr("fill", function (d) { //color reflects outcome
      return "rgb(" + (d['Outcome'] * 250) + ",0, 0)";
    })
    .on("click", function (d) {
      sortBars();
      clearText();
    })
    .on("mouseover", function (d) {
      d3.select(this)
        .attr("fill", "yellow")
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .transition()
        .delay(function(d, i){
          return i * 50;
        })
        .duration(1000)
        .attr("fill", "rgb(" + (d['Outcome'] * 250) + ",0, 0)")
        .attr("width", w / dataset.length)
    })
    var addText = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")

    addText.text(function(d) {
      return d['BMI'];
 })
.attr("x", function (d, i) {
  return i * (w / dataset.length);  //Bar width of 20 plus 1 for padding
})
  .attr("y", function (d) {
    return h-d['Age'] * 5 + 35
  })
  .on("mouseover", function (d){
    d3.select(this)
        .attr("fill", "yellow")
  })
  .on("mouseout", function (d){
    d3.select(this)
    .transition()
    .duration(1000)
    .attr("fill", "black")
  })
  

});

