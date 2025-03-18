// src/components/ActivitiesGraph.tsx
import React, { useEffect, useState } from 'react';
import { getActivitiesBySport } from '../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Activity } from '../interfaces/Activity';

const ActivitiesGraph: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivitiesBySport = async () => {
            try {
                const response = await getActivitiesBySport('running');
                const formattedData = response.data.map((activity: Activity) => ({
                    date: new Date(activity.start_Time).toLocaleDateString(), // Format date
                    distance: activity.distance || 0, // Ensure no undefined values
                }));

                setActivities(formattedData);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivitiesBySport();
    }, []);

    if (loading) return <div>Loading activities...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Running Distance Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activities}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="distance" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivitiesGraph;
