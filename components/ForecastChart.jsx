import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ForecastChart({ forecast }) {

    const legend = "Temp, Celcium"
    const legend2 = "Real Feel, Celcium"

    const date = moment(forecast[0].dt * 1000).format('DD.MM.YYYY')

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: "#E0F2FE",
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: date,
                color: '#E0F2FE',
                font: {
                    size: 22
                }
            },
        },
        scales: {
            x: {
                grid: {
                    borderColor: '#CBD5E1',
                    tickColor: '#CBD5E1',
                    color: '#4B5563',
                },
                ticks: {
                    color: '#CBD5E1'
                }
            },
            y: {
                grid: {
                    borderColor: '#CBD5E1',
                    tickColor: '#CBD5E1',
                    color: '#4B5563',
                },
                ticks: {
                    color: '#CBD5E1'
                }
            }
        }
    }

    const labels = []

    for (let i = 0; i <= 21; i += 3) {
        labels.push(`${i < 10 ? `0${i}` : i}:00`)
    }

    const temp = forecast.map(item => item.main.temp)
    const feel = forecast.map(item => item.main.feels_like)

    const data = {
        labels,
        datasets: [
            {
                label: legend,
                data: temp,
                borderColor: '#0EA5E9',
                backgroundColor: '#0EA5E9',
                color: '#E0F2FE',
                pointRadius: 6,
                pointHoverRadius: 8
            },
            {
                label: legend2,
                data: feel,
                borderColor: '#EC4899',
                backgroundColor: '#EC4899',
                color: '#E0F2FE',
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    }

    return (
        <div className=' w-full max-w-2xl mx-auto my-6 bg-gray-800 p-6 rounded-xl shadow-lg'>
            <Line options={options} data={data} />
        </div>
    );
}
