import React, { useState } from "react";

// Mock Database
const PATIENTS_DB = [
  { id: "PT-0041", name: "Alex Rivera", age: 34, gender: "Male", blood: "A+", lastVisit: "2026-04-10", condition: "Hypertension", email: "alex.r@email.com", phone: "+1 555-0102" },
  { id: "PT-0087", name: "Sam Taylor", age: 29, gender: "Non-binary", blood: "O-", lastVisit: "2026-03-22", condition: "Routine Checkup", email: "sam.t@email.com", phone: "+1 555-0199" },
  { id: "PT-0112", name: "Jordan Smith", age: 52, gender: "Female", blood: "B+", lastVisit: "2026-04-15", condition: "Diabetes Type II", email: "j.smith@email.com", phone: "+1 555-0144" },
];

// Reusable Theme Colors
const COLORS = {
  bg: "#020617",       // Deepest Navy
  sidebar: "#0f172a",  // Navy Sidebar
  primary: "#3b82f6",  // Main Blue
  primaryLight: "rgba(59, 130, 246, 0.15)",
  border: "#1e293b",   // Muted Slate Border
  textMain: "#f8fafc", // Off-white
  textMuted: "#94a3b8" // Greyish Blue
};

export default function MyPatientsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS_DB[0]);

  const filteredPatients = PATIENTS_DB.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.includes(searchTerm),
  );

  return (
    <div style={styles.container}>
      {/* 1. Patient Sidebar List */}
      <div style={styles.listSidebar}>
        <div style={styles.searchBox}>
          <input
            style={styles.searchInput}
            placeholder="Search name or ID..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={styles.listWrapper}>
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              style={{
                ...styles.patientItem,
                backgroundColor:
                  selectedPatient?.id === patient.id
                    ? COLORS.primaryLight
                    : "transparent",
                borderLeft: selectedPatient?.id === patient.id 
                    ? `4px solid ${COLORS.primary}` 
                    : "4px solid transparent"
              }}
            >
              <div style={styles.avatarSmall}>{patient.name[0]}</div>
              <div>
                <div style={{...styles.nameSmall, color: selectedPatient?.id === patient.id ? COLORS.primary : COLORS.textMain }}>
                  {patient.name}
                </div>
                <div style={styles.idSmall}>{patient.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Patient Detail View */}
      <div style={styles.detailView}>
        {selectedPatient ? (
          <>
            <header style={styles.detailHeader}>
              <div style={styles.avatarLarge}>{selectedPatient.name[0]}</div>
              <div>
                <h2 style={styles.detailName}>{selectedPatient.name}</h2>
                <p style={styles.detailId}>
                  {selectedPatient.id} • Registered Patient
                </p>
              </div>
              <button style={styles.editBtn}>Edit Profile</button>
            </header>

            <div style={styles.infoGrid}>
              <InfoCard label="Age" value={`${selectedPatient.age} yrs`} />
              <InfoCard label="Gender" value={selectedPatient.gender} />
              <InfoCard label="Blood Type" value={selectedPatient.blood} />
              <InfoCard label="Last Visit" value={selectedPatient.lastVisit} />
            </div>

            <div style={styles.mainLayout}>
              <section style={styles.medicalSection}>
                <h3 style={styles.sectionTitle}>Current Diagnosis</h3>
                <div style={styles.conditionTag}>{selectedPatient.condition}</div>
                <p style={{...styles.contactText, marginTop: 15, opacity: 0.7}}>
                  Patient is currently responding well to treatment. Schedule a follow-up in 2 weeks.
                </p>
              </section>

              <section style={styles.medicalSection}>
                <h3 style={styles.sectionTitle}>Contact Details</h3>
                <div style={styles.contactCard}>
                    <p style={styles.contactText}><strong>Email:</strong> {selectedPatient.email}</p>
                    <p style={styles.contactText}><strong>Phone:</strong> {selectedPatient.phone}</p>
                </div>
              </section>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>Select a patient from the list to view their clinical records.</div>
        )}
      </div>
    </div>
  );
}

const InfoCard = ({ label, value }) => (
  <div style={styles.infoCard}>
    <span style={styles.infoLabel}>{label}</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
);

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 40px)",
    background: COLORS.bg,
    borderRadius: "16px",
    overflow: "hidden",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.textMain,
    fontFamily: "'Inter', sans-serif"
  },

  listSidebar: {
    width: "320px",
    background: COLORS.sidebar,
    borderRight: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
  },
  searchBox: { padding: "24px", borderBottom: `1px solid ${COLORS.border}` },
  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bg,
    color: "#fff",
    outline: "none",
    fontSize: "14px"
  },
  listWrapper: { flex: 1, overflowY: "auto" },
  patientItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  avatarSmall: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: COLORS.primary,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  nameSmall: { fontSize: "14px", fontWeight: "600" },
  idSmall: { fontSize: "12px", color: COLORS.textMuted },

  detailView: { flex: 1, padding: "48px", overflowY: "auto", background: COLORS.bg },
  detailHeader: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "40px",
    position: "relative"
  },
  editBtn: {
    position: "absolute",
    right: 0,
    background: "transparent",
    border: `1px solid ${COLORS.primary}`,
    color: COLORS.primary,
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600"
  },
  avatarLarge: {
    width: "90px",
    height: "90px",
    borderRadius: "24px",
    background: `linear-gradient(135deg, ${COLORS.primary}, #1d4ed8)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
  },
  detailName: { fontSize: "32px", margin: 0, fontWeight: "700", letterSpacing: "-0.5px" },
  detailId: { color: COLORS.textMuted, marginTop: "6px", fontSize: "16px" },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "48px",
  },
  infoCard: {
    background: COLORS.sidebar,
    padding: "20px",
    borderRadius: "16px",
    border: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  infoLabel: {
    fontSize: "11px",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "700"
  },
  infoValue: { fontSize: "18px", fontWeight: "600", color: COLORS.primary },

  mainLayout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" },
  medicalSection: { 
    background: "rgba(30, 41, 59, 0.3)", 
    padding: "24px", 
    borderRadius: "20px", 
    border: `1px solid ${COLORS.border}` 
  },
  sectionTitle: { fontSize: "16px", marginBottom: "20px", color: COLORS.textMain, fontWeight: "600" },
  conditionTag: {
    display: "inline-block",
    padding: "10px 20px",
    background: COLORS.primaryLight,
    color: COLORS.primary,
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "14px"
  },
  contactCard: { display: "flex", flexDirection: "column", gap: "12px" },
  contactText: { fontSize: "14px", color: COLORS.textMuted, lineHeight: "1.6" },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: COLORS.textMuted,
    fontSize: "18px",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto"
  },
};