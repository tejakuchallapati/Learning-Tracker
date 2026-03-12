import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CourseCatalog from './pages/CourseCatalog';
import CourseRoadmap from './pages/CourseRoadmap';
import CourseDetail from './pages/CourseDetail';
import TopicContent from './pages/TopicContent';
import Progress from './pages/Progress';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Notes from './pages/Notes';
import DevChatSection from './pages/DevChatSection';
import Bookmarks from './pages/Bookmarks';

// Layout
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/courses" element={<DashboardLayout><CourseCatalog /></DashboardLayout>} />
        <Route path="/roadmap/:id" element={<DashboardLayout><CourseRoadmap /></DashboardLayout>} />
        <Route path="/roadmap/:courseId/:stepIdx" element={<DashboardLayout><CourseDetail /></DashboardLayout>} />
        <Route path="/roadmap/:courseId/:stepIdx/:topicIdx" element={<DashboardLayout><TopicContent /></DashboardLayout>} />
        <Route path="/progress" element={<DashboardLayout><Progress /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><Insights /></DashboardLayout>} />
        <Route path="/chat" element={<DashboardLayout><DevChatSection /></DashboardLayout>} />
        <Route path="/notes" element={<DashboardLayout><Notes /></DashboardLayout>} />
        <Route path="/bookmarks" element={<DashboardLayout><Bookmarks /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        {/* Redirect any other path to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
