'use client'
import React, { useState, useEffect, useMemo } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Logs } from 'lucide-react'
import { useParams } from 'next/navigation'
import Loader from '@/app/components/Prompt/Loader'
import { toast } from 'react-toastify'
import useShopProducts from '@/hooks/use-shop-products'

const ShopLayout = ({ children }) => {
    const { shopId, productsData, isLoading, isError, error } = useShopProducts();
    const params = useParams()
    const categoryParam = params?.category || ''

    // State management
    const [selectedBrand, setSelectedBrand] = useState('')
    const [sortOption, setSortOption] = useState('popularity')
    const [filters, setFilters] = useState({
        categories: categoryParam ? [categoryParam] : [],
        colors: [],
        sizes: [],
        priceRange: [0, 1000]
    })

    // Handle errors with useEffect
    useEffect(() => {
        if (isError) {
            console.error('Product download error:', error)
            toast.error(error?.message || 'Sorry, we cannot load the products. Please refresh the page')
        }
    }, [isError, error])

    // Derived state
    const products = productsData?.products || []
    const [minPrice, maxPrice] = useMemo(() => {
        if (products.length === 0) return [0, 1000]
        const prices = products.map(p => p.price)
        return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]
    }, [products])

    // Filter options
    const { categories, colors, sizes } = useMemo(() => {
        const initial = { categories: {}, colors: {}, sizes: {} }

        return products.reduce((acc, product) => {
            // Categories
            if (product.category) {
                acc.categories[product.category] = (acc.categories[product.category] || 0) + 1
            }

            // Colors
            if (product.color) {
                acc.colors[product.color] = (acc.colors[product.color] || 0) + 1
            }

            // Sizes
            if (product.size) {
                acc.sizes[product.size] = (acc.sizes[product.size] || 0) + 1
            }

            return acc
        }, initial)
    }, [products])

    // Format filter options for display
    const formattedCategories = useMemo(() => (
        Object.entries(categories).map(([value, count]) => ({
            label: value,
            value,
            count
        }))
    ), [categories])

    const formattedColors = useMemo(() => (
        Object.entries(colors).map(([value, count]) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
            count
        }))
    ), [colors])

    const formattedSizes = useMemo(() => (
        Object.entries(sizes).map(([value, count]) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
            count
        }))
    ), [sizes])

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Brand filter
            if (selectedBrand && product.brand !== selectedBrand) return false

            // Category filter
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false

            // Color filter
            if (filters.colors.length > 0 && (!product.color || !filters.colors.includes(product.color))) return false

            // Size filter
            if (filters.sizes.length > 0 && (!product.size || !filters.sizes.includes(product.size))) return false

            // Price filter
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false

            return true
        })
    }, [products, selectedBrand, filters])

    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            if (sortOption === 'price_asc') return a.price - b.price
            if (sortOption === 'price_desc') return b.price - a.price
            return (b.popularity || 0) - (a.popularity || 0) // Default sorting by popularity
        })
    }, [filteredProducts, sortOption])

    // Reset price range when products change
    useEffect(() => {
        if (products.length > 0) {
            setFilters(prev => ({
                ...prev,
                priceRange: [minPrice, maxPrice]
            }))
        }
    }, [minPrice, maxPrice, products])

    // Handle category param changes
    useEffect(() => {
        if (categoryParam) {
            setFilters(prev => ({
                ...prev,
                categories: [categoryParam]
            }))
        }
    }, [categoryParam])

    if (isLoading) {
        return <Loader />
    }

    return (
        <main className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="hidden md:block md:w-52 space-y-8 h-full">
                    <h2 className="text-xl font-bold">Filters</h2>

                    {/* Brand Filter */}
                    <div className="space-y-2">
                        <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Filter by Brand
                        </label>
                        <select
                            id="brand-filter"
                            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 text-sm transition-colors"
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            value={selectedBrand}
                        >
                            <option value="">All Brands</option>
                            {[...new Set(products
                                .map(p => p.brand)
                                .filter(brand => brand && brand.trim() !== '')
                            )].map(brand => (
                                <option key={brand} value={brand} className="capitalize">
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Categories Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Categories</h3>
                        <div className="space-y-2">
                            {formattedCategories.map((category) => (
                                <div key={category.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${category.value}`}
                                        checked={filters.categories.includes(category.value)}
                                        onCheckedChange={(checked) => {
                                            setFilters(prev => ({
                                                ...prev,
                                                categories: checked
                                                    ? [...prev.categories, category.value]
                                                    : prev.categories.filter(v => v !== category.value)
                                            }))
                                        }}
                                    />
                                    <Label htmlFor={`cat-${category.value}`} className="text-sm">
                                        {category.label} ({category.count})
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Filter */}
                    {formattedColors.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold">Colors</h3>
                            <div className="space-y-2">
                                {formattedColors.map((color) => (
                                    <div key={color.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`color-${color.value}`}
                                            checked={filters.colors.includes(color.value)}
                                            onCheckedChange={(checked) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    colors: checked
                                                        ? [...prev.colors, color.value]
                                                        : prev.colors.filter(v => v !== color.value)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`color-${color.value}`} className="text-sm">
                                            {color.label} ({color.count})
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size Filter */}
                    {formattedSizes.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold">Sizes</h3>
                            <div className="space-y-2">
                                {formattedSizes.map((size) => (
                                    <div key={size.value} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`size-${size.value}`}
                                            checked={filters.sizes.includes(size.value)}
                                            onCheckedChange={(checked) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    sizes: checked
                                                        ? [...prev.sizes, size.value]
                                                        : prev.sizes.filter(v => v !== size.value)
                                                }))
                                            }}
                                        />
                                        <Label htmlFor={`size-${size.value}`} className="text-sm">
                                            {size.label} ({size.count})
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Price Range</h3>
                        <div className="space-y-4 px-2">
                            <Slider
                                value={filters.priceRange}
                                onValueChange={(value) => setFilters(prev => ({
                                    ...prev,
                                    priceRange: value
                                }))}
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>ETB{filters.priceRange[0]}</span>
                                <span>ETB{filters.priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Logs className='pl-1' />
                            <p className="text-gray-400 text-sm">
                                Showing {sortedProducts.length} results
                            </p>
                        </div>
                        <select
                            className="flex h-10 w-[180px] items-center justify-between border-none rounded-md bg-background px-3 py-2 text-sm"
                            onChange={(e) => setSortOption(e.target.value)}
                            value={sortOption}
                        >
                            <option value="popularity">Sort by popularity</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    <section>
                        {React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    products: sortedProducts
                                })
                            }
                            return child
                        })}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default ShopLayout