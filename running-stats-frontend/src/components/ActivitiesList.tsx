// src/components/ActivitiesList.tsx
import React, { useEffect, useState } from 'react';
import { getActivities } from '../services/api';
import { Activity } from '../interfaces/Activity';


const ActivitiesList: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getActivities();
                setActivities(response.data);
            } catch (err) {
                setError('Failed to fetch activities.');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    if (loading) return <div>Loading activities...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.activity_Id}>
                        {activity.name} - {activity.sport} - Training Load: {activity.training_Load} - Distance: {activity.distance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivitiesList;
