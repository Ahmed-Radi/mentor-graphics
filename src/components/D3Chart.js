import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './style/ResponsiveBar.scss'

const BarChart = ({ data }) => {

    const apiData = data && data?.map(d=> [{index: +d.index, temp: +d.avgMinTemp}][0])
    // const [characterData, setChartData] = React.useState(apiData)

	const d3Chart = useRef()

	const margin = {top: 50, right:30, bottom: 30, left:60}

	useEffect(()=>{
        // setChartData(apiData)
		const chartWidth = parseInt(d3.select('#d3container').style('width')) - margin.left - margin.right
		const chartHeight = parseInt(d3.select('#d3container').style('height')) - margin.top - margin.bottom

		const svg = d3.select(d3Chart.current).style('background', '#d3d3d3')
						.attr('width', chartWidth + margin.left + margin.right)
						.attr('height', chartHeight + margin.top + margin.bottom)
                        .attr('preserveAspectRatio', 'xMinYMin meet')
                        .attr(
                            'viewBox',
                            `0 0 ${(chartWidth + margin.left + margin.right)}
                            ${(chartHeight + margin.top + margin.bottom)}`
                        )

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(apiData.length))
					.range([margin.left, chartWidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartHeight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>apiData[i].index).tickSizeOuter(0))

		const max = d3.max(apiData, function(d){return d.temp})

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartHeight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		// Draw bars
		svg.append('g')
			.attr('fill','#65f0eb')
			.selectAll('rect')
			.data(apiData)
			.join('rect')
				.attr('x', (d,i) => x(i))
				.attr('y', d => y(d.temp))
				.attr('height', d=>y(0)-y(d.temp))
				.attr('width', x.bandwidth())

	},[apiData, margin.bottom, margin.left, margin.right, margin.top])

	return (
		<div id='d3container'>
            <svg className='svg' ref={d3Chart}></svg>
		</div>
	)
}

export default BarChart