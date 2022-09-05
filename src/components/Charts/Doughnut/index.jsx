import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Container } from './style';

export const ChartDoughnut = ({ infos, colors, labels, isMoney = false }) => {
  const options = {
    scales: {
      x: {
        display: false,
        ticks: {
          callback: function (value, index, values) {
            return ""
          },
          color: "#000"
        },

      },
      y: {
        display: false,
        ticks: {
          callback: function (value, index, values) {
            return ''
          },
          color: "#000",
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
    hoverBorderJoinStyle: "bevel",
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
          label: function (context) {
            var label = labels[context.dataIndex];
            if (label) label += ': ';
            if(isMoney) label += new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(context.parsed);
            else label += context.parsed;
            return `  ${label}`;
          }
        }
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'dsafds',
        backgroundColor: colors,
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointRadius: 1,
        pointHitRadius: 10,
        data: infos
      }]
  }

  return (
    <Container haveData={!!infos}>
      <Doughnut type={''} options={options} data={data} />
    </Container>
  )
}