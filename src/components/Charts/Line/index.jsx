import React from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from './style';

const defaultTooltipFunction = (context) => {
  var label = context.dataset.label || '';
  if (label) label += ': ';
  if (context.parsed.y !== null) {
    label += context.parsed.y;
  }
  return `  ${label}`;
}

const defaultLabelYFunction = (value, index, values) => value || ''

export const ChartLine = ({
  infos,
  color = '#000',
  labels,
  labelYFunction = defaultLabelYFunction,
  labelTooltipFunction = defaultTooltipFunction,
  secondary,
}) => {
  const options = {
    scales: {
      x: {
        display: true,
        grid: {
        },
        ticks: {
          callback: function (value, index, values) {
            return labels[index]
          },
          color: color,
          font: {
            family: "Nunito",
            weight: "bold"
          }
        },
      },
      y: {
        grid: {
        },
        ticks: {
          callback: labelYFunction,
          color: color,
          font: {
            family: "Nunito",
            weight: "bold"
          }
        },
        beginAtZero: true
      }
    },
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      labelFontColor: '#FFF',
      tooltip: {
        bodyFont: {
          family: "Nunito",
          weight: "bold"
        },
        titleFont: {
          family: "Nunito",
          weight: "bold"
        },
        yAlign: 'bottom',
        xAlign: "center",
        callbacks: {
          label: labelTooltipFunction
        },
        overflow: 'scroll',
      }
    }
  }
  const data = {
    labels: labels,
    datasets: []
  }
  for (const info of infos) {
    data.datasets.push({
      label: info.name,
      backgroundColor: info.color || '#FF9000',
      borderColor: info.color || '#FF9000',
      borderCapStyle: 'butt',
      borderJoinStyle: 'miter',
      borderRadius: 5,
      pointRadius: 1,
      maxBarThickness: 25,
      tension: 0.4,
      pointHitRadius: 10,
      borderDash: [5, 5],
      data: info.values,
    })
  }

  return (
    <Container haveData={!!infos.data}>
      <Line type options={options} data={data} />
    </Container>
  )
}