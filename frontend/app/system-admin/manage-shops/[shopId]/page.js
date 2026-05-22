'use client'
import { Button } from '@/components/ui/button';
import { useGetShopQuery } from '@/lib/features/shop/shop';
import { Email } from '@mui/icons-material';
import {
    Clock,
    MapPin,
    Users,
    DollarSign,
    Store,
    Phone,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const ShopDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const { data, isLoading, isError } = useGetShopQuery(params.shopId)
    console.log(data, params, isError)

    if (isLoading) {
        return (
            <div>
                <h1>loading...</h1>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <h1>sorry Something went wrong. we can not load the shops.</h1>
            </div>
        )
    }
    return (
        <div className="min-h-screen dark:text-white pt-3">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <Store className="w-8 h-8 text-blue-600" />
                        <h1 className="text-3xl font-bold">{data?.shop?.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => router.push('/system-admin/manage-shops')}
                            className="bg-orange-700"
                        >
                            Back to Shops
                        </Button>
                    </div>
                </div>
                {/* Status and Basic Info */}
                <div className="flex flex-wrap gap-4 mb-8 items-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${data?.shop?.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {data?.shop?.status.charAt(0).toUpperCase() + data?.shop?.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{`${data?.shop?.location?.woreda + " " + data?.shop?.location?.town + " " + data?.shop?.location?.region + " " + data?.shop?.location?.country + " "}`}</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Basic Information Card */}
                        <div className=" p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Shop Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm ">Shop ID</label>
                                    <p className="font-medium">{data?.shop?.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm ">Owner</label>
                                    <p className="font-medium">{data?.shop?.merchant.ownerName}</p>
                                </div>
                                <div>
                                    <label className="text-sm ">Registration Date</label>
                                    <p className="font-medium">{
                                        new Date(data?.shop?.updatedAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true, // optional: for AM/PM
                                        })
                                    }</p>
                                </div>
                                <div>
                                    <label className="text-sm ">Last Activity</label>
                                    <p className="font-medium">{
                                        new Date(data?.shop?.updatedAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true, // optional: for AM/PM
                                        })
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Contact Information Card */}
                        <div className=" p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Email className="w-5 h-5 " />
                                    <span className="font-medium">{data?.shop?.merchant?.businessEmail}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 " />
                                    <span className="font-medium">{data?.shop?.merchant?.businessPhone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Actions Section */}
                {/* <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Activate Shop
                        </button>
                        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                            Suspend Shop
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Delete Shop
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                            Generate Report
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ShopDetailPage;