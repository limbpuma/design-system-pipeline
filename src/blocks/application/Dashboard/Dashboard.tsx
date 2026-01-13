import React from 'react';

// --- Types ---

interface StatsCardProps {
    title: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down';
}

interface ActivityItemProps {
    userAvatar: string;
    userName: string;
    action: string;
    time: string;
}

interface QuickActionProps {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

// --- Icons (internal for zero-dependency) ---

const IconUsers = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const IconTrendingUp = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);

const IconPlus = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const IconFileText = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

// --- Sub-Components ---

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, trendDirection }) => (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            {/* Icon based on title could go here, omitting for simplicity/generality */}
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
            <p className={`text-sm mt-1 flex items-center ${trendDirection === 'up'
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-red-600 dark:text-red-500'
                }`}>
                {trend}
            </p>
        </div>
    </div>
);

const ActivityItem: React.FC<ActivityItemProps> = ({ userAvatar, userName, action, time }) => (
    <li className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
        <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full bg-gray-200" src={userAvatar} alt={userName} />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">
                {userName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {action}
            </p>
        </div>
        <div className="flex-shrink-0">
            <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
        </div>
    </li>
);

const QuickActionButton: React.FC<QuickActionProps> = ({ label, icon, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 rounded-lg
      bg-white dark:bg-gray-950
      border border-gray-200 dark:border-gray-800
      hover:bg-gray-50 dark:hover:bg-gray-900
      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      transition-all group w-full"
    >
        <div className="h-8 w-8 text-blue-600 dark:text-blue-500 mb-2 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </button>
);

// --- Main Component ---

export const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-50">

            {/* Header */}
            <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <nav className="flex mb-2" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2">
                            <li>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Application</span>
                            </li>
                            <li>
                                <span className="text-sm text-gray-400 dark:text-gray-600">/</span>
                            </li>
                            <li>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-50" aria-current="page">Dashboard</span>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-50 sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats Grid */}
                <section aria-label="Key Metrics" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatsCard
                        title="Total Users"
                        value="12,543"
                        trend="+12% from last month"
                        trendDirection="up"
                    />
                    <StatsCard
                        title="Revenue"
                        value="$45,231"
                        trend="+4.3% from last week"
                        trendDirection="up"
                    />
                    <StatsCard
                        title="Active Projects"
                        value="382"
                        trend="-2.5% from last month"
                        trendDirection="down"
                    />
                    <StatsCard
                        title="Conversion Rate"
                        value="3.2%"
                        trend="+0.4% from yesterday"
                        trendDirection="up"
                    />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Column (Chart) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Chart Area */}
                        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Revenue Overview</h2>
                                <div className="flex items-center space-x-2">
                                    {/* Example time range selector */}
                                    <select className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last year</option>
                                    </select>
                                </div>
                            </div>

                            {/* Chart Placeholder */}
                            <div className="w-full aspect-[16/9] bg-gray-50 dark:bg-gray-900 rounded border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                                    {/* Abstract Grid Lines for visual interest */}
                                    <svg className="w-full h-full text-blue-500" fill="none">
                                        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>
                                <div className="text-center z-10">
                                    <IconTrendingUp className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Chart visualization would render here</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions (Mobile/Tablet prominent, but good in grid too) */}
                        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <QuickActionButton label="New Project" icon={<IconPlus />} />
                                <QuickActionButton label="Generate Report" icon={<IconFileText />} />
                                <QuickActionButton label="Manage Users" icon={<IconUsers />} />
                                <QuickActionButton label="System Settings" icon={<IconSettings />} />
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Column (Activity) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">Recent Activity</h2>
                            </div>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                                <ActivityItem
                                    userAvatar="https://ui-avatars.com/api/?name=Alex+M&background=0D8ABC&color=fff"
                                    userName="Alex Morgan"
                                    action="deployed new version to production"
                                    time="2m ago"
                                />
                                <ActivityItem
                                    userAvatar="https://ui-avatars.com/api/?name=Sarah+C&background=16a34a&color=fff"
                                    userName="Sarah Connors"
                                    action="completed task #8321"
                                    time="15m ago"
                                />
                                <ActivityItem
                                    userAvatar="https://ui-avatars.com/api/?name=Mike+R&background=f59e0b&color=fff"
                                    userName="Mike Ross"
                                    action="commented on design review"
                                    time="1h ago"
                                />
                                <ActivityItem
                                    userAvatar="https://ui-avatars.com/api/?name=Jessica+L&background=dc2626&color=fff"
                                    userName="Jessica Lee"
                                    action="reported a critical bug"
                                    time="3h ago"
                                />
                                <ActivityItem
                                    userAvatar="https://ui-avatars.com/api/?name=David+K&background=6b7280&color=fff"
                                    userName="David Kim"
                                    action="created new project 'InmoAI'"
                                    time="5h ago"
                                />
                            </ul>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                                <button type="button" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 block text-center w-full">
                                    View all activity
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
