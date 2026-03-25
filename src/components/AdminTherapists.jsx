import { useState } from 'react';
import { 
  UserCheck, Plus, Calendar, Users, 
  MoreVertical, Mail, Phone, Clock,
  CheckCircle, AlertCircle, X, Search, Settings 
} from 'lucide-react';
import toast from 'react-hot-toast';

const TherapistManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  // Mock Data for Therapists
  const [therapists, setTherapists] = useState([
    { 
      id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Sports Injury', 
      patients: 12, capacity: 15, status: 'Active', 
      schedule: 'Mon - Fri (08:00 - 17:00)', email: 'sarah.j@physiohub.com' 
    },
    { 
      id: 2, name: 'Dr. Michael Chen', specialty: 'Neurological Rehab', 
      patients: 8, capacity: 10, status: 'On Leave', 
      schedule: 'Tue - Sat (09:00 - 18:00)', email: 'm.chen@physiohub.com' 
    },
    { 
      id: 3, name: 'Dr. Elena Rodriguez', specialty: 'Pediatric Physio', 
      patients: 14, capacity: 15, status: 'Active', 
      schedule: 'Mon - Thu (07:00 - 16:00)', email: 'elena.r@physiohub.com' 
    },
  ]);

  const handleOpenModal = (therapist = null) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Therapist Directory</h1>
          <p className="text-sm text-gray-500 font-medium">Manage clinical staff and workload distribution</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Therapist
        </button>
      </div>

      {/* --- Therapist Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {therapists.map((staff) => (
          <div key={staff.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 hover:border-indigo-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                {staff.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {staff.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{staff.name}</h3>
            <p className="text-indigo-600 text-sm font-semibold mb-4">{staff.specialty}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{staff.schedule}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
                <span className="truncate">{staff.email}</span>
              </div>
            </div>

            {/* --- Workload/Capacity Meter --- */}
            <div className="p-4 bg-gray-50 rounded-2xl mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Patient Load</span>
                <span className="text-sm font-bold text-gray-900">{staff.patients} / {staff.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    (staff.patients / staff.capacity) > 0.8 ? 'bg-orange-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${(staff.patients / staff.capacity) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors">
                Assign Patient
              </button>
              <button 
                onClick={() => handleOpenModal(staff)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Therapist Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedTherapist ? 'Edit Therapist' : 'Onboard Therapist'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); toast.success('Staff records updated'); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                  <input type="text" defaultValue={selectedTherapist?.name} className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Specialty</label>
                  <select className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>General Physio</option>
                    <option>Sports Injury</option>
                    <option>Orthopedic</option>
                    <option>Neurological</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Work Schedule</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Days (e.g. Mon-Fri)" defaultValue={selectedTherapist?.schedule.split(' (')[0]} className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  <input type="text" placeholder="Hours (e.g. 08:00-17:00)" className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-gray-100 rounded-[2rem] bg-indigo-50/30">
                <h4 className="text-xs font-bold text-indigo-600 uppercase mb-3 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Quick Assign Patients
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border border-indigo-100 rounded-lg text-xs font-medium text-indigo-700">+ Select Patient</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistManagement;