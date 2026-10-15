import {Chart} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import {
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

interface taggedType extends React.HTMLAttributes<HTMLDivElement> {
    tagged:[string,number][] 
}
export const TagChart = (props:taggedType)=>{
    const tagged = props.tagged
    const taggedList:string[] = [];
    const questionList:number[] = []
    tagged.map((e:[string,number])=>{
      taggedList.push(e[0]);
      questionList.push(e[1]);
    })

Chart.register({
     BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
})
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Hide if you rely on the top cards for context, or fix the 'undefined' label
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 6,
    }
  },
  scales: {
    x: {
      grid: {
        display: false, // Removes vertical grid lines for a cleaner look
        drawBorder: false
      },
      ticks: {
        color: '#6b7280',
        // KEY SETTINGS FOR OVERLAPPING LABELS:
        autoSkip: true,       // Automatically hides labels if they are too dense
        maxTicksLimit: 15,    // Set a hard limit on the maximum number of labels to display
        maxRotation: 45,      // Angles the labels up to 45 degrees if they start colliding
        minRotation: 0        // Keeps them horizontal if there is enough room
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280',
        padding: 10
      }
    }
  }
};
const BarChart = {
    labels:[...taggedList],
    datasets:[{
        labels:[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300],
        data:[...questionList],
        backgroundColor:"green",
        maxBarThickness:40,
        barPercentage: 0.6 
    }]
}


return (
    <Bar options={chartOptions} data={BarChart}/>
)
}