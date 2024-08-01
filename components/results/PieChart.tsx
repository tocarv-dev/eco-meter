'use client';

import { Doughnut } from 'react-chartjs-2';
import React from 'react'

import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

interface ResultPageClientProps {
  data: number[],
}

export default function PieChart({ data }: ResultPageClientProps) {
  const chart = {
    labels: [
      'Red',
      'Green',
      'Yellow',
      "purple"
    ],
    datasets: [{
      data: data,
      backgroundColor: [
      'hsl(213, 96%, 18%)',
      'hsl(243, 100%, 62%)',
      'hsl(354, 84%, 57%)',
      "hsl(177, 100%, 32%)",
      ]
    }]
  };

    let props = {
      datasets:[{
          data: data,
          backgroundColor: [ 
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
          ],
          label: 'Toneladas CO2'
      }],
      labels: [
          'Casa',
          'Transportes',
          'Alimentação',
          'Resíduos'
      ],
      options: {
        title: {
          display: true,
          text: "World Wide Wine Production 2018"
        }
      }
    }
  return (
    <div>
      <Doughnut data={chart} width={400} height={400}/>
    </div>
  );
}