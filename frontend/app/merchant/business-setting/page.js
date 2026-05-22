"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MerchantFullRegistration from "@/app/customers/components/prompts/prompt1";
import { useGetMerchantByAccountQuery } from "@/lib/features/merchant/registrationApi";
const MerchantRegistration = () => {
    const accountId = useSelector((state) => state.account.id);
    const [merchantStatus, setMerchantStatus] = useState("unRegister");
    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useGetMerchantByAccountQuery(accountId);
    // Decide merchant registration status 
    useEffect(() => {
        if (data?.merchant) {
            setMerchantStatus(data.merchant.status);
        }
        //  else {
            //     setMerchantStatus("");
            // }
        }, [data]);
        console.log(data, 'merchant data now added ,', merchantStatus, isError, accountId)
    const memoizedMerchantData = useMemo(() => {
        if (data) {
            return {
                ...data.merchant,
                status: merchantStatus,
            };
        }
    }, [data, merchantStatus]);

    // if (isLoading || !accountId) return <Loader />;

    if (isError) {
        return (
            <div className="text-red-500 p-4">
                🚨 Error loading merchant information. Please try again later.
            </div>
        );
    }

    return (
        <main className="container mx-auto p-4">
            {merchantStatus === "unRegister" ? (
                //  First-time registration
                <MerchantFullRegistration onSuccess={refetch} />
            ) : (
                // Already registered merchant — show update/after-registration screen
                <MerchantFullRegistration
                    existingData={memoizedMerchantData}
                    onSuccess={refetch}
                    mStatus={merchantStatus}
                />
            )}
        </main>
    );
};

export default MerchantRegistration;
