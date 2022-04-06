import React from "react";
import { Calendar } from 'primereact/calendar';
import { Chart } from "react-google-charts";

export default function Graph(props) {
    const { graph, date, setDate } = props;

    return (
        <div className="card-dashboard mb-3">
            <div className="mx-4 mt-5">
                <span className="chart-title">TOP PERFORMING PODCAST BY UNIQUE LISTENERS</span>
                <div className="mt-4">
                    <span className="mr-2 sort-label">Sort by date range:</span>
                    <Calendar
                        placeholder="Select Date Range"
                        selectionMode="range"
                        maxDate={new Date()}
                        value={date}
                        onChange={(e) => setDate(e.value)}
                        showIcon
                    >
                    </Calendar>
                </div>
            </div>
            <Chart
                height={'300px'}
                chartType="ColumnChart"
                loader={<div className="m-4 text-muted" style={{ fontSize: 14, fontStyle: "italic" }}>Loading Chart...</div>}
                data={graph}
                options={{
                    chartArea: { width: '85%' },
                    isStacked: true,
                    legend: { position: 'none' },
                    colors: ['#FFD586', "#FFEEC6"],

                    vAxis: {
                        format: "short",
                        textStyle: {
                            fontFamily: "Roboto",
                            fontSize: 10,
                            lineHeight: 12,
                            bold: true,
                            color: '#4F4F4F',
                        }
                    },
                    hAxis: {
                        textStyle: {
                            fontFamily: "Roboto",
                            fontSize: 10,
                            lineHeight: 12,
                            bold: true,
                            color: '#4F4F4F',
                        }
                    },

                }}
                // For tests
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
    )
}