import { useMemo } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface taggedType extends React.HTMLAttributes<HTMLDivElement> {
    tagged:[string,number][]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const palette = ['#566cf0', '#39b78b', '#f1a64a', '#e86f81', '#8c68d9', '#35a9c6', '#9eae4f', '#e28448']

export const TagChart = (props:taggedType)=>{
    const data = useMemo(() => ({
        labels: props.tagged.map(([tag]) => tag),
        datasets:[{
            data: props.tagged.map(([, count]) => count),
            backgroundColor: props.tagged.map((_, index) => palette[index % palette.length]),
           
            
            hoverOffset: 5,
            cutout: '66%',
        }],
    }), [props.tagged])

    const chartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    color: '#68748c',
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 7,
                    boxHeight: 7,
                    padding: 14,
                    font: { size: 10, weight: 600 },
                },
            },
            tooltip: {
                backgroundColor: '#172033',
                padding: 11,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: (context) => ` ${context.label}: ${context.parsed} questions`,
                },
            },
        },
    }

    return (
        <div className="chart-card">
            {/* <div className="mb-4">
                <h3 className="text-sm font-bold text-[#202a40]">Problems by tag</h3>
                <p className="mt-1 text-xs text-[#9099ab]">Topics covered in your solved set</p>
            </div> */}
            <div className="chart-canvas ">
                <Doughnut options={chartOptions} data={data}/>
            </div>
        </div>
    )
}
