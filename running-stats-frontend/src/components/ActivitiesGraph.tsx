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

interface GraphData {
    date: string;
    distance: number;
    trainingLoad: number;
}

const ActivitiesGraph: React.FC = () => {
    const [graphData, setGraphData] = useState<GraphData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivitiesBySport = async () => {
            try {
                const response = await getActivitiesBySport('running');
                // Aggregate distance and training load by date
                const aggregated = response.data.reduce((acc: Record<string, { distance: number; trainingLoad: number }>, activity: Activity) => {
                    const dateStr = new Date(activity.start_Time).toLocaleDateString();
                    if (!acc[dateStr]) {
                        acc[dateStr] = { distance: 0, trainingLoad: 0 };
                    }
                    acc[dateStr].distance += activity.distance || 0;
                    acc[dateStr].trainingLoad += activity.training_Load || 0;
                    return acc;
                }, {} as Record<string, { distance: number; trainingLoad: number }>);

                // Convert aggregated data to an array of GraphData objects
                const formattedData: GraphData[] = (Object.entries(aggregated) as [string, { distance: number; trainingLoad: number }][])
                    .map(([date, values]) => ({
                        date,
                        distance: values.distance,
                        trainingLoad: values.trainingLoad,
                    }));

                console.log('formattedData:', formattedData);
                setGraphData(formattedData);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivitiesBySport();
    }, []);

    if (loading) return <div>Loading graph...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Running Distance & Training Load Over Time</h2>
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
