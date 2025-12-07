import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart({ data }) {
  
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Progress Over Time
        </h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            No progress data available yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Progress Over Time
      </h3>
      <div className="h-64 min-h-0 min-w-0"> {/* Added min-h-0 and min-w-0 */}
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
              strokeOpacity={0.5}
            />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={[0, 'dataMax + 1']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
              labelStyle={{ color: '#D1D5DB', fontWeight: '600' }}
              labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            />
            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ 
                stroke: '#3B82F6', 
                strokeWidth: 2, 
                r: 4,
                fill: 'rgba(59, 130, 246, 0.8)'
              }}
              activeDot={{ 
                r: 6, 
                stroke: '#1D4ED8',
                strokeWidth: 2,
                fill: '#3B82F6'
              }}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}