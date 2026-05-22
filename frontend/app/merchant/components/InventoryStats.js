import { formatCurrency } from "@/util/currency";

export default function InventoryStats({ inventory }) {
  const totalItems = inventory?.reduce((sum, item) => sum + (item.quantity), 0)
  const lowStockItems = inventory?.filter(item => item.quantity < 10).length;
  const outOfStockItems = inventory?.filter(item => item.quantity === 0).length;
  const inventoryValue = inventory?.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const stats = [
    { name: 'Total Products', value: totalItems },
    { name: 'Low Stock', value: lowStockItems, alert: lowStockItems > 0 },
    { name: 'Out of Stock', value: outOfStockItems, alert: outOfStockItems > 0 },
    { name: 'Inventory Value', value: `${formatCurrency(inventoryValue)}` },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 flex-1 lg:grid-cols-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.name} className={`overflow-hidden shadow rounded-lg 
          ${stat.alert ? 'border-l-4 border-red-500' : ''}`}>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col">
              <div className="flex-shrink-0 flex items-center rounded-md p-3">
                <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="flex-1">
                <dt className="text-sm font-medium  dark:text-white">{stat.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold dark:text-white">{stat.value}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}