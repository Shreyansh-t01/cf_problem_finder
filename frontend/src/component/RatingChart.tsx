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

interface ratingType extends React.HTMLAttributes<HTMLDivElement> {
    rating:[number,number][] 
}

export const RatingChart = (props:ratingType)=>{
    Chart.register({
         BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
    });
  const ratings:[number,number][] = props.rating
  ratings.sort()
  const ratingsInOrder:number[] = []
  const questionsInOrder:number[] = []
  ratings.map((e:[number,number])=>{
ratingsInOrder.push(e[0]);
questionsInOrder.push(e[1]);
  })
  
  const options = {

  }
    const barChartData = {
        labels:[...ratingsInOrder],
        datasets:[
            {
                labels:[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300],
                data:[...questionsInOrder],
                backgroundColor:"rgba(255, 127, 127, 0.5)"
            }
        ]
    }

    return (
        <Bar options={options} data={barChartData}/>
    )
}