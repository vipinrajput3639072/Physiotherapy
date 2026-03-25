import { useState } from 'react';
import { 
  Receipt, Plus, Download, Filter, 
  CreditCard, DollarSign, Clock, CheckCircle2, 
  AlertCircle, MoreHorizontal, ExternalLink, Search 
} from 'lucide-react';
import toast from 'react-hot-toast';

const BillingManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Billing Data
  const [invoices, setInvoices] = useState([
    { 
      id: "INV-8821", patient: "John Cooper", date: "2024-05-15", 
      amount: 120.00, status: "Paid", method: "Credit Card", 
      service: "Initial Assessment" 
    },
    { 
      id: "INV-8822", patient: "Maria Garcia", date: "2024-05-18", 
      amount: 85.50, status: "Pending", method: "Insurance", 
      service: "Physiotherapy Session" 
    },
    { 
      id: "INV-8823", patient: "Robert Fox", date: "2024-05-10", 
      amount: 210.00, status: "Overdue", method: "Direct Bank", 
      service: "Sports Massage Package" 
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Overdue': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    (activeTab === 'all' || inv.status.toLowerCase() === activeTab) &&
    inv.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* --- Financial Summary --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', val: '$42,500', icon: DollarSign, color: 'bg-emerald-600' },
          { label: 'Pending Invoices', val: '$1,240', icon: Clock, color: 'bg-amber-500' },
          { label: 'Outstanding Debt', val: '$850', icon: AlertCircle, color: 'bg-rose-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <h2 className="text-2xl font-black text-gray-900 mt-1">{stat.val}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Billing Section --- */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Invoices & Payments</h2>
            <p className="text-sm text-gray-500">Generate, track and manage clinic billing</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patient..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-48 md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => toast.success('Invoice Generation Tool Opened')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
            >
              <Plus className="w-4 h-4" /> New Invoice
            </button>
          </div>
        </div>

        {/* --- Tabs --- */}
        <div className="px-8 py-4 bg-gray-50/50 flex gap-6">
          {['all', 'paid', 'pending', 'overdue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-widest transition-all relative py-2 ${
                activeTab === tab ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* --- Invoice Table --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase">Invoice ID</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase">Patient / Service</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase">Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase text-center">Amount</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-gray-600 text-sm">#{inv.id}</td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold text-gray-900">{inv.patient}</p>
                      <p className="text-xs text-gray-400">{inv.service}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">{inv.date}</td>
                  <td className="px-8 py-5 text-center font-black text-gray-900">${inv.amount.toFixed(2)}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Send Link">
                        <ExternalLink className="w-4 h-4" />
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
  );
};

export default BillingManagement;