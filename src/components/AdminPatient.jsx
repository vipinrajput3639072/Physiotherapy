import { useState } from "react";
import { Search, Edit2, Trash2, History, UserPlus, X, Plus } from "lucide-react";
import { fakeData } from "../utils/fakeData";
import toast from "react-hot-toast";

const PatientManagement = () => {
  const [patients, setPatients] = useState(fakeData.admin.patients);
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

  // --- Add or Update Function ---
  const handleSavePatient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const patientData = {
      id: editingPatient ? editingPatient.id : patients.length + 1,
      name: formData.get("name"),
      age: formData.get("age"),
      status: formData.get("status"),
    };

    if (editingPatient) {
      // Update logic
      setPatients(patients.map(p => p.id === editingPatient.id ? patientData : p));
      toast.success("Profile updated successfully");
    } else {
      // Add logic
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
    <div className="ml-72 min-h-screen bg-gray-50/50 p-8 pt-10 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
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
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        {/* Table Section */}
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
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-400">ID: #{patient.id} • {patient.age} yrs</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${
                        patient.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(patient)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(patient.id)} className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-white shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-black text-gray-900">
                {editingPatient ? "Edit Profile" : "New Registration"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleSavePatient}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingPatient?.name}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Age</label>
                  <input
                    name="age"
                    type="number"
                    required
                    defaultValue={editingPatient?.age}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Status</label>
                  <select name="status" defaultValue={editingPatient?.status || "Active"} className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner appearance-none cursor-pointer">
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all">
                  Cancel
                </button>
                <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg transition-all active:scale-95">
                  {editingPatient ? "Update Record" : "Create Profile"}
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