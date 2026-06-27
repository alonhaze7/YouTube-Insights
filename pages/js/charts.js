// ===== Chart.js Global Config =====
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = '#334155';
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';

// ===== W1: KPI Sparkline =====
const sparklineCtx = document.getElementById('kpi-sparkline');
if (sparklineCtx) {
    new Chart(sparklineCtx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                data: [72000, 85000, 91000, 78000, 95000, 102000, 110000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
}

// ===== W2: Pacing Chart =====
const pacingCtx = document.getElementById('pacingChart');
if (pacingCtx) {
    const days = Array.from({length: 30}, (_, i) => `Day ${i+1}`);
    const idealPace = Array.from({length: 30}, (_, i) => Math.round(2800000 / 30 * (i+1)));
    const actualPace = [95000, 185000, 290000, 380000, 460000, 550000, 630000, 720000, 800000, 890000, 960000, 1040000, 1110000, 1190000, 1260000, 1330000, 1400000, 1470000, 1540000, 1610000, 1680000, 1740000, 1800000, 1860000, 1920000, 1980000, 2040000, 2100000, 2200000, 2400000];

    new Chart(pacingCtx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Actual Views',
                    data: actualPace,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 2.5
                },
                {
                    label: 'Ideal Pace',
                    data: idealPace,
                    borderColor: '#64748b',
                    borderDash: [8, 4],
                    fill: false,
                    tension: 0,
                    borderWidth: 1.5,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { boxWidth: 12, padding: 16 } }
            },
            scales: {
                x: { grid: { display: false }, ticks: { maxTicksLimit: 6 } },
                y: { ticks: { callback: v => (v/1000000).toFixed(1) + 'M' } }
            }
        }
    });
}

// ===== W3: Channel Efficiency =====
const channelCtx = document.getElementById('channelEfficiency');
if (channelCtx) {
    new Chart(channelCtx, {
        type: 'bar',
        data: {
            labels: ['Main Channel', 'Tutorials', 'Shorts', 'Podcast'],
            datasets: [
                {
                    label: 'High Engagement (>5%)',
                    data: [520000, 340000, 45000, 120000],
                    backgroundColor: '#22c55e'
                },
                {
                    label: 'Medium (2-5%)',
                    data: [180000, 120000, 150000, 80000],
                    backgroundColor: '#eab308'
                },
                {
                    label: 'Low (<2%)',
                    data: [60000, 40000, 320000, 30000],
                    backgroundColor: '#ef4444'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, ticks: { callback: v => (v/1000) + 'K' } }
            }
        }
    });
}

