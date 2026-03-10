import { Link } from 'react-router-dom';
import { FiTarget, FiActivity, FiPieChart } from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 max-w-7xl w-full mx-auto">
                <h1 className="text-2xl font-bold tracking-tight text-indigo-900">DevTrack</h1>
                <div className="flex gap-4">
                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium px-4 py-2">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium px-5 py-2 rounded-lg transition-colors shadow-sm">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mb-6 leading-tight">
                    Master Your Tech Career with <span className="text-indigo-600">DevTrack</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                    The ultimate productivity platform for developers to track learning progress, monitor daily study hours, and crush technology goals.
                </p>
                <div className="flex gap-4">
                    <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-indigo-200">
                        Start Tracking Free
                    </Link>
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-white py-24 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to stay consistent</h2>
                        <p className="text-gray-500">Built specifically for the busy developer learning complex topics.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <FiTarget className="w-8 h-8 text-indigo-500" />,
                                title: "Set structured goals",
                                desc: "Define your technologies, target hours, and deadlines to structure your learning path."
                            },
                            {
                                icon: <FiActivity className="w-8 h-8 text-emerald-500" />,
                                title: "Track daily progress",
                                desc: "Log your study time and keep your streak alive to build long-lasting habits."
                            },
                            {
                                icon: <FiPieChart className="w-8 h-8 text-blue-500" />,
                                title: "Smart analytics",
                                desc: "Visualize your weekly study hours and see smart suggestions to stay on track."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="text-left rounded-2xl p-6 hover:bg-gray-50 transition-colors">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 text-center">
                <p>&copy; {new Date().getFullYear()} DevTrack. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
