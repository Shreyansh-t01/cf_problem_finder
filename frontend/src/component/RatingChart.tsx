import { useMemo } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface RatingChartProps {
  rating: [number, number][]; // [ratingBucket, numberOfQuestions]
}


export const RatingChart = ({ rating }: RatingChartProps) => {
  const data = useMemo(() => {
    const sorted = [...rating].sort((a, b) => a[0] - b[0]); // numeric sort, no mutation
     const colors:string[] = [];
let i;
for(i=0;i<sorted.length;i++){
    let st:string  = "rgb(128, 128, 128)";
     const rating = sorted[i][0];

     if(rating>1199 && rating<=1399) st =`rgb(0, 215, 0)`;
     else if(rating>=1400 && rating<1600) st = `rgb(3, 168, 158)`;
     else if(rating>=1600 && rating<1900) st = `rgb(0, 0, 255)`;
     else if(rating>=1900 && rating<2100) st = `rgb(170, 0, 170)`;
     else if(rating>=2100 && rating<2400) st = `rgb(255, 140, 0)`;
     else if(rating>=2400 && rating<3000) st = `rgb(255, 0, 0)`;
     else if(rating>=3000) st = `rgb(0, 0, 0)`;
    
     colors.push(st);       
}
    return {
      labels: sorted.map((r) => r[0]),
      datasets: [
        {
          label: 'Questions',
          data: sorted.map((r) => r[1]),
          backgroundColor:[
            ...colors
          ],
          hoverBackgroundColor: 'rgba(245, 84, 84, 1)',
          // borderRadius: 6,
          borderSkipped: false as const,
          maxBarThickness: 100,
          // barPercentage: 0.8,
          categoryPercentage: 0.9,
        },
      ],
    };
  }, [rating]);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    animation: { duration: 600, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false,
       },
      tooltip: {
        backgroundColor: '#111827',
        padding: 12,
    
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items) => `Rating ${items[0].label}`,
          label: (ctx) => `${ctx.parsed.y} questions`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        title: { display: true, text: 'Rating', color: '#6B7280' },
        ticks: { color: '#6B7280', padding: 6 },
      },
      y: {
        beginAtZero: true,
        grace: '10%', // headroom above the tallest bar
        border: { display: false },
        grid: { color: 'rgba(0,0,0,0.06)' },
        title: { display: true, text: 'Number of questions', color: '#6B7280' },
        ticks: { color: '#6B7280', padding: 2, maxTicksLimit: 6 },
      },
    },
  };

  return (
    <div className='lg:w-1/2 h-[50vh]  w-full bg-white rounded-xl '>
      <Bar options={options} data={data} />
    </div>
  );
};