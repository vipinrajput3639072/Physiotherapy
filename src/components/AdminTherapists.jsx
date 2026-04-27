import React, { useState } from 'react';
import { 
  Plus, Clock, Mail, Settings, Users, X, Search, Activity 
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const TherapistManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // --- Initial Mock Data ---
  const [therapists, setTherapists] = useState([
    { 
      id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Sports Injury', 
      patients: 12, capacity: 15, status: 'Active', 
      schedule: 'Mon - Fri (08:00 - 17:00)', email: 'sarah.j@physiohub.com',
      avatar: 'SJ'
    },
    { 
      id: 2, name: 'Dr. Michael Chen', specialty: 'Neurological Rehab', 
      patients: 8, capacity: 10, status: 'On Leave', 
      schedule: 'Tue - Sat (09:00 - 18:00)', email: 'm.chen@physiohub.com',
      avatar: 'MC'
    }
  ]);

  // --- Form State ---
  const initialFormState = {
    name: '',
    specialty: 'Sports Injury',
    status: 'Active',
    days: '',
    times: '',
    email: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleOpenModal = (therapist = null) => {
    if (therapist) {
      setSelectedTherapist(therapist);
      setFormData({
        name: therapist.name,
        specialty: therapist.specialty,
        status: therapist.status,
        days: therapist.schedule.split(' (')[0],
        times: therapist.schedule.match(/\((.*?)\)/)?.[1] || '',
        email: therapist.email
      });
    } else {
      setSelectedTherapist(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (selectedTherapist) {
      // Update Logic
      setTherapists(prev => prev.map(t => 
        t.id === selectedTherapist.id 
          ? { ...t, ...formData, schedule: `${formData.days} (${formData.times})` } 
          : t
      ));
      toast.success('Staff record updated');
    } else {
      // Add Logic
      const newStaff = {
        id: Date.now(),
        ...formData,
        patients: 0,
        capacity: 15,
        schedule: `${formData.days} (${formData.times})`,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      };
      setTherapists(prev => [...prev, newStaff]);
      toast.success('New therapist onboarded');
    }

    setIsModalOpen(false);
  };

  const filteredTherapists = therapists.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-0 lg:ml-72 min-h-screen bg-gray-50/50 p-4 md:p-8 pt-10">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Therapist <span className="text-blue-600">Directory</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search staff..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none w-64 shadow-sm"
              />
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-3 px-5 py-3 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-700 shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add Specialist
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Staff" value={therapists.length} icon={Users} color="text-blue-600" bg="bg-blue-50" />
            <StatCard label="Avg Workload" value="78%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50" />
            <StatCard label="Available Slots" value="12" icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTherapists.map((staff) => (
            <TherapistCard key={staff.id} staff={staff} onEdit={handleOpenModal} />
          ))}
        </div>
      </div>

      {/* --- ADD/EDIT DRAWER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-gray-900/40 backdrop-blur-md">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto p-8 md:p-12">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">
                {selectedTherapist ? 'Edit' : 'Onboard'} <span className="text-blue-600 underline">Specialist</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="space-y-2">
                <FormLabel>Full Name</FormLabel>
                <input 
                  required
                  className="form-input-custom"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Dr. John Smith"
                />
              </div>

              <div className="space-y-2">
                <FormLabel>Email Address</FormLabel>
                <input 
                  type="email"
                  required
                  className="form-input-custom"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john.s@physiohub.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <FormLabel>Specialty</FormLabel>
                  <select 
                    className="form-input-custom"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  >
                    <option>Sports Injury</option>
                    <option>Neurological Rehab</option>
                    <option>Pediatric Physio</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <FormLabel>Status</FormLabel>
                  <select 
                    className="form-input-custom"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>Active</option>
                    <option>On Leave</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>Schedule</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Mon-Fri" className="form-input-custom" value={formData.days} onChange={(e) => setFormData({...formData, days: e.target.value})} />
                  <input placeholder="09:00-17:00" className="form-input-custom" value={formData.times} onChange={(e) => setFormData({...formData, times: e.target.value})} />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 font-bold text-gray-400">Cancel</button>
                <button type="submit" className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 shadow-lg transition-all">
                  {selectedTherapist ? 'Update Record' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .form-input-custom {
          width: 100%;
          padding: 1.25rem;
          background: #f9fafb;
          border: 2px solid transparent;
          border-radius: 1.25rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s;
        }
        .form-input-custom:focus {
          border-color: #2563eb33;
          background: white;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

// --- Helper Sub-Components ---
const FormLabel = ({children}) => <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{children}</label>;

const StatCard = ({label, value, icon: Icon, color, bg}) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-5">
    <div className={`p-4 rounded-2xl ${bg} ${color}`}><Icon className="w-6 h-6" /></div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

const TherapistCard = ({staff, onEdit}) => (
  <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
    <div className="flex justify-between items-start mb-8">
      <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl">{staff.avatar}</div>
      <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{staff.status}</div>
    </div>
    <h3 className="text-2xl font-black text-gray-900">{staff.name}</h3>
    <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">{staff.specialty}</p>
    <div className="space-y-3 mb-8">
      <div className="flex items-center gap-3 text-gray-500 text-sm font-bold"><Clock className="w-4 h-4" /> {staff.schedule}</div>
      <div className="flex items-center gap-3 text-gray-500 text-sm font-bold"><Mail className="w-4 h-4" /> {staff.email}</div>
    </div>
    <div className="flex gap-4">
      <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">View Cases</button>
      <button onClick={() => onEdit(staff)} className="px-5 py-4 bg-gray-50 text-gray-400 rounded-2xl hover:text-blue-600 transition-colors"><Settings className="w-5 h-5" /></button>
    </div>
  </div>
);

export default TherapistManagement;