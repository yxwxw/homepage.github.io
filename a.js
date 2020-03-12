import * as d3 from "d3";
function chart(data) {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("g")
        .call(grid);

    svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 3);

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("dy", "0.35em")
        .attr("x", d => x(d.x) + 7)
        .attr("y", d => y(d.y))
        .text(d => d.name);

    return svg.node();
}