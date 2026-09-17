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
const options = {

}
const BarChart = {
    labels:[...taggedList],
    datasets:[{
        labels:[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300],
        data:[...questionList],
        backgroundColor:"green"
    }]
}


return (
    <Bar options={options} data={BarChart}/>
)
}