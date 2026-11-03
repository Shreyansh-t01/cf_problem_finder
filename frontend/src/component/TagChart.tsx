import {Chart} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import {
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

interface taggedType extends React.HTMLAttributes<HTMLDivElement> {
    tagged:[string,number][] 
}
export const TagChart = (props:taggedType)=>{
    const tagged = props.tagged;
    const taggedList:string[] = [];
    const questionList:number[] = []
    tagged.map((e:[string,number])=>{
      taggedList.push(e[0]);
      questionList.push(e[1]);
    })

Chart.register({
    ArcElement,
    Tooltip,
    Legend
})
const chartOptions = {
 
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'black'
                },
                position:'right'

            }
        }
    
}
const  DoughnutChart = {
    labels:[...taggedList],
    datasets:[{
        data:[...questionList],
        maxBarThickness:80,
        backgroundColor:"red",
        padding:10
        
    
        

    }]
}




return (
    <Doughnut  options={chartOptions} data={DoughnutChart}/>
)
}