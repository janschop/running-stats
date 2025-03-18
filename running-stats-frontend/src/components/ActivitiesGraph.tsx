// src/components/ActivitiesGraph.tsx
import React, { useEffect, useState } from 'react';
import { getActivitiesBySport } from '../services/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { Activity } from '../interfaces/Activity';
import { GraphData } from '../interfaces/GraphData';

const ActivitiesGraph: React.FC = () => {
    const [graphData, setGraphData] = useState<GraphData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activityType, setActivityType] = useState<string>('running'); // Default activity type

    // Helper to generate date strings for all days between two dates
    // const generateDateRange = (start: Date, end: Date): string[] => {
    //     const dates: string[] = [];
    //     const current = new Date(start);
    //     while (current <= end) {
    //         // Convert the date to an ISO string and split off the time portion
    //         dates.push(current.toISOString().split('T')[0]);
    //         current.setDate(current.getDate() + 1);
    //     }
    //     return dates;
    // };

    useEffect(() => {
        const fetchActivitiesBySport = async () => {
            try {
                setLoading(true);
                // Fetch activities for the selected type
                const response = await getActivitiesBySport(activityType);

                // Aggregate distance and training load by date
                const aggregated = response.data.reduce((acc: Record<string, { distance: number; trainingLoad: number }>, activity: Activity) => {
                    const dateStr = new Date(activity.start_Time).toISOString().split('T')[0];
                    if (!acc[dateStr]) {
                        acc[dateStr] = { distance: 0, trainingLoad: 0 };
                    }
                    acc[dateStr].distance += Number(activity.distance) || 0;
                    acc[dateStr].trainingLoad += Number(activity.training_Load) || 0;
                    return acc;
                }, {} as Record<string, { distance: number; trainingLoad: number }>);

                // Determine the date range from the aggregated keys
                const dates = Object.keys(aggregated);
                if (dates.length === 0) {
                    setGraphData([]);
                    return;
                }
                // const parsedDates = dates.map(d => new Date(d));
                // const minDate = new Date(Math.min(...parsedDates.map(d => d.getTime())));
                // const maxDate = new Date(Math.max(...parsedDates.map(d => d.getTime())));
                // const fullRange = generateDateRange(minDate, maxDate);

                // Convert aggregated data to an array of GraphData objects
                const formattedData: GraphData[] = (Object.entries(aggregated) as [string, { distance: number; trainingLoad: number }][])
                    .map(([date, values]) => ({
                        date,
                        distance: values.distance,
                        trainingLoad: values.trainingLoad,
                    }));

                // Ensure the full date range is represented: if any date is missing, add it with 0 values
                // const completeData: GraphData[] = fullRange.map(date => {
                //     const entry = formattedData.find(item => item.date === date);
                //     return entry ? entry : { date, distance: 0, trainingLoad: 0 };
                // });
                // setGraphData(completeData);
                setGraphData(formattedData);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivitiesBySport();
    }, [activityType]);

    if (loading) return <div>Loading graph...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Running Distance & Training Load Over Time</h2>

            {/* Dropdown Menu */}
            <div>
                <label htmlFor="activityType">Select Activity Type: </label>
                <select
                    id="activityType"
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                >
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                    <option value="walking">Walking</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Training Load', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#8884d8" name="Distance" />
                    <Line yAxisId="right" type="monotone" dataKey="trainingLoad" stroke="#82ca9d" name="Training Load" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivitiesGraph;
