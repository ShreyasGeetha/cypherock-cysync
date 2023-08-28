
import {
  Container,
  LangDisplay,
  Typography,
  Flex,
  Dropdown,
  TriangleUpGreen,
} from '@cypherock/cysync-ui';
import { Chart, ChartOptions, TooltipItem, ChartTypeRegistry, TooltipOptions, ChartType, ChartData, Plugin } from 'chart.js/auto';
import moment from 'moment'
import React, { useEffect, useState, useRef } from 'react';

import { Graphdata } from "./GraphData"
import { StatsBar } from './graphItems/StatsBar';
import { styled } from 'styled-components';


type PriceDataTuple = number[];


type DateObject = string[];

const ChartTypography = styled(Typography)`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-align: right;
  color: ${({ theme }) => theme.palette.text.muted}
`
const tooltipStyle: React.CSSProperties = {
  display: 'block',
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  padding: '8px',
  left: '0',
  top: '0',
  zIndex: 99,
};

export const LineChart: React.FC = () => {

  const [pricedata, setPriceData] = useState<PriceDataTuple>([]);
  const [dates, setDates] = useState<DateObject>([]);
  const [timeValue, setTimeValue] = useState<keyof typeof Graphdata | undefined>('ALL')
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart | null = null;

  const plugins: Plugin[] = [
    {
      id: "tooltipLine",
      afterDraw: (chart: Chart) => {
        if (chart?.tooltip?.opacity === 1) {
          const {
            ctx
          } = chart;
          const {
            caretX, caretY
          } = chart.tooltip;
          const topY = chart.scales.y.top;
          const bottomY = chart.scales.y.bottom;
          ctx.save();
          ctx.beginPath();
          ctx.setLineDash([10, 10]);
          ctx.fill();
          ctx.closePath();
          ctx.moveTo(caretX, topY - 30);
          ctx.lineTo(caretX, bottomY);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#B78D51"
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    {
      id: "tooltiCircle",
      afterDraw: (chart: Chart) => {
        // console.log('chart: ', chart);
        if (chart?.tooltip?.opacity === 1) {
          const {
            ctx
          } = chart;
          const {
            caretX, caretY
          } = chart.tooltip;

          ctx.save();
          ctx.beginPath();
          ctx.arc(caretX, caretY, 5, 0, 360);
          // ctx.setLineDash([10, 10]);
          ctx.lineWidth = 2;
          ctx.fillStyle = '#0F0D0B'; // Circle color
          ctx.strokeStyle = "#B78D51"
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    {
      id: 'customTooltip',
      afterDraw: (chart: Chart, options:ChartOptions) => {
        if (chart?.tooltip?.opacity === 1) {
          const { ctx } = chart;
          const { caretX, caretY } = chart.tooltip;
          const chartCenterX = (chart.chartArea.left + chart.chartArea.right) / 2;

          // Determine the side (left or right) based on the caretX position relative to the chart center
          const isTooltipOnRight = caretX > chartCenterX;
          // console.log('chart?.tooltip?.dataPoints[0]?.dataset?.data[chart?.tooltip?.dataPoints[0]?.dataset?.data?.length -1]: ', chart?.tooltip?.dataPoints[0]?.dataset?.data[chart?.tooltip?.dataPoints[0]?.dataset?.data?.length -1] ,parseInt(chart?.tooltip?.dataPoints[0].formattedValue) ,chart?.tooltip?.dataPoints[0]?.dataset?.data[chart?.tooltip?.dataPoints[0]?.dataset?.data?.length -1] - parseInt(chart?.tooltip?.dataPoints[0].formattedValue,10) );
          // let lastValueOnXaxis = chart?.tooltip?.dataPoints[0]?.dataset?.data[chart?.tooltip?.dataPoints[0]?.dataset?.data?.length - 1];
          // let xAxisPoint = parseInt(chart?.tooltip?.dataPoints[0].formattedValue, 10);
          // if (lastValueOnXaxis !== null && !isNaN(lastValueOnXaxis) && !isNaN(xAxisPoint)) {
          //   let nextvalue = lastValueOnXaxis - xAxisPoint;
          //   console.log(nextvalue);
          // }
          // console.log('lastValueOnXaxis: ', lastValueOnXaxis ,xAxisPoint );

          console.log('chart.tooltip?.dataPoints?[0]?.label?.parsed: ', chart.tooltip ,chart.tooltip?.dataPoints[0]?.dataset?.data);

          // Define custom tooltip content including X and Y values
          const tooltipText = `\u25CF \n${chart.tooltip?.dataPoints[0].formattedValue} |  \n\u25CF \n${chart.tooltip?.dataPoints[0]?.label}`; // Include X and Y values in the tooltip

          // Define tooltip width and height
          const tooltipWidth = 200;
          const tooltipHeight = 25;

          // Calculate tooltip position
          let tooltipX = caretX; // By default, align with the tooltip caret
          let tooltipY = caretY - tooltipHeight / 2; // Center vertically
          let toolTipDistanceFromX = 10
          // Adjust tooltip position to the left if it's on the right side, and vice versa
          if (isTooltipOnRight) {
            tooltipX = caretX - tooltipWidth;
            toolTipDistanceFromX = -10
          }

          // Draw the custom tooltip background
          ctx.save();
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(tooltipX + toolTipDistanceFromX, tooltipY, tooltipWidth, tooltipHeight);
          ctx.restore();

          // Draw the custom tooltip text
          ctx.save();
          ctx.fillStyle = '#FEDD8F';
          ctx.font = '14px Poppins';
          ctx.fillText(tooltipText, tooltipX + toolTipDistanceFromX + 10, tooltipY + tooltipHeight / 2 + 5);
          ctx.restore();
          // Disable the built-in tooltip
          console.log('chart?.config?.options?.plugins?.tooltip?.enabled: 1',Chart.defaults.plugins.tooltip.enabled);
          // if (Chart.defaults.plugins.tooltip.enabled === true) {
          //   console.log('options?.plugins?.tooltip?.enabled: ', options?.plugins?.tooltip?.enabled);
          //   // console.log('chart?.config?.options?.plugins?.tooltip?.enabled: ', chart?.config?.options?.plugins?.tooltip?.enabled);
          //   Chart.defaults.plugins.tooltip.enabled = false
          //   // options.plugins.tooltip.enabled = false;
          // }
        }
      },
    },
  ];
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 6,
          stepSize: 4,
        },
        grid: {
          offset: true,
          color: "#4B4B4B"
        },
        border: {
          dash: [10, 10],
        }
      },
      x: {
        ticks: {
          padding: 20,
          maxTicksLimit: 6,
        },
        display: true,
        grid: {
          display: false,
        },
      },

    },
    layout: {
      padding: {
        left: 40,
        right: 40,
        top: 48
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        // custom : (tooltipModel) =>{ tooltipModel.opacity = 0 },
        callbacks: {
          title: () => { return ""  },
          label: (context) => { return "" },
        },
      }
    },
  };


  useEffect(() => {
    const timeValues: keyof typeof Graphdata = timeValue ?? "ALL";
    setDates(Graphdata[timeValues].dates.map((date) => moment(date).format("MMM-DD")));
    setPriceData(Graphdata[timeValues].prices);
  }, [timeValue])


  useEffect(() => {
    setDates(Graphdata.ALL.dates.map((date) => moment(date).format("MMM-DD")))
    setPriceData(Graphdata.ALL.prices)
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: pricedata,
              borderColor: 'rgb(214, 0, 249)',
              borderWidth: 1,
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              hoverRadius: 1,
              backgroundColor: (context: any) => {
                const { chart } = context;
                const { ctx } = chart;
                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                gradient.addColorStop(0, 'rgba(214, 0, 249, 0.6)');
                gradient.addColorStop(1, 'rgba(214, 0, 249, 0)');
                return gradient;
              },
            },
          ],
        },
        options,
        plugins: plugins
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);


  useEffect(() => {

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: pricedata,
              borderColor: (context: { chart: Chart }) => {
                const { chart } = context;
                const { ctx } = chart;
                const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
                gradient.addColorStop(0.0019, '#E9B873');
                gradient.addColorStop(0.3717, '#FEDD8F');
                gradient.addColorStop(1, '#B78D51');
                return gradient;
              },
              borderWidth: 1,
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              hoverRadius: 1,
              backgroundColor: (context: any) => {
                const { chart } = context;
                const { ctx } = chart;
                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                gradient.addColorStop(0, '#FFAC0A');
                gradient.addColorStop(1, 'rgba(40, 37, 37, 0.00)');
                return gradient;
              },
            },
          ],
        },
        options,
        plugins: plugins
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [pricedata, dates])


  const setTimeValueFn = (time: keyof typeof Graphdata | undefined) => {
    setTimeValue(time)
  }


  return (
    <Flex
      direction="column"
      $bgColor="contentGradient"
      p={4}
      display="flex"
    >
      <StatsBar
        setTimeValueFn={setTimeValueFn}
      />
      {/* mid line */}
      <Flex px={5} pt={2}>
        <Flex gap={8} align='center'>
          <TriangleUpGreen />
          <ChartTypography>
            <LangDisplay text='2.3%' />
          </ChartTypography>
          <ChartTypography >
            <LangDisplay text='$00.321' />
          </ChartTypography>
        </Flex>
      </Flex>

      {/* Graph  */}
      <Container
        // height={340}
        // width={340}
        top={48}
        left={40}
        right={40}
      >
        <canvas
          height={340}
          // width={340}
          ref={chartRef} />
      </Container>
    </Flex>
  )

};
Dropdown.defaultProps = {
  disabled: false,
  shouldShowIcon: true,
};




