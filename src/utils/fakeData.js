// Fake data for dashboards
export const fakeData = {
  admin: {
    stats: [
      { title: 'Total Patients', value: '1,247', change: 12, trend: 'up' },
      { title: 'Active Doctors', value: '89', change: 8, trend: 'up' },
      { title: 'Appointments', value: '2,430', change: 23, trend: 'up' },
      { title: 'Revenue', value: '$45.2k', change: 15, trend: 'up' },
    ],
    patients: [
      { id: 1, name: 'John Doe', age: 34, status: 'Active', lastVisit: '2024-09-10' },
      { id: 2, name: 'Jane Smith', age: 28, status: 'Pending', lastVisit: '2024-09-05' },
    ],
    chartData: [
      { name: 'Jan', patients: 400 },
      { name: 'Feb', patients: 380 },
      { name: 'Mar', patients: 450 },
      { name: 'Apr', patients: 420 },
      { name: 'May', patients: 580 },
      { name: 'Jun', patients: 650 },
    ],
  },
  patient: {
    appointments: [
      { id: 1, doctor: 'Dr. Smith', date: '2024-09-20', time: '10:00', status: 'Confirmed' },
      { id: 2, doctor: 'Dr. Johnson', date: '2024-10-05', time: '14:00', status: 'Pending' },
    ],
    progress: [
      { exercise: 'Shoulder Rotation', sessions: 12, goal: 20, completed: 60 },
      { exercise: 'Leg Press', sessions: 8, goal: 15, completed: 53 },
    ],
  },
  doctor: {
    patients: [
      { name: 'John Doe', status: 'Active', nextAppt: '2024-09-20' },
      { name: 'Jane Smith', status: 'Follow-up', nextAppt: '2024-10-05' },
    ],
    schedule: [
      { time: '10:00', patient: 'John Doe', type: 'Consultation' },
      { time: '11:00', patient: 'Free', type: 'Available' },
    ],
  },
};

