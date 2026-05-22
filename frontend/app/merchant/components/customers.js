'use client'
import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'

const CustomerSegmentation = ({ data }) => {
    const chartRef = useRef(null)
    const [chartInstance, setChartInstance] = useState(null)

    useEffect(() => {
        Chart.register(...registerables)
        return () => {
            if (chartInstance) {
                chartInstance.destroy()
                setChartInstance(null)
            }
        }
    }, [])

    useEffect(() => {
        if (!chartRef.current) return

        // Destroy previous chart instance before creating a new one
        if (chartInstance) {
            chartInstance.destroy()
            setChartInstance(null)
        }

        const ctx = chartRef.current.getContext('2d')
        if (!ctx) return

        try {
            // Default data structure when no data is provided
            const defaultData = {
                customerSegmentation: [
                    { name: 'No data', count: 0 }
                ],
                totalCustomers: 1 // To avoid division by zero in tooltip
            }

            const chartData = data?.customerSegmentation?.length > 0 ? data : defaultData
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.customerSegmentation.map(segment => segment.name),
                    datasets: [{
                        label: 'Customer Count',
                        data: chartData.customerSegmentation.map(segment => segment.count || 0),
                        backgroundColor: 'rgba(79, 70, 229, 0.8)',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const label = context.dataset.label || ''
                                    const value = context.raw || 0
                                    const total = chartData.totalCustomers || 1
                                    const percentage = Math.round((value / total) * 100)
                                    return `${label}: ${value} (${percentage}%)`
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            },
                            ticks: {
                                precision: 0
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
            console.error('Failed to render customer segmentation chart:', error)
        }
    }, [data])

    return (
        <div className="h-96">
            <canvas ref={chartRef} />
        </div>
    )
}

export default CustomerSegmentation