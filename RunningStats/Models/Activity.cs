using Microsoft.EntityFrameworkCore;


namespace RunningStats.Models
{
    #region Keyless
    [Keyless]
    public class Activity
    {
        // VARCHAR — Use string if the ID isn't strictly numeric
        public string Activity_Id { get; set; }

        // VARCHAR
        public string Name { get; set; }

        // VARCHAR
        public string? Description { get; set; }

        // VARCHAR
        public string Type { get; set; }

        // INTEGER
        public long? Course_Id { get; set; }

        // INTEGER
        public int? Laps { get; set; }

        // VARCHAR
        public string? Sport { get; set; }

        // VARCHAR
        public string? Sub_Sport { get; set; }

        // VARCHAR
        public string? Device_Serial_Number { get; set; }

        // VARCHAR
        public string? Self_Eval_Feel { get; set; }

        // VARCHAR
        public string? Self_Eval_Effort { get; set; }

        // FLOAT
        public float? Training_Load { get; set; }

        // FLOAT
        public float? Training_Effect { get; set; }

        // FLOAT
        public float? Anaerobic_Training_Effect { get; set; }

        // DATETIME
        public DateTime? Start_Time { get; set; }

        // DATETIME
        public DateTime? Stop_Time { get; set; }

        // FLOAT (often total seconds; if you prefer TimeSpan, convert accordingly)
        public float? Elapsed_Time { get; set; }

        // FLOAT (often total seconds)
        public float? Moving_Time { get; set; }

        // FLOAT (distance in meters/kilometers, depending on how GarminDB stores it)
        public float? Distance { get; set; }

        // INTEGER
        public int? Cycles { get; set; }

        // INTEGER
        public int? Avg_Hr { get; set; }

        // INTEGER
        public int? Max_Hr { get; set; }

        // FLOAT
        public float? Max_Rr { get; set; }

        // INTEGER
        public int? Calories { get; set; }

        // FLOAT
        public float? Avg_Cadence { get; set; }

        // FLOAT
        public float? Max_Cadence { get; set; }

        // FLOAT
        public float? Avg_Speed { get; set; }

        // FLOAT
        public float? Max_Speed { get; set; }

        // FLOAT
        public float? Ascent { get; set; }

        // FLOAT
        public float? Descent { get; set; }

        // FLOAT
        public float? Max_Temperature { get; set; }

        // FLOAT
        public float? Avg_Temperature { get; set; }

        // FLOAT
        public float? Start_Lat { get; set; }

        // FLOAT
        public float? Start_Long { get; set; }

        // FLOAT
        public float? Stop_Lat { get; set; }

        // FLOAT
        public float? Stop_Long { get; set; }

        // VARCHAR(18)
        // public string? Hrz_Zones_Method { get; set; }

        // INTEGER
        public int? Hrz_1_Hr { get; set; }

        // INTEGER
        public int? Hrz_2_Hr { get; set; }

        // INTEGER
        public int? Hrz_3_Hr { get; set; }

        // INTEGER
        public int? Hrz_4_Hr { get; set; }

        // INTEGER
        public int? Hrz_5_Hr { get; set; }

        // INTEGER (likely seconds spent in HR zone 1, etc.)
        public int? Hrz_1_Time { get; set; }

        public int? Hrz_2_Time { get; set; }
        public int? Hrz_3_Time { get; set; }
        public int? Hrz_4_Time { get; set; }
        public int? Hrz_5_Time { get; set; }
    }
    #endregion
}