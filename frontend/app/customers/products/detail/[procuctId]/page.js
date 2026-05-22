'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
  MessageSquare,
  Minus,
  Plus,
  RefreshCw,
  Shield,
  ShoppingCart,
  Truck,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Rating from "../../../components/Rating";
import { useGetProductsByIdQuery } from "@/lib/features/products/products";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import useCart from "@/hooks/use-cart";
import { formatCurrency } from "@/util/currency";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";

export default function ProductDetailPage() {
  const params = useParams();
  const { procuctId } = params
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError
  } = useGetProductsByIdQuery(procuctId);
  const product = productData?.product;
  const relatedProducts = []
  // const {
  //   data: relatedProducts = [],
  //   isLoading: isRelatedLoading,
  //   isError: isRelatedError
  // } = useGetRelatedProductsQuery(params.productId, {
  //   skip: !params.productId // Skip if no productId
  // });

  const {
    cart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    isLoading: isCartLoading
  } = useCart(); const { width } = useWindowSize();
  const isMobile = (width || 0) < 548;
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // Find if product is in cart and get quantity
  const cartItem = cart.find(item => item.productId === product?.id);
  const cartQuantity = cartItem?.quantity || 0;
  const isInCart = cartQuantity > 0;
  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index) => {
    api?.scrollTo(index);
  };

  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        productId: product.id,
        name: product.name,
        price: product.discountPrice > 0 ? product.price - (product.price * Math.round(product.discountPrice)) / 100 : product.price,
        quantity: 1,
        image: product.images?.[0],
        stock: product.quantity
      });
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await updateItemQuantity(cartItem?.id, cartQuantity + 1);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (cartQuantity <= 1) {
      try {
        await removeItemFromCart(cartItem?.id);
        toast.info(`${product.name} removed from cart`);
      } catch (error) {
        toast.error("Failed to remove item");
        console.error("Remove item error:", error);
      }
      return;
    }

    try {
      await updateItemQuantity(cartItem?.id, cartQuantity - 1);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  if (isProductError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Error Loading Product</h2>
        <p className="text-gray-600 mt-2">
          {productError?.message || "Failed to load product details"}
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (isProductLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Image Gallery Skeleton */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-2">
            <div className="flex md:flex-col gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square min-w-[80px] md:min-w-[100px]" />
              ))}
            </div>
            <Skeleton className="aspect-square w-full" />
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />

            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            </div>

            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Media Gallery Section */}
        <div className="relative">
          {/* Mobile Thumbnail Carousel */}
          <div className="lg:hidden mb-4 overflow-x-auto pb-2">
            <div className="flex gap-2 w-max">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${current === index ? 'border-primary ring-2 ring-primary/50' : 'border-transparent'}`}
                >
                  <Image
                    src={imageViewer(img) || '/placeholder-product.jpg'}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Carousel */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800">
            <Carousel
              className="w-full h-full"
              setApi={setApi}
              opts={{ startIndex: current }}
            >
              <CarouselContent>
                {product.images?.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-[400px] md:h-[500px] relative">
                      <GlassMagnifier
                        imageSrc={imageViewer(img) || '/placeholder-product.jpg'}
                        imageAlt={product.name}
                        zoomImageSrc={imageViewer(img) || '/placeholder-product.jpg'}
                        className="w-full h-full object-cover"
                        style={{
                          position: 'relative',
                          zIndex: 1000 // High z-index to ensure it's on top
                        }}
                        magnifierStyle={{
                          position: 'absolute',
                          zIndex: 1001, // Even higher for the magnifier glass itself
                          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                        }}
                        magnifierSize={isMobile ? 100 : 150}
                        magnifierBorderSize={isMobile ? 2 : 3}
                        magnifierBorderColor="rgba(255, 255, 255, 0.8)"
                        magnifierOverlayColor="rgba(0, 0, 0, 0.5)"
                        magnifierOverlayOpacity={0.5}
                        mouseActivation={MOUSE_ACTIVATION.CLICK}
                        touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP}
                        fillLightEnabled={true}
                        fillLightColor="rgba(255, 255, 255, 0.8)"
                        fillLightSize={isMobile ? 50 : 75}
                        fillLightOpacity={0.5}
                        square={true}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Desktop Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 hidden lg:flex justify-between">
                <CarouselPrevious className="h-10 w-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl" />
                <CarouselNext className="h-10 w-10 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl" />
              </div>
            </Carousel>

            {/* Mobile Controls */}
            <div className="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${current === index ? 'bg-primary w-4' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Thumbnail Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-3 mt-4">
            {product.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${current === index ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-gray-300'}`}
              >
                <Image
                  src={imageViewer(img) || '/placeholder-product.jpg'}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Rating rating={product.rating || 4.2} />
              <Link href="#reviews" className="text-sm text-gray-600">
                ({product.reviewCount || 0} reviews)
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xl md:text-2xl font-bold">
              {formatCurrency(
                Math.round(product.discountPrice) > 0
                  ? product.price - (product.price * Math.round(product.discountPrice)) / 100
                  : product.price
              )}
            </p>
            {product.discountPrice && (
              <>
                <s className="text-sm text-gray-500">{formatCurrency(product.price)}</s>
                <Badge className="bg-orange-600 text-white">
                  {Math.round(product.discountPrice)}% OFF
                </Badge>
              </>
            )}
          </div>

          <div className="space-y-4">
            {product.colors?.length > 0 && (
              <div>
                <p className="font-medium mb-2">Color</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className="h-10 w-10 md:h-12 md:w-12 rounded-full p-0"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div>
                <p className="font-medium mb-2">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="h-10 md:h-12 hover:bg-gray-100 text-sm md:text-base"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <Link href="#" className="text-sm text-gray-600 mt-1 inline-block underline">
                  Size Guide
                </Link>
              </div>
            )}

            <div className="space-y-2">
              {product.quantity <= 0 ? (
                <Button className="w-full py-4 md:py-6 text-md md:text-lg" variant="outline" disabled>
                  Sold Out
                </Button>
              ) : isInCart ? (
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1"
                    onClick={handleDecreaseQuantity}
                    disabled={isCartLoading}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center font-medium text-lg">{cartQuantity}</div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1"
                    onClick={handleIncreaseQuantity}
                    disabled={isCartLoading || cartQuantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-orange-900 py-4 md:py-6 text-md md:text-lg"
                  onClick={handleAddToCart}
                  disabled={isCartLoading}
                >
                  {isCartLoading ? 'Adding...' : 'Add to Cart'}
                </Button>
              )}
              {product.quantity <= 0 && (
                <p className="text-sm text-red-600 text-center">This product is currently out of stock</p>
              )}
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-700 text-xs md:text-sm">✓ 19 ETB for Shipping</Badge>
                <Badge className="bg-orange-700 text-xs md:text-sm">⏱️ Maximum 2-Day Delivery</Badge>
                {product.discountPrice && (
                  <Badge className="bg-orange-700 text-xs md:text-sm">
                    {Math.round(product.discountPrice)}% OFF
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              {product.description || 'No description available'}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features?.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <li>No features listed</li>
              )}
            </ul>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {product.reviews?.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <Rating rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                    </div>
                    <h3 className="font-medium mt-2">{review.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">- {review.userName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-500">No reviews yet</p>
                <Button variant="outline" className="mt-4">
                  Write a Review
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {
        relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )
      }
    </div >
  );
}