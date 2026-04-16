import { useState } from "react";

const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    patient: "Alex Rivera",
    initials: "AR",
    patientId: "#PT-0041",
    time: "09:00 AM",
    duration: "30 min",
    type: "Annual Physical",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Sam Taylor",
    initials: "ST",
    patientId: "#PT-0087",
    time: "10:15 AM",
    duration: "20 min",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    id: 3,
    patient: "Jordan Smith",
    initials: "JS",
    patientId: "#PT-0112",
    time: "11:00 AM",
    duration: "45 min",
    type: "Consultation",
    status: "Scheduled",
  },
];

const FILTERS = ["All", "Scheduled", "In Progress", "Completed"];

const STATUS_THEME = {
  Completed: { bg: "#ecfdf5", text: "#065f46", dot: "#10b981" },
  "In Progress": { bg: "#eff6ff", text: "#1e40af", dot: "#3b82f6" },
  Scheduled: { bg: "#f8fafc", text: "#475569", dot: "#94a3b8" },
};

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      patient: newName,
      initials: newName.split(" ").map(n => n[0]).join("").toUpperCase(),
      patientId: `#PT-0${Math.floor(Math.random() * 900) + 100}`,
      time: newTime,
      duration: "30 min",
      type: "General Checkup",
      status: "Scheduled",
    };
    setAppointments([newEntry, ...appointments]);
    setShowModal(false);
    setNewName("");
    setNewTime("");
  };

  const filtered = activeFilter === "All" 
    ? appointments 
    : appointments.filter((a) => a.status === activeFilter);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.h1}>Clinical Dashboard</h1>
          <p style={styles.subtitle}>Thursday, April 16, 2026 · Dr. Morgan Ellis</p>
        </div>
        <button style={styles.btnNew} onClick={() => setShowModal(true)}>
          <span>+</span> New Appointment
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Today</p>
          <p style={styles.statValue}>{appointments.length + 8}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Completed</p>
          <p style={{ ...styles.statValue, color: "#10b981" }}>4</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Pending</p>
          <p style={{ ...styles.statValue, color: "#6366f1" }}>{appointments.length}</p>
        </div>
      </div>

      {/* Table section */}
      <div style={styles.sectionHead}>
        <h2 style={styles.h2}>Daily Schedule</h2>
        <div style={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(activeFilter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Time", "Patient", "Visit Type", "Status", ""].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((apt) => (
              <tr key={apt.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.timeCell}>
                    <span style={styles.timeText}>{apt.time}</span>
                    <span style={styles.dur}>{apt.duration}</span>
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.patientCell}>
                    <div style={{ ...styles.avatar, background: STATUS_THEME[apt.status].bg, color: STATUS_THEME[apt.status].text }}>
                      {apt.initials}
                    </div>
                    <div>
                      <div style={styles.patientName}>{apt.patient}</div>
                      <div style={styles.patientId}>{apt.patientId}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...styles.td, color: "#64748b" }}>{apt.type}</td>
                <td style={styles.td}>
                  <span style={{
                      ...styles.badge,
                      background: STATUS_THEME[apt.status].bg,
                      color: STATUS_THEME[apt.status].text,
                    }}>
                    <span style={{ ...styles.badgeDot, background: STATUS_THEME[apt.status].dot }} />
                    {apt.status}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button style={styles.viewBtn}>Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ marginTop: 0 }}>Schedule New Patient</h3>
            <form onSubmit={handleAddAppointment} style={styles.form}>
              <input 
                required
                placeholder="Patient Full Name" 
                style={styles.input} 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input 
                required
                type="time" 
                style={styles.input} 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" style={styles.btnNew}>Save Appointment</button>
                <button type="button" onClick={() => setShowModal(false)} style={styles.btnCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "2rem",
    fontFamily: "Inter, -apple-system, sans-serif",
    background: "#f1f5f9",
    minHeight: "100vh",
    color: "#0f172a",
  },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "2rem" },
  h1: { fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },
  
  btnNew: {
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.1s",
  },
  btnCancel: {
    background: "transparent",
    border: "1px solid #e2e8f0",
    padding: "10px 18px",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
  },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: "2rem" },
  statCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  statLabel: { fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 },
  statValue: { fontSize: 32, fontWeight: 800, margin: 0 },

  sectionHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  h2: { fontSize: 18, fontWeight: 600 },
  filters: { display: "flex", gap: 8, background: "#e2e8f0", padding: 4, borderRadius: 10 },
  filterBtn: {
    fontSize: 13,
    padding: "6px 14px",
    borderRadius: 7,
    border: "none",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    fontWeight: 500,
  },
  filterBtnActive: { background: "#fff", color: "#0f172a", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" },

  tableWrap: { background: "#fff", borderRadius: 16, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "16px", fontSize: 12, color: "#64748b", textAlign: "left", background: "#f8fafc", borderBottom: "1px solid #f1f5f9" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "16px", fontSize: 14 },

  timeCell: { display: "flex", flexDirection: "column" },
  timeText: { fontWeight: 600, color: "#0f172a" },
  dur: { fontSize: 12, color: "#94a3b8" },

  patientCell: { display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 },
  patientName: { fontWeight: 600 },
  patientId: { fontSize: 12, color: "#94a3b8" },

  badge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600 },
  badgeDot: { width: 6, height: 6, borderRadius: "50%" },
  
  viewBtn: { background: "#f1f5f9", border: "none", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "#475569", cursor: "pointer" },

  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modal: { background: "#fff", padding: "2rem", borderRadius: 20, width: "100%", maxWidth: 400, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }
};