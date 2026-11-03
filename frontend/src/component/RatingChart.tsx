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

    return {
      labels: sorted.map((r) => r[0]),
      datasets: [
        {
          label: 'Questions',
          data: sorted.map((r) => r[1]),
          backgroundColor: 'rgba(204, 72, 72, 0.9)',
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
        ticks: { color: '#6B7280', padding: 8 },
      },
      y: {
        beginAtZero: true,
        grace: '10%', // headroom above the tallest bar
        border: { display: false },
        grid: { color: 'rgba(0,0,0,0.06)' },
        title: { display: true, text: 'Number of questions', color: '#6B7280' },
        ticks: { color: '#6B7280', padding: 8, maxTicksLimit: 6 },
      },
    },
  };

  return (
    <div className='w-full h-90'>
      <Bar options={options} data={data} />
    </div>
  );
};