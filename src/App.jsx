import { lazy, Suspense, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Activity,
  CalendarClock,
  Home as HomeIcon,
  Shield,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "./stores/authStore";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import PatientLayout from "./components/PatientLayout";
import DoctorLayout from "./components/DoctorLayout";
import PatientManagement from "./components/AdminPatient";
import LoginModal from "./components/LoginModal";
import TherapistManagement from "./components/AdminTherapists";
import AppointmentManagement from "./components/AdminAppointments";
import TreatmentManagement from "./components/AdminTreatments";
import BillingManagement from "./components/AdminPayments";
import AnalyticsDashboard from "./components/AdminAnalytics";
import PatientProgress from "./components/AdminPatientProgress";
import NotificationsHub from "./components/AdminNotifications";
import SettingsManager from "./components/AdminSettings";
import About from "./pages/About";

const Home = lazy(() => import("./pages/Home"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"));
const DoctorDashboard = lazy(() => import("./pages/DoctorDashboard"));

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to access dashboard");
      navigate("/", { state: { from: location }, replace: true });
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      toast.error("Access denied. Wrong role.");
      navigate("/", { replace: true });
    }
  }, [location, navigate, requiredRole, user]);

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null;
  }

  return children;
};

const Landing = () => (
  <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.18),transparent_30%),linear-gradient(135deg,#fff7ed_0%,#ecfeff_50%,#eff6ff_100%)] px-6 py-10 md:px-10">
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4" />
          Digital care for modern physiotherapy teams
        </div>
        <div className="mb-10">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl">
            <HomeIcon className="h-14 w-14 text-white" />
          </div>
          <h1 className="max-w-3xl bg-gradient-to-r from-orange-600 via-red-600 to-teal-600 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-7xl">
            Welcome to PhysioHub
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Run appointments, recovery plans, and care coordination from one
            place. Patients stay engaged, doctors stay on schedule, and admins
            keep the whole clinic visible.
          </p>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <LoginModal />
          <a
            href="/home"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
          >
            Explore Website
          </a>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Recovery Rate
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">97%</p>
            <p className="mt-2 text-sm text-slate-600">
              Programs completed on target with guided plans.
            </p>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Sessions Managed
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">10K+</p>
            <p className="mt-2 text-sm text-slate-600">
              Appointments, follow-ups, and reports in one flow.
            </p>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Live Visibility
            </p>
            <p className="mt-3 text-3xl font-black text-slate-900">24/7</p>
            <p className="mt-2 text-sm text-slate-600">
              Role-based access for admins, doctors, and patients.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-orange-200/50 blur-3xl lg:block" />
        <div className="absolute -right-8 bottom-10 hidden h-32 w-32 rounded-full bg-teal-200/60 blur-3xl lg:block" />
        <div className="relative space-y-6 rounded-[2rem] border border-white/60 bg-slate-950 p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between rounded-3xl bg-white/10 p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Today
              </p>
              <p className="mt-2 text-2xl font-bold">Clinic Command Center</p>
            </div>
            <Activity className="h-10 w-10 text-orange-300" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/8 p-5">
              <Shield className="mb-4 h-8 w-8 text-blue-300" />
              <h3 className="text-lg font-bold">Admin</h3>
              <p className="mt-2 text-sm text-slate-300">
                Track clinic growth, staffing, and patient flow.
              </p>
            </div>
            <div className="rounded-3xl bg-white/8 p-5">
              <User className="mb-4 h-8 w-8 text-emerald-300" />
              <h3 className="text-lg font-bold">Patient</h3>
              <p className="mt-2 text-sm text-slate-300">
                See appointments, progress, and next steps instantly.
              </p>
            </div>
            <div className="rounded-3xl bg-white/8 p-5">
              <Stethoscope className="mb-4 h-8 w-8 text-orange-300" />
              <h3 className="text-lg font-bold">Doctor</h3>
              <p className="mt-2 text-sm text-slate-300">
                Manage visits, treatment plans, and reporting windows.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-r from-orange-500/20 to-teal-400/20 p-5">
            <div className="mb-4 flex items-center gap-3">
              <CalendarClock className="h-8 w-8 text-orange-200" />
              <div>
                <p className="text-lg font-bold">Next clinic milestone</p>
                <p className="text-sm text-slate-300">
                  Peak appointment block begins at 10:00 AM
                </p>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="font-semibold">5 appointments booked</p>
                <p className="mt-1 text-slate-300">
                  Doctor dashboard auto-highlights today&apos;s queue.
                </p>
              </div>
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="font-semibold">2 reports pending</p>
                <p className="mt-1 text-slate-300">
                  Admin view surfaces clinic bottlenecks quickly.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <Shield className="mx-auto mb-4 h-16 w-16 text-blue-500" />
              <h3 className="mb-2 text-2xl font-bold">Admin</h3>
              <p className="text-slate-300">Manage users and analytics</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <User className="mx-auto mb-4 h-16 w-16 text-green-500" />
              <h3 className="mb-2 text-2xl font-bold">Patient</h3>
              <p className="text-slate-300">Track progress and appointments</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <Stethoscope className="mx-auto mb-4 h-16 w-16 text-orange-500" />
              <h3 className="mb-2 text-2xl font-bold">Doctor</h3>
              <p className="text-slate-300">Manage patients and schedules</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
);

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="patient-management" element={<PatientManagement />} />
            <Route
              path="Therapist-Management"
              element={<TherapistManagement />}
            />
            <Route
              path="Appointment-Management"
              element={<AppointmentManagement />}
            />
            <Route
              path="Treatment-Management"
              element={<TreatmentManagement />}
            />
            <Route path="Billing-Management" element={<BillingManagement />} />
            <Route
              path="Analytics-Dashboard"
              element={<AnalyticsDashboard />}
            />
            <Route path="Patient-Progress" element={<PatientProgress />} />
            <Route path="Notifications-Hub" element={<NotificationsHub />} />
            <Route path="Settings-Manager" element={<SettingsManager />} />
          </Route>
          <Route
            path="/patient/*"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<PatientDashboard />} />
          </Route>
          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DoctorDashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
