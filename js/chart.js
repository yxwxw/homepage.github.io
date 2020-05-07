function chart(data, country) {
    data.x = "birth rate 1/1000";
    data.y = "death rate 1/1000";

    function length(path) {
        return d3.create("svg:path").attr("d", path).node().getTotalLength();
    }

    function halo(text) {
        text.select(function () { return this.parentNode.insertBefore(this.cloneNode(true), this); })
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .attr("stroke-linejoin", "round");
    }
    margin = ({ top: 20, right: 30, bottom: 30, left: 40 })
    height = 700;
    width = 700;
    y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y)).nice()
        .range([height - margin.bottom, margin.top])

    x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x)).nice()
        .range([margin.left, width - margin.right])

    // 采用三次样条插值拟合曲线
    line = d3.line()
        .curve(d3.curveNatural)
        .x(d => x(d.x))
        .y(d => y(d.y))

    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, ".2f"))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.1))
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text(data.y)
            .call(halo))

    Country = g => g
        .attr("transform", `translate(200, 200)`)
        .attr("fill", "#C0C0C0")
        .attr("font-size", 100)
        .text(country)

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", -height)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", width - 4)
            .attr("y", -4)
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text(data.x)
            .call(halo))

    const svg = d3.select("body")
        .select("#d1")
        .append("svg")
        .attr("id", "s1")
        .attr("viewBox", [0, 0, width, height]);

    const l = length(line(data));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("text")
        .call(Country);

    // 画路径
    // 其中的trainsition()函数用于实现动画
    // duration是动画的持续时间
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", `0,${l}`)
        .attr("d", line)
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attr("stroke-dasharray", `${l},${l}`);

    // 画圆圈
    svg.append("g")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.x))
        .attr("cy", d => y(d.y))
        .attr("r", 3);

    // 设置每一个标签点
    const label = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
        .attr("opacity", 0);

    label.append("text")
        .text(d => d.name)
        .each(function (d) {
            const t = d3.select(this);
            t.attr("text-anchor", "middle").attr("dy", "1.4em");
        })
        .call(halo);

    label.transition()
        .delay((d, i) => length(line(data.slice(0, i + 1))) / l * (5000 - 125))
        .attr("opacity", 1);
}