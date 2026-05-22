<div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
  <div className={`grid gap-6 md:gap-8 ${isMobile ? "max-w-[70%]" : "w-full"} grid-cols-1 lg:grid-cols-2`}>
    {/* Product Images */}
    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2">
        {product.images?.map((img, index) => (
          <div
            key={index}
            className={`relative aspect-square min-w-[80px] md:min-w-[100px] cursor-pointer border-2 rounded-md ${current === index ? 'border-primary' : 'border-transparent'}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={imageViewer(img) || '/placeholder-product.jpg'}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 20vw, 10vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Main Carousel */}
      <Carousel className="w-full h-full relative group">
        <CarouselContent>
          {product.images?.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square">
                <Image
                  src={imageViewer(img) || '/placeholder-product.jpg'}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-y-1/2 -translate-y-1/2 w-full flex justify-between px-2 md:px-4">
          <CarouselPrevious
            onClick={() => api?.scrollPrev()}
            className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl h-8 w-8 md:h-10 md:w-10"
          />
          <CarouselNext
            onClick={() => api?.scrollNext()}
            className="bg-white/80 hover:bg-white shadow-lg hover:shadow-xl h-8 w-8 md:h-10 md:w-10"
          />
        </div>
      </Carousel>
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
        <p className="text-xl md:text-2xl font-bold">{formatCurrency(product.discountPrice || product.price)}</p>
        {product.discountPrice && (
          <>
            <s className="text-sm text-gray-500">{formatCurrency(product.price)}</s>
            <Badge className="bg-orange-600 text-white">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
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
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">Free returns and 100-day return policy</p>
        </div>
      </div>
    </div>
  </div>

  {/* Tabs Section */}
  <Tabs defaultValue="description" className="mt-12">
    <TabsList className="flex overflow-x-auto gap-1">
      <TabsTrigger value="description" className="text-sm md:text-base px-4">Description</TabsTrigger>
      <TabsTrigger value="features" className="text-sm md:text-base px-4">Features</TabsTrigger>
      <TabsTrigger value="reviews" className="text-sm md:text-base px-4">
        Reviews ({product.reviewCount || 0})
      </TabsTrigger>
    </TabsList>

    <TabsContent value="description" className="mt-4">
      <p>{product.description || 'No description available'}</p>
    </TabsContent>

    <TabsContent value="features" className="mt-4">
      <ul className="list-disc pl-5 space-y-2">
        {product.features?.length > 0 ? (
          product.features.map((feature, index) => <li key={index}>{feature}</li>)
        ) : (
          <li>No features listed</li>
        )}
      </ul>
    </TabsContent>

    <TabsContent value="reviews" className="mt-4">
      {product.reviews?.length > 0 ? (
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <Rating rating={review.rating} />
              <p className="font-medium mt-1">{review.title}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-1">- {review.userName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet</p>
      )}
    </TabsContent>
  </Tabs>

  {/* Related Products */}
  {relatedProducts.length > 0 && (
    <section className="mt-16">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Related Products</h2>
      {isRelatedLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="aspect-square w-full mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isRelatedError ? (
        <p className="text-gray-600">Failed to load related products</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={imageViewer(product.images?.[0]) || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-base md:text-lg font-bold">{formatCurrency(product.discountPrice || product.price)}</p>
                    {product.discountPrice && (
                      <s className="text-sm text-gray-500">{formatCurrency(product.price)}</s>
                    )}
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full text-sm md:text-base" variant="outline">Quick Add</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )}
</div>
