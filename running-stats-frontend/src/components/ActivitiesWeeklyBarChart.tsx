// src/components/ActivitiesWeeklyBarChart.tsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getActivitiesBySport } from '../services/api';
import { Activity } from '../interfaces/Activity';
import { startOfWeek, getWeek } from 'date-fns';

interface WeeklyGraphData {
    week: string;
    distance: number;
}

const ActivitiesWeeklyBarChart: React.FC = () => {
    const [weeklyData, setWeeklyData] = useState<WeeklyGraphData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activityType, setActivityType] = useState<string>('running'); // Default activity type

    useEffect(() => {
        const fetchWeeklyData = async () => {
            try {
                const response = await getActivitiesBySport(activityType);
                const activities: Activity[] = response.data;

                // Aggregate distances by week number
                const aggregated: Record<string, number> = {};

                activities.forEach(activity => {
                    if (activity.start_Time) {
                        const date = new Date(activity.start_Time);
                        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
                        // Get the week number (e.g., 12)
                        const weekNumber = getWeek(weekStart, { weekStartsOn: 1 });
                        const weekKey = weekNumber.toString();
                        aggregated[weekKey] = (aggregated[weekKey] || 0) + Number(activity.distance) || 0;
                    }
                });

                // Convert aggregated data into an array
                const formattedData: WeeklyGraphData[] = (Object.entries(aggregated) as [string, number][])
                    .map(([week, distance]) => ({
                        week,
                        distance,
                    }));

                setWeeklyData(formattedData);
            } catch (err) {
                setError('Failed to fetch weekly data.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyData();
    }, [activityType]);

    if (loading) return <div>Loading weekly data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div>
                <label htmlFor="activityType">Select Activity Type: </label>
                <h2>Weekly {activityType} Distance</h2>
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
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" label={{ value: 'Week Number', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="distance" fill="#8884d8" name="Distance" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActivitiesWeeklyBarChart;
