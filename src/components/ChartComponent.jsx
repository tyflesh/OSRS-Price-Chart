import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import React from 'react';
import { Loader, Skeleton } from '@mantine/core';


const ChartComponent = ({ itemData, searching }) => {

  const setChart = () => {
    let data = [];

    for (let i = 178; i > 0; i -= 30) {
      data.push(itemData.trade[i].priceDaily);
    }

    let myChart = {};

    myChart.data = {
      labels: ['December', 'January', 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'Monthly Average',
        data: data,
        borderColor: [
          'rgb(79, 223, 156)'
        ],
        borderWidth: 3,
        tension: 0.1,
        fill: false
      }]
    }

    return myChart;
  };

  if (!itemData && !searching) {
    return (<div>

    </div>)
  } else {
    return searching
      ? (
        <div>
          <Skeleton className='chart-loading-skeleton' height={500} mt={6} width="70%" radius="xl" />
          <Loader className='chart-loading-bars' color="teal" size="xl" variant="bars" />
        </div>
      )
      :
      (
        <Line className='chart' data={setChart().data} />
      )
  }

  return (
    <div>
      <Skeleton className='chart-loading-skeleton' height={500} mt={6} width="70%" radius="xl" />
      <Loader className='chart-loading-bars' color="teal" size="xl" variant="bars" />
    </div>

  )
};

export default ChartComponent;