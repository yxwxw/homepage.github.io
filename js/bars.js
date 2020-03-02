function bars(name, tic, clo) {
    var data = [];
    const width = 600, height = 500;
    const theX = tic % 4 + 1;
    // console.log("theX = " + theX);
    const theY = Math.floor(tic / 4);
    // console.log("theY = " + theY);
    const offset = 15;
    
    while (data.length < 8) {
        data.push(Math.random());
    }

    const svg = d3
        .select("div .box1")
        .select("svg")
        .attr("viewBox", [0, 0, width, height])
        .style("background", "white");

    const x = d3
        .scaleLinear()
        .domain([0, 1])
        .nice()
        .range([0, 100]);

    svg
        .append("g")
        .append("text")
        .text(name)
        .attr("x", theX * 120 + offset)
        .attr("y", 7 + theY * 100)
        .attr("font-size", "7")
        .attr("transform", "translate(3, 0)");

    svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", theX * 120 + offset)
        .attr("y", function(d, i) {
            return 10 * (i + 1) + theY * 100;
        })
        .attr("width", d => x(d))
        .attr("height", function(){
            return 8;
        })
        .attr("fill", clo);
    
    svg.
        append("line")
        .attr("x1", theX * 120 + offset)
        .attr("y1", theY * 100)
        .attr("x2", theX * 120 + offset)
        .attr("y2", (theY + 1) * 100 - 5)
        .attr("stroke", "#bec2bc")
        .attr("stoke-width", "0.1px");
}