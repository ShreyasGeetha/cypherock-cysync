import {
  Container,
  LangDisplay,
  Typography,
  Flex,
  assetSwith,
  Image,
  walletIcon,
  DropDownListItemProps,
  ImageProps,
  Button,
  tablerGraph,
  Dropdown,
} from '@cypherock/cysync-ui';
import { font } from '@cypherock/cysync-ui/src/components/utils';
import axios from 'axios';
import { StatsBar } from './graphItems/StatsBar';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
// import 'chartjs-plugin-interaction'; // Import the interaction plugin
import moment from 'moment'
import {Graphdata} from "./GraphData"
import { any, string } from 'prop-types';
import React, { useEffect, useState ,useRef } from 'react';
import { time } from 'console';
import { type } from 'os';

const url = `https://api.coingecko.com/api/v3/coins/curve-dao-token/market_chart?vs_currency=usd&days=365`

type PriceDataTuple = number[];


type DateObject = string[];




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
          maxTicksLimit: 4, // Set the number of ticks you want
          stepSize: 1, 
          // maxTicksLimit: 3,
          // stepSize: 1  //  (Math.max(...pricedata) + Math.min(...pricedata))/5   //10, // Set the desired step size here (1 means show every label, 2 means show every other label, and so on)
        },
        grid: {
          offset: true,
          color: "#4B4B4B" // borderDash: [3, 3], // Creates a dotted line for grid lines
        },
        border: {
          dash: [10,10],
      }
      },
      x: {
        ticks: {
          padding: 20,
          maxTicksLimit: 6, // Set the desired step size here (1 means show every label, 2 means show every other label, and so on)
        },
        display: true,
        grid: {
          display: false, // Hide vertical grid lines on the x-axis
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
      // mode: 'index', // Show tooltip based on dataset index
      // intersect: false, // Prevent hiding tooltip when hovering between points
      mode: 'nearest', // Show tooltip for the nearest point on the curve
      intersect: false, // Prevent hiding tooltip when hovering between points
      callbacks: {
        title: () => 'test', // Disable title (optional)
        label: (context) => `Value: ${context.parsed.y}`, // Show the y-axis value in the tooltip
      },
    },
  },
  };


  useEffect (()=>{
    console.log('timeValue: ', timeValue);
    let timeValues: keyof typeof Graphdata = timeValue || "ALL"; // 
    setDates( Graphdata[timeValues].dates.map((date)=>{
      return moment(date).format("MMM-DD")
    }));
    setPriceData(Graphdata[timeValues].prices);
  },[timeValue])


  useEffect(() => {

        // setDates(['Aug-17', 'Aug-18', 'Aug-19', 'Aug-20', 'Aug-21', 'Aug-22', 'Aug-23', 'Aug-24', 'Aug-25', 'Aug-26' ])
        setDates( Graphdata['ALL'].dates.map((date)=>{
          return moment(date).format("MMM-DD")
        }))
        // timestamps = ['Aug-17', 'Aug-18', 'Aug-19', 'Aug-20', 'Aug-21', 'Aug-22', 'Aug-23' ]
        // setPriceData(pricess)
        setPriceData(Graphdata['ALL'].prices)
        if (chartRef.current) {
          if (chartInstance) {
            chartInstance.destroy(); // Destroy previous chart instance if it exists
          }
          chartInstance = new Chart(chartRef.current, {
            type: 'line',
            data:  {
              labels: dates,
              datasets: [
                {
                  data: pricedata ,// generateRandomDataArray(5,0,10),// [0 , 22.74, 15.56, 13.48, 18.62, 22.71, ],
                  borderColor: 'rgb(214, 0, 249)',
                  borderWidth: 1,
                  tension: 0.4,
                  fill: true,
                  pointRadius : 0,
                  hoverRadius :1,
                  backgroundColor: (context: any) => {
                    // Custom gradient logic
                    const {chart} = context;
                    const {ctx} = chart;
                    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                    gradient.addColorStop(0, 'rgba(214, 0, 249, 0.6)'); // Start color (opacity 0.8)
                    gradient.addColorStop(1, 'rgba(214, 0, 249, 0)');   // End color (opacity 0)
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
            chartInstance.destroy(); // Clean up the chart instance when the component unmounts
          }
        };
  }, []);


  useEffect(()=>{

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance if it exists
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data:  {
          labels: dates,
          datasets: [
            {
              data: pricedata ,// generateRandomDataArray(5,0,10),// [0 , 22.74, 15.56, 13.48, 18.62, 22.71, ],
              borderColor: 'rgb(214, 0, 249)',
              borderWidth: 1,
              tension: 0.4,
              fill: true,
              pointRadius : 0,
              hoverRadius :1,
              backgroundColor: (context: any) => {
                // Custom gradient logic
                const {chart} = context;
                const {ctx} = chart;
                const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
                gradient.addColorStop(0, 'rgba(214, 0, 249, 0.6)'); // Start color (opacity 0.8)
                gradient.addColorStop(1, 'rgba(214, 0, 249, 0)');   // End color (opacity 0)
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
        chartInstance.destroy(); // Clean up the chart instance when the component unmounts
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
            <Container 
            display= "flex"
            align-self= "stretch"
            pl='40' width='full' 
            gap={8} 
            align-items="center"
            justify='flex-start'>
              <svg height='15' width='15'>
              <polygon points="8.66,0 0,15 17.32,15" fill='lime' stroke='purple' strokeWidth='1px' />
              Green Arrow
            </svg>
            <Typography
                    color="muted"
                    $textAlign="left"
                    $letterSpacing={0.02}
                    direction="row"
                    display='flex'
                    font-family='Poppins'
                    align-self="stretch"
                    gap={8} 
                  >
                    <LangDisplay  text="2.3%" />
                    <LangDisplay  text="$ 00.321" />
                  </Typography>
            </Container>

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




