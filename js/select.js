function select(chi) {
    d3.select("#s1").remove();
    const data = d3.csv("https://raw.githubusercontent.com/yxwxw/yxwxw.github.io/master/data/exp7.csv", function (d) {
        country = "USA"
        if ((+d.year) >= 1970)
            switch (chi) {
                case "China":
                    country = "CHINA"
                    return {
                        name: d.year,
                        // orient: d.side,
                        x: +d.china_birth,
                        y: +d.china_death
                    };
                    break;
                case "USA":
                    country = "USA"
                    return {
                        name: d.year,
                        // orient: d.side,
                        x: +d.usa_birth,
                        y: +d.usa_death
                    }
                    break;
                case "Japan":
                    country = "JAPAN"
                    return {
                        name: d.year,
                        // orient: d.side,
                        x: +d.japan_birth,
                        y: +d.japan_death
                    }
                    break;
                default:
                    break;
            }
    }).then(data => chart(data, country));
}