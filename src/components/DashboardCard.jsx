import { createElement } from 'react';
import { TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const DashboardCard = ({ title, value, change, trend, icon: Icon, color = 'from-blue-500 to-indigo-600' }) => {
  return (
    <div className={clsx(
      'group relative overflow-hidden rounded-3xl p-8 shadow-xl bg-gradient-to-br',
      color,
      'text-white hover:scale-[1.05] transition-all duration-300 hover:shadow-2xl border-0'
    )}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-white/90 text-sm font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="mt-2 flex items-center gap-1 text-white/80 text-sm">
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
            <span>{change}% from last month</span>
          </p>
        </div>
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-all">
          {createElement(Icon, { className: 'w-8 h-8 opacity-90' })}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;

