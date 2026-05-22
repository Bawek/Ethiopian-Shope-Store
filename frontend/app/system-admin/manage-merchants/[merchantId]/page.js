'use client'
import { Button } from "@/components/ui/button";
import { useChangeMerchantStatusMutation, useGetMerchantByIdQuery } from "@/lib/features/merchant/registrationApi";
import { Edit, PhoneMissed } from "lucide-react"
import { useParams } from "next/navigation";
import MerchantCard from "@/components/ui/my-components/imageMagnifier";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const MerchantDetailPage = () => {
    const { toast } = useToast()
    const params = useParams()
    const { merchantId } = params
    const { data, isLoading, isError } = useGetMerchantByIdQuery(merchantId)
    const [changeMerchantStatus, { isLoading: statusLoading, isError: statusError }] = useChangeMerchantStatusMutation()
    const merchant = data?.merchant
    const [currentStatus, setCurrentStatus] = useState(merchant?.status || 'PENDING')
    const handleChange = async (e) => {
        const status = e.target.value
        try {
            const response = await changeMerchantStatus({
                id: merchant?.id,
                status: status
            }).unwrap()
            // window.location.reload()
            console.log(response, 'current status')
            if (statusError) {
                throw Error('something went wrong please try again')
            }
            setCurrentStatus(status)
            toast({
                title: ` ${response?.status} `,
                description: `${response?.message} `,
                variant: 'secondary',
                duration: 2000

            })
        } catch (error) {
            console.log(error, 'status error')

            throw Error('something went wrong please try again')

        }

    }
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }
    if (isError) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">something went wrong please refresh the page</div>
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-2">Merchants Detail page</h1>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{`${merchant?.account?.firstName} ${merchant?.account?.lastName}`}</h1>
                    <div className="flex gap-2">
                        {/* <Button className="">
                            Edit Merchant
                        </Button> */}
                        <Button
                            className="bg-orange-700"
                            onClick={() => window.history.back()}
                        >
                            Back to List
                        </Button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mb-8">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${currentStatus === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                    </span>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className=" p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">General Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm ">Merchant ID</label>
                                <p className="font-medium">{merchant.id}</p>
                            </div>

                            <div>
                                <label className="text-sm ">Registration Date</label>
                                <p className="font-medium">{new Date(merchant.registrationDate).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true, // optional: for AM/PM
                                })}</p>
                            </div>

                            <div>
                                <label className="text-sm ">Last Login</label>
                                <p className="font-medium">{merchant?.status !== 'ACTIVE' ? "PENDING TILL YET" : merchant.lastLogin}</p>
                            </div>
                            {/* Location Info */}
                            <div className="mt-4">
                                <label className="text-sm ">Address Information</label>
                                <div className="font-medium">
                                    <p><strong>Town:</strong> {merchant?.location.town}</p>
                                    <p><strong>Country:</strong> {merchant?.location.country}</p>
                                    <p><strong>Region:</strong> {merchant?.location.region}</p>
                                    <p><strong>Kebele:</strong> {merchant?.location.kebele}</p>
                                    <p><strong>Woreda:</strong> {merchant?.location.woreda}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Contact Information Card */}
                        <div className=" p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Edit className="w-5 h-5 " />
                                    <span className="font-medium">{merchant?.account?.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <PhoneMissed className="w-5 h-5 " />
                                    <span className="font-medium">{merchant?.businessPhone}</span>
                                </div>
                            </div>
                        </div>
                        {/* Display the identity card */}
                        <MerchantCard merchant={merchant} />
                    </div>
                </div>

                {/* Admin Actions Section */}
                <div className="mt-8  p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4"> Actions</h2>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <select
                            onChange={(e) => handleChange(e)}
                            value={currentStatus || 'select status'}
                            className="rounded-md border w-1/4 border-gray-400 focus:outline-none dark:bg-gray-800">
                            <option className="hover:bg-gray-400" value={'ACTIVE'}>ACTIVE</option>
                            <option className="hover:bg-gray-400" value={'SUSPENDED'}>SUSPENDED</option>
                            <option className="hover:bg-gray-400" value="PENDING">PENDING</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantDetailPage;