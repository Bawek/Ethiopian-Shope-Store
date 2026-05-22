'use client'
import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { formatCurrency } from '@/util/currency'

const ProductPerformance = ({ data }) => {
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
    if (!chartRef.current) return
    if (chartInstance) {
      chartInstance.destroy()
      setChartInstance(null)
    }

    const ctx = chartRef.current.getContext('2d')

    try {
      // Default data structure when no data is provided
      const defaultData = {
        products: [
          { name: 'No data', unitsSold: 0, revenue: 0 }
        ]
      }

      const chartData = data?.products?.length > 0 ? data : defaultData

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: chartData.products.map(product => product.name),
          datasets: [
            {
              label: 'Units Sold',
              data: chartData.products.map(product => product.unitsSold || 0),
              backgroundColor: 'rgba(79, 70, 229, 0.8)',
              yAxisID: 'y'
            },
            {
              label: 'Revenue',
              data: chartData.products.map(product => product.revenue || 0),
              backgroundColor: 'rgba(16, 185, 129, 0.8)',
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ''
                  if (label) label += ': '
                  if (context.parsed.y !== null) {
                    label += context.dataset.yAxisID === 'y1'
                      ? formatCurrency(context.parsed.y)
                      : context.parsed.y.toLocaleString()
                  }
                  return label
                }
              }
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Units Sold'
              },
              grid: {
                drawBorder: false
              },
              ticks: {
                precision: 0,
                beginAtZero: true
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Revenue'
              },
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                beginAtZero: true,
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
          }
        }
      })

      setChartInstance(newChartInstance)
    } catch (error) {
      console.error('Failed to render product performance chart:', error)
    }
  }, [data])

  return (
    <div className="h-96">
      <canvas ref={chartRef} />
    </div>
  )
}

export default ProductPerformance