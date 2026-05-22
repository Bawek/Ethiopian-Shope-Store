'use client'
import { useGetProductsByShopIdQuery } from '@/lib/features/products/products';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useShopProducts = () => {
    const searchParams = useSearchParams();

    // Memoize the shopId to avoid unnecessary re-renders
    const shopId = useMemo(() => searchParams.get('id'), [searchParams]);

    // Only call query if shopId exists
    const {
        data: productsData = [],
        isLoading,
        isError,
        error,
    } = useGetProductsByShopIdQuery(shopId, {
        skip: !shopId, // Avoid calling API if shopId is not available
        refetchOnMountOrArgChange: true,
    });
    return {
        shopId,
        productsData,
        isLoading,
        isError,
        error,
        totalProducts: productsData?.count
    };
};

export default useShopProducts;
