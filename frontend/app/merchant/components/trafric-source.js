'use client'
import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'

const TrafficSourcesChart = ({ data, detailed = false }) => {
    const chartRef = useRef(null)
    const [chartInstance, setChartInstance] = useState(null)

    useEffect(() => {
        // Register required Chart.js components
        Chart.register(...registerables)

        return () => {
            // Cleanup chart instance on unmount
            if (chartInstance) {
                chartInstance.destroy()
            }
        }
    }, [])

    useEffect(() => {
        if (!data || !chartRef.current) return

        // Destroy previous chart instance if exists
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartRef.current.getContext('2d')

        try {
            const newChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.map(item => item.source),
                    datasets: [{
                        label: 'Visitors',
                        data: data.map(item => item.count),
                        backgroundColor: [
                            'rgba(79, 70, 229, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(59, 130, 246, 0.8)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: detailed ? 'right' : 'bottom',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = context.label || ''
                                    const value = context.raw || 0
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0)
                                    const percentage = Math.round((value / total) * 100)
                                    return `${label}: ${value} (${percentage}%)`
                                }
                            }
                        }
                    },
                    cutout: detailed ? '50%' : '70%'
                }
            })

            setChartInstance(newChartInstance)
        } catch (error) {
            console.error('Failed to render traffic sources chart:', error)
        }
    }, [data, detailed])

    if (!data) {
        return (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
                No traffic data available
            </div>
        )
    }

    return (
        <div className={detailed ? "h-96" : "h-80"}>
            <canvas ref={chartRef} />
        </div>
    )
}

export default TrafficSourcesChart