import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { APP_CONFIG } from '@/config';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="px-6 py-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                            Manage Tasks with <span className="text-blue-600">Ease</span> and <span className="text-blue-600">Efficiency</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg">
                            Transform your workflow with our intuitive task management platform. Stay organized, meet deadlines, and achieve your goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Start for Free
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative z-10">
                            <div className="bg-white rounded-lg shadow-xl p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-lg">Project Tasks</h3>
                                        <span className="text-sm text-gray-500">Today</span>
                                    </div>
                                    {[
                                        { text: 'Design Landing Page', done: true },
                                        { text: 'Implement Authentication', done: true },
                                        { text: 'Set up Database', done: false },
                                        { text: 'Add Analytics', done: false },
                                    ].map((task, i) => (
                                        <div key={i} className="flex items-center space-x-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                                {task.done && (
                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 transform rotate-3 rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything you need to stay productive
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our platform provides all the essential tools to help you manage tasks effectively and boost your productivity.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Task Organization',
                                description: 'Organize tasks with custom categories, priorities, and due dates.',
                                icon: (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Progress Tracking',
                                description: 'Monitor task completion and track project progress in real-time.',
                                icon: (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Team Collaboration',
                                description: 'Share tasks, assign responsibilities, and collaborate seamlessly.',
                                icon: (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                            },
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Ready to boost your productivity?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Join thousands of users who are already managing their tasks effectively.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg">Get Started Now</Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline">Sign In</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path d="M3.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path d="M14 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path d="M3.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path d="M14 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path d="M4 6v13" />
                                    <path d="M14 6v13" />
                                    <path d="M4 9h12" />
                                    <path d="M4 16h12" />
                                </svg>
                                <span className="text-xl font-bold text-gray-900">{APP_CONFIG.APP_NAME}</span>
                            </div>
                            <p className="text-gray-600">
                                Making task management simple and efficient.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Features</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Blog</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-12 pt-8">
                        <p className="text-center text-gray-600">
                            © 2025 {APP_CONFIG.APP_NAME}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
