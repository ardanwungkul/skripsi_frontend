<script setup>
import { onMounted } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'My Dataset',
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4,
        },
    ],
}

const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw
                },
            },
        },
    },
}

onMounted(() => {
    new Chart(document.getElementById('chart'), {
        type: 'pie',
        data: data,
        options: options,
    })
})
</script>
<template>
    <div
        class="rounded-lg dark:bg-dark-primary-2 bg-light-primary-1 shadow-lg dark:shadow-typography-3 relative flex-grow p-4">
        <canvas id="chart" class="mx-auto"></canvas>
    </div>
</template>
