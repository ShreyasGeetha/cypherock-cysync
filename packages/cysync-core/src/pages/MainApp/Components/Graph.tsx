
import {
  Container,
  LangDisplay,
  Typography,
  Flex,
  Dropdown,
  TriangleUpGreen,
} from '@cypherock/cysync-ui';
import { Chart, ChartOptions } from 'chart.js/auto';
import moment from 'moment'
import React, { useEffect, useState ,useRef } from 'react';

import {Graphdata} from "./GraphData"
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
  color: ${({theme}) => theme.palette.text.muted}
`


export const LineChart: React.FC = () => {

  const [pricedata, setPriceData] = useState<PriceDataTuple>([]);
  const [dates, setDates] = useState<DateObject>([]);
  const [timeValue ,setTimeValue ] = useState<keyof typeof Graphdata | undefined>('ALL')
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartInstance: Chart | null = null;


  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 4, 
          stepSize: 1, 
        },
        grid: {
          offset: true,
          color: "#4B4B4B" 
        },
        border: {
          dash: [10,10],
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
      mode: 'nearest', 
      intersect: false, 
      callbacks: {
        title: () => 'test', 
        label: (context) => `Value: ${context.parsed.y}`, 
      },
    },
  },
  };


  useEffect (()=>{
    const timeValues: keyof typeof Graphdata = timeValue ?? "ALL"; 
    setDates( Graphdata[timeValues].dates.map((date)=>moment(date).format("MMM-DD")));
    setPriceData(Graphdata[timeValues].prices);
  },[timeValue])


  useEffect(() => {
        setDates( Graphdata.ALL.dates.map((date)=>moment(date).format("MMM-DD")))
        setPriceData(Graphdata.ALL.prices)
        if (chartRef.current) {
          if (chartInstance) {
            chartInstance.destroy(); 
          }
          chartInstance = new Chart(chartRef.current, {
            type: 'line',
            data:  {
              labels: dates,
              datasets: [
                {
                  data: pricedata ,
                  borderColor: 'rgb(214, 0, 249)',
                  borderWidth: 1,
                  tension: 0.4,
                  fill: true,
                  pointRadius : 0,
                  hoverRadius :1,
                  backgroundColor: (context: any) => {
                    const {chart} = context;
                    const {ctx} = chart;
                    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                    gradient.addColorStop(0, 'rgba(214, 0, 249, 0.6)'); 
                    gradient.addColorStop(1, 'rgba(214, 0, 249, 0)');   
                    return gradient;
                  },
                },
              ],
            },
            options,
          });
        }
        return () => {
          if (chartInstance) {
            chartInstance.destroy(); 
          }
        };
  }, []);


  useEffect(()=>{

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); 
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data:  {
          labels: dates,
          datasets: [
            {
              data: pricedata ,
              borderColor: (context: {chart: Chart}) => {
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
              pointRadius : 0,
              hoverRadius :1,
              backgroundColor: (context: any) => {                
                const {chart} = context;
                const {ctx} = chart;
                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                gradient.addColorStop(0, '#FFAC0A');
                gradient.addColorStop(1, 'rgba(40, 37, 37, 0.00)');
                return gradient;
              },
            },
          ],
        },
        options,
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); 
      }
    };
  },[pricedata , dates])


  const setTimeValueFn = (time: keyof  typeof Graphdata  | undefined) =>{
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
        height={222}
        
        >
              <canvas  ref={chartRef} />
        </Container>
            </Flex>
            )

};
Dropdown.defaultProps = {
  disabled: false,
  shouldShowIcon: true,
};




