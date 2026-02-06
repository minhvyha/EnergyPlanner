import Header from '@/components/Header'

export default function MyWeekScreen() {
  const weekData = [
    { day: 'M', energy: 'L', color: 'text-[#FF5A7C]' },
    { day: 'T', energy: 'M', color: 'text-[#FDE047]' },
    { day: 'W', energy: 'L', color: 'text-[#FF5A7C]' },
    { day: 'T', energy: 'H', color: 'text-[#39BAD1]' },
    { day: 'F', energy: 'M', color: 'text-[#FDE047]' },
    { day: 'S', energy: 'L', color: 'text-[#FF5A7C]' },
    { day: 'S', energy: 'L', color: 'text-[#FF5A7C]' },
  ]

  const taskBreakdown = [2, 3, 1, 5, 3, 2, 1]

  return (
    <div>
      <Header />
      
      <div className="px-8">
        <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-black">Right Now</h2>
          </div>

        {/* Week Overview */}
        <div className="bg-white border-[3px] border-black rounded-[24px] p-5 mb-6 ">
          <div className="flex justify-around">
            {weekData.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-black">{item.day}</span>
                <span className={`text-2xl font-bold ${item.color}`}>{item.energy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-black mb-3">Insights:</h3>
          <ul className="space-y-2 text-gray-700 leading-relaxed">
            <li className="flex gap-2">
              <span>•</span>
              <span>You felt lowest at the end of the week</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>You felt most focused in the evenings</span>
            </li>
          </ul>
        </div>

        {/* Task Breakdown Chart */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-black mb-4">Task Breakdown</h3>
          <div className="bg-white border-[3px] border-black rounded-[24px] p-6 ">
            <div className="flex items-end justify-around h-48 gap-2">
              {taskBreakdown.map((value, index) => {
                const height = (value / 5) * 100
                return (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div className="text-xs font-bold text-black">{value}</div>
                    <div
                      className="w-full bg-white border-[2px] border-black rounded-t-lg"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs font-bold text-black mt-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
