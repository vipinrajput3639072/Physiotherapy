import React, { useState } from "react";
import { Search, Edit2, Trash2, X, Plus } from "lucide-react";
import toast from "react-hot-toast";

// Mock data agar fakeData file available na ho
const initialPatients = [
  { id: 1, name: "Arjun Mehta", age: 45, status: "Active" },
  { id: 2, name: "Sneha Kapoor", age: 28, status: "Pending" },
  { id: 3, name: "Vikram Rathore", age: 52, status: "Completed" },
];

const PatientManagement = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Handlers ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      setPatients(patients.filter((p) => p.id !== id));
      toast.error("Patient record deleted");
    }
  };

  const handleOpenModal = (patient = null) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleSavePatient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const patientData = {
      id: editingPatient ? editingPatient.id : Date.now(),
      name: formData.get("name"),
      age: formData.get("age"),
      status: formData.get("status"),
    };

    if (editingPatient) {
      setPatients(patients.map(p => p.id === editingPatient.id ? patientData : p));
      toast.success("Profile updated successfully");
    } else {
      setPatients([patientData, ...patients]);
      toast.success("New patient registered");
    }

    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:ml-64 min-h-screen bg-gray-50/50 p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Patient <span className="text-blue-600">Management</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Currently managing {patients.length} active records
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none shadow-sm transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Patient</span>
            </button>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Patient Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{patient.name}</p>
                          <p className="text-[11px] text-gray-400">ID: #{patient.id.toString().slice(-4)} • {patient.age} yrs</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                        patient.status === "Active" ? "bg-emerald-100 text-emerald-700" : 
                        patient.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => handleOpenModal(patient)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-gray-100">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(patient.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-gray-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- COMPACT CENTERED MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100">
            
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-black text-gray-900">
                {editingPatient ? "Edit Profile" : "Register Patient"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-gray-400 shadow-sm transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compact Form */}
            <form className="p-8 space-y-4" onSubmit={handleSavePatient}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingPatient?.name}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium"
                  placeholder="Rahul Sharma"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Age</label>
                  <input
                    name="age"
                    type="number"
                    required
                    defaultValue={editingPatient?.age}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    name="status" 
                    defaultValue={editingPatient?.status || "Active"} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm cursor-pointer appearance-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[1.5] py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-95 text-sm"
                >
                  {editingPatient ? "Save Changes" : "Register Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;