import CustomDataTable from '@/components/ui/my-components/my-table';
import Link from 'next/link';

export default function InventoryTable({ data, columns }) {
    return (
        <div className="shadow rounded-lg overflow-hidden mb-8">
            <CustomDataTable
                data={data || []}
                columns={columns}
                searchColumen="name"
            />
        </div>
    );
}