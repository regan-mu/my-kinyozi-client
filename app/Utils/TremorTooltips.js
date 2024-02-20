// Data visualization tooltips
export const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-dark-tremor-content-subtle">{category.dataKey.toUpperCase()}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value}
              </p>
              <p className="text-tremor-label text-dark-tremor-content-subtle">
                {category?.payload?.day || category?.payload?.name }
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

 export  const donutTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5 border-l-4 border-secondary">
          <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8 ">
              <p className="text-right text-tremor-content-strong whitespace-nowrap">
                {categoryPayload.name}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };