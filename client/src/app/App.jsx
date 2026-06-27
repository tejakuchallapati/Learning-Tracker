import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import Login from '../pages/Login';
import Landing from '../pages/Landing';
import AppWalkthrough from '../pages/AppWalkthrough';
import Dashboard from '../pages/Dashboard';
import CourseCatalog from '../pages/CourseCatalog';
import CourseRoadmap from '../pages/CourseRoadmap';
import CourseDetail from '../pages/CourseDetail';
import TopicContent from '../pages/TopicContent';
import Progress from '../pages/Progress';
import Insights from '../pages/Insights';
import Settings from '../pages/Settings';
import Notes from '../pages/Notes';
import Bookmarks from '../pages/Bookmarks';
import Goals from '../pages/Goals';
import Admin from '../pages/Admin';
import MobileLandingPreview from '../pages/MobileLandingPreview';

import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';
import { DASHBOARD_MAIN } from '../components/layout/PageHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import AnalyticsPageTracker from '../components/analytics/AnalyticsPageTracker';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Checking session…" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Checking session…" />;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Checking session…" />;
  }

  if (user) {
    return <Navigate to={user.isAdmin ? '/admin' : '/dashboard'} replace />;
  }
  return children;
};

const DashboardLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isCourseCatalog = pathname === '/courses';

  return (
    <div className="dashboard-shell font-body flex h-screen max-md:min-h-[100dvh] max-md:max-h-[100dvh] bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-300 flex-col md:flex-row transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <Navbar />
        <main className={DASHBOARD_MAIN}>
          {isCourseCatalog ? (
            children
          ) : (
            <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto pb-20 md:pb-8 max-md:overscroll-y-contain max-md:[-webkit-overflow-scrolling:touch]">
              {children}
            </div>
          )}
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

const dashboardRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/courses", element: <CourseCatalog /> },
  { path: "/roadmap/:id", element: <CourseRoadmap /> },
  { path: "/roadmap/:courseId/:stepIdx", element: <CourseDetail /> },
  { path: "/roadmap/:courseId/:stepIdx/:topicIdx", element: <TopicContent /> },
  { path: "/progress", element: <Progress /> },
  { path: "/analytics", element: <Insights /> },
  { path: "/notes", element: <Notes /> },
  { path: "/bookmarks", element: <Bookmarks /> },
  { path: "/goals", element: <Goals /> },
  { path: "/settings", element: <Settings /> },
  { path: "/admin", element: <Admin />, adminOnly: true },
];

function App() {
  return (
    <Router>
      <AnalyticsPageTracker />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/walkthrough" element={<AppWalkthrough />} />
        <Route path="/preview/mobile" element={<MobileLandingPreview />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<Navigate to="/login" replace />} />

        {dashboardRoutes.map(({ path, element, adminOnly }) => (
          <Route
            key={path}
            path={path}
            element={
              adminOnly ? (
                <AdminRoute>
                  <DashboardLayout>{element}</DashboardLayout>
                </AdminRoute>
              ) : (
                <ProtectedRoute>
                  <DashboardLayout>{element}</DashboardLayout>
                </ProtectedRoute>
              )
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