// ===== W4: View Quality Combo =====
const qualityCtx = document.getElementById('viewQuality');
if (qualityCtx) {
    new Chart(qualityCtx, {
        type: 'bar',
        data: {
            labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
            datasets: [
                {
                    label: 'Views',
                    data: [320000, 380000, 420000, 490000, 560000, 620000],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    yAxisID: 'y'
                },
                {
                    label: 'Avg Duration (sec)',
                    data: [185, 172, 168, 155, 148, 142],
                    type: 'line',
                    borderColor: '#f97316',
                    backgroundColor: '#f97316',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#f97316',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { grid: { display: false } },
                y: { position: 'left', ticks: { callback: v => (v/1000) + 'K' } },
                y1: { position: 'right', grid: { display: false }, min: 100, max: 200, ticks: { callback: v => v + 's' } }
            }
        }
    });
}

// ===== W5: Subscriber Waterfall =====
const waterfallCtx = document.getElementById('subscriberWaterfall');
if (waterfallCtx) {
    new Chart(waterfallCtx, {
        type: 'bar',
        data: {
            labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
            datasets: [
                {
                    label: 'Gained',
                    data: [4200, 3800, 5100, 4600, 5800, 6200],
                    backgroundColor: '#22c55e'
                },
                {
                    label: 'Lost',
                    data: [-1200, -1500, -1100, -980, -1300, -1100],
                    backgroundColor: '#ef4444'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { grid: { display: false } },
                y: { ticks: { callback: v => v > 0 ? '+' + (v/1000).toFixed(1) + 'K' : (v/1000).toFixed(1) + 'K' } }
            }
        }
    });
}

// ===== W7: Geo Engagement =====
const geoEngCtx = document.getElementById('geoEngagement');
if (geoEngCtx) {
    new Chart(geoEngCtx, {
        type: 'bar',
        data: {
            labels: ['India', 'Brazil', 'US', 'UK', 'Germany', 'France', 'Japan'],
            datasets: [{
                label: 'Engagement Rate %',
                data: [7.2, 6.1, 4.8, 4.2, 3.8, 2.9, 1.1],
                backgroundColor: ['#22c55e', '#22c55e', '#22c55e', '#eab308', '#eab308', '#eab308', '#ef4444'],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { callback: v => v + '%' } },
                y: { grid: { display: false } }
            }
        }
    });
}

// ===== W9: Sub Growth by Geo =====
const subGeoCtx = document.getElementById('subGrowthGeo');
if (subGeoCtx) {
    new Chart(subGeoCtx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Net Positive',
                    data: [
                        { x: 8200, y: 0, r: 20 },
                        { x: 5400, y: 1, r: 16 },
                        { x: 4100, y: 2, r: 14 },
                        { x: 2800, y: 3, r: 10 }
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    pointRadius: [20, 16, 14, 10]
                },
                {
                    label: 'Net Negative',
                    data: [
                        { x: -200, y: 4, r: 6 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    pointRadius: [6]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { boxWidth: 12 } },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const countries = ['India', 'Brazil', 'US', 'UK', 'Japan'];
                            return countries[ctx.dataIndex] + ': ' + ctx.raw.x + ' net subs';
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Net Subscribers Gained' }, grid: { display: false } },
                y: { display: false }
            }
        }
    });
}

// ===== W11: Video Performance Scatter =====
const scatterCtx = document.getElementById('videoScatter');
if (scatterCtx) {
    new Chart(scatterCtx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'High Engagement',
                    data: [
                        { x: 342000, y: 272, r: 20 },
                        { x: 189000, y: 228, r: 16 }
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.5)',
                    borderColor: '#22c55e'
                },
                {
                    label: 'Medium Engagement',
                    data: [
                        { x: 67000, y: 135, r: 10 },
                        { x: 45000, y: 112, r: 8 }
                    ],
                    backgroundColor: 'rgba(234, 179, 8, 0.5)',
                    borderColor: '#eab308'
                },
                {
                    label: 'Low Engagement',
                    data: [
                        { x: 12000, y: 45, r: 5 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: '#ef4444'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { boxWidth: 12 } }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Total Views' },
                    ticks: { callback: v => (v/1000) + 'K' },
                    grid: { display: false }
                },
                y: {
                    title: { display: true, text: 'Avg Duration (sec)' },
                    grid: { color: 'rgba(51, 65, 85, 0.5)' }
                }
            }
        }
    });
}

// ===== W12: Engagement by Video =====
const engVideoCtx = document.getElementById('engagementByVideo');
if (engVideoCtx) {
    new Chart(engVideoCtx, {
        type: 'bar',
        data: {
            labels: ['AI Tutorial #4', 'Product Deep Dive', 'Weekly Recap', 'Behind Scenes', 'Quick Tip #12'],
            datasets: [
                { label: 'Likes', data: [28100, 12600, 2280, 945, 132], backgroundColor: '#3b82f6' },
                { label: 'Comments', data: [5400, 2100, 890, 312, 45], backgroundColor: '#22c55e' },
                { label: 'Shares', data: [2200, 890, 320, 98, 12], backgroundColor: '#f97316' }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { callback: v => (v/1000) + 'K' } },
                y: { stacked: true, grid: { display: false } }
            }
        }
    });
}

