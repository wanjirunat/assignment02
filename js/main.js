// import data
const data = [  {campus: "UT KNOXVILLE", enrollment: 29460, color: '#fd8105' },  
                {campus: "UT CHATTANOOGA", enrollment:11590, color:'#ecaa1f'},  
                {campus: "MARTIN", enrollment: 7280, color: '#0e223f'},  
                {campus: "HEALTH SCIENCE CENTER", enrollment: 2815, color: '#036646'}
];

// common dimensions
const margin = {top: 30, right: 30, bottom: 120, left: 60},
    width = 560 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// svg parameters
const svg = d3.select("body")
  .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // x axis and append 
const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.campus; }))
    .padding(0.2)
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", `0, translate(${height})`)
            .attr("x", 0)
            .attr("y", 10)
            .attr("font-size", "10px");

  // y axis and append 
const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.enrollment)])
    .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y).ticks(6).tickSizeOuter(0));

  // Bars
  svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.campus); })
      .attr("y", function(d) { return y(d.enrollment); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.enrollment); })
      .attr('fill', d => d.color);
    
// title of bar chart
    svg.append("text")
        .attr("transform", `0, translate(${height})`)
        .attr("x", 200)
        .attr("y", 12)
        .attr("font-size", "15px")
        .text("The Enrollment of UT Campuses");