// src/interfaces/Activity.ts

export interface Activity {
    activity_Id: string;
    name: string;
    sport: string;
    training_Load?: number;
    distance?: number;
}