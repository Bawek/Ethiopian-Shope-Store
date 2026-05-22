'use client'
import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { formatCurrency } from '@/util/currency'

const SalesTrendChart = ({ data, showComparison = false }) => {
  const chartRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null)

  useEffect(() => {
    Chart.register(...registerables)
    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (!data || !chartRef.current) return

    if (chartInstance) {
      chartInstance.destroy()
      setChartInstance(null)
    }

    const ctx = chartRef.current.getContext('2d')

    try {
      // Format dates as strings for labels
      const labels = data.currentPeriod.map(item => {
        const date = new Date(item.date)
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })
      })

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Current Period',
              data: data.currentPeriod.map(item => item.value),
              borderColor: 'rgba(79, 70, 229, 1)',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              tension: 0.3,
              fill: true
            },
            ...(showComparison ? [{
              label: 'Previous Period',
              data: data.previousPeriod?.map(item => item.value) || [],
              borderColor: 'rgba(156, 163, 175, 1)',
              backgroundColor: 'rgba(156, 163, 175, 0.1)',
              tension: 0.3,
              borderDash: [5, 5],
              fill: true
            }] : [])
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ''
                  if (label) label += ': '
                  if (context.parsed.y !== null) {
                    label += formatCurrency(context.parsed.y)
                  }
                  return label
                },
                title: (tooltipItems) => {
                  // Use the original date from data for tooltip title
                  const item = data.currentPeriod[tooltipItems[0].dataIndex]
                  const date = new Date(item.date)
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                drawBorder: false,
              },
              ticks: {
                callback: (value) => {
                  return formatCurrency(value)
                }
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          }
        }
      })

      setChartInstance(newChartInstance)
    } catch (error) {
      console.error('Failed to render sales trend chart:', error)
    }
  }, [data, showComparison])

  if (!data) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        No sales data available
      </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <canvas ref={chartRef} />
    </div>
  )
}

export default SalesTrendChart