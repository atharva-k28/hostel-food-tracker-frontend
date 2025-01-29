interface AttendanceData {
    prn: string;
    name: string;
    datetime: Date;
  }
  
  const data: AttendanceData[] = [
    { prn: "1083223001", name: "Aarav Shah", datetime: new Date("2025-01-26T07:45:00") },
    { prn: "1083223001", name: "Aarav Shah", datetime: new Date("2025-01-26T20:15:00") },
    { prn: "1083223002", name: "Sanya Kapoor", datetime: new Date("2025-01-26T12:30:00") },
    { prn: "1083223002", name: "Sanya Kapoor", datetime: new Date("2025-01-27T08:15:00") },
    { prn: "1083223003", name: "Rohan Mehta", datetime: new Date("2025-01-26T19:50:00") },
    { prn: "1083223003", name: "Rohan Mehta", datetime: new Date("2025-01-27T12:45:00") },
    { prn: "1083223004", name: "Ishita Desai", datetime: new Date("2025-01-27T08:05:00") },
    { prn: "1083223004", name: "Ishita Desai", datetime: new Date("2025-01-28T13:00:00") },
    { prn: "1083223005", name: "Vikram Patel", datetime: new Date("2025-01-26T07:30:00") },
    { prn: "1083223005", name: "Vikram Patel", datetime: new Date("2025-01-28T19:55:00") },
    { prn: "1083223006", name: "Meera Nair", datetime: new Date("2025-01-27T12:10:00") },
    { prn: "1083223006", name: "Meera Nair", datetime: new Date("2025-01-28T20:40:00") },
    { prn: "1083223007", name: "Aditya Rao", datetime: new Date("2025-01-26T08:25:00") },
    { prn: "1083223007", name: "Aditya Rao", datetime: new Date("2025-01-27T13:15:00") },
    { prn: "1083223008", name: "Tanya Bhatt", datetime: new Date("2025-01-27T07:55:00") },
    { prn: "1083223008", name: "Tanya Bhatt", datetime: new Date("2025-01-28T19:45:00") },
    { prn: "1083223009", name: "Siddharth Gupta", datetime: new Date("2025-01-26T12:20:00") },
    { prn: "1083223009", name: "Siddharth Gupta", datetime: new Date("2025-01-27T20:30:00") },
    { prn: "1083223010", name: "Rhea Malhotra", datetime: new Date("2025-01-26T08:50:00") },
    { prn: "1083223010", name: "Rhea Malhotra", datetime: new Date("2025-01-28T12:40:00") },
    { prn: "1083223011", name: "Kunal Joshi", datetime: new Date("2025-01-27T07:10:00") },
    { prn: "1083223011", name: "Kunal Joshi", datetime: new Date("2025-01-28T19:30:00") },
    { prn: "1083223012", name: "Neha Verma", datetime: new Date("2025-01-26T12:50:00") },
    { prn: "1083223012", name: "Neha Verma", datetime: new Date("2025-01-28T20:20:00") }
  ];

  
export default AttendanceData;