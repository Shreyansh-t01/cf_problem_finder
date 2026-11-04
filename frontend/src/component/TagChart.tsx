import {Chart, plugins} from 'chart.js'
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

// we want randomly generating colours for different tags 



const colors:string[] = [];
let i;
for(i=0;i<taggedList.length;i++){
    const num1 = Math.random()*256;
    const num2 = Math.random()*256;
    const num3  = Math.random()*256;
    
     colors.push(`rgb(${num1},${num2},${num3})`);       
}
const  DoughnutChart = {
    labels:[...taggedList],
    datasets:[{
        data:[...questionList],
        maxBarThickness:80,
        backgroundColor:[
           ...colors
        ],
        padding:10,
        options:{
            plugins:{
                legend:{
                    position:'right'
                }
            }
        }
    
    }]
}

return (

    <div className='lg:w-1/2 w-full '>
         <Doughnut options={chartOptions} data={DoughnutChart}/>
    </div>
   
)
}