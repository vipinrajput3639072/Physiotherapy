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
  Settings,
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
import AppointmentDashboard from "./components/DoctorAppointments";
import MyPatientsDashboard from "./components/DoctorPatient";
import PatientAppointments from "./components/PatientAppointment";
import PatientMessages from "./components/PatientMessages";
import PatientNotifications from "./components/PatientNotifications";
import PatientTreatmentPlan from "./components/PatientTreatmentPlan";
import PatientExercises from "./components/PatientExercises";
import Payments from "./components/PatientPayments";
import Profile from "./components/PatientProfile";
import VideoConsults from "./components/AdminVideoConsults";
import PatientReviews from "./components/AdminPatientReviews";
import PatientSettings from "./components/PatientSettings";

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
  <>
    <Home />
  </>
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
            <Route path="Video-Management" element={<VideoConsults />}/>
            <Route path="Patient-Reviews" element={<PatientReviews/>}/>
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
            <Route path="Settings" element={<PatientSettings />} />
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
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="Messages" element={<PatientMessages/>}/>
            <Route path="Notifications" element={<PatientNotifications />} />
            <Route path="Treatment-Plan" element={<PatientTreatmentPlan />}/>
            <Route path="Exercises" element={<PatientExercises/>}/>
            <Route path="Progress" element={<PatientProgress />}/>
            <Route path="Payments" element={<Payments />}/>
            <Route path="Profile" element={<Profile />}/>
            <Route path="Settings" element={<Settings />}/>
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
            <Route
              path="Appointment-Dashboard"
              element={<AppointmentDashboard />}
            />
            <Route
              path="MyPatients-Dashboard"
              element={<MyPatientsDashboard />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