// ===== W16: Acquisition Efficiency =====
const acqCtx = document.getElementById('acquisitionEfficiency');
if (acqCtx) {
    new Chart(acqCtx, {
        type: 'line',
        data: {
            labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
            datasets: [
                {
                    label: 'Views per Subscriber',
                    data: [145, 138, 142, 128, 122, 115, 108, 98],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.3,
                    borderWidth: 2.5
                },
                {
                    label: '4-Week Moving Avg',
                    data: [null, null, null, 138, 132, 127, 118, 111],
                    borderColor: '#64748b',
                    borderDash: [6, 3],
                    fill: false,
                    tension: 0.3,
                    borderWidth: 1.5,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { grid: { display: false } },
                y: { title: { display: true, text: 'Views / Sub Gained' } }
            }
        }
    });
}

// ===== W17: Content Fatigue =====
const fatigueCtx = document.getElementById('contentFatigue');
if (fatigueCtx) {
    new Chart(fatigueCtx, {
        type: 'bar',
        data: {
            labels: ['Quick Tip #12', 'Old Promo', 'Behind Scenes', 'Weekly Recap', 'Product Dive', 'AI Tutorial'],
            datasets: [{
                label: 'Dislike Rate %',
                data: [7.1, 5.8, 4.2, 2.1, 0.8, 0.3],
                backgroundColor: ['#ef4444', '#ef4444', '#eab308', '#eab308', '#22c55e', '#22c55e'],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                annotation: {
                    annotations: {
                        line1: { type: 'line', xMin: 5, xMax: 5, borderColor: '#ef4444', borderDash: [4,4], borderWidth: 1 }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { callback: v => v + '%' }, max: 10 },
                y: { grid: { display: false } }
            }
        }
    });
}

// ===== W19: Channel Engagement =====
const chEngCtx = document.getElementById('channelEngagement');
if (chEngCtx) {
    new Chart(chEngCtx, {
        type: 'bar',
        data: {
            labels: ['Main Channel', 'Tutorials', 'Podcast', 'Shorts'],
            datasets: [
                { label: 'Likes', data: [45000, 22000, 12000, 8000], backgroundColor: '#3b82f6' },
                { label: 'Comments', data: [12000, 5400, 3200, 1800], backgroundColor: '#22c55e' },
                { label: 'Shares', data: [8000, 3100, 1900, 500], backgroundColor: '#f97316' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12 } } },
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, ticks: { callback: v => (v/1000) + 'K' } }
            }
        }
    });
}

// ===== W20: Content Lifecycle Bubble =====
const lifecycleCtx = document.getElementById('lifecycleBubble');
if (lifecycleCtx) {
    new Chart(lifecycleCtx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Rising Star (New + High Eng)',
                    data: [
                        { x: 12, y: 8.2, r: 22 },
                        { x: 21, y: 6.7, r: 18 }
                    ],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    borderColor: '#22c55e'
                },
                {
                    label: 'Evergreen (Old + High Eng)',
                    data: [
                        { x: 120, y: 5.4, r: 15 },
                        { x: 145, y: 4.1, r: 12 }
                    ],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: '#3b82f6'
                },
                {
                    label: 'Underperformer (New + Low Eng)',
                    data: [
                        { x: 8, y: 1.1, r: 7 },
                        { x: 25, y: 0.8, r: 5 }
                    ],
                    backgroundColor: 'rgba(234, 179, 8, 0.6)',
                    borderColor: '#eab308'
                },
                {
                    label: 'Retire (Old + Low Eng)',
                    data: [
                        { x: 95, y: 0.6, r: 8 },
                        { x: 130, y: 0.4, r: 6 },
                        { x: 180, y: 0.2, r: 4 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: '#ef4444'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { boxWidth: 12 } }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Video Age (days)' },
                    grid: { color: 'rgba(51, 65, 85, 0.3)' }
                },
                y: {
                    title: { display: true, text: 'Engagement Rate %' },
                    grid: { color: 'rgba(51, 65, 85, 0.3)' }
                }
            }
        }
    });
}
