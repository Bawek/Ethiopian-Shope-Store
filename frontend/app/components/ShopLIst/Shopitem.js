"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  MapPin,
  Box,
  Clock,
  Globe,
  Phone,
  ShoppingBag,
  Heart,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import Link from "next/link";

const ShopItem = ({ shop, fullWidth }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative group rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl dark:hover:shadow-gray-800/70 transition-all duration-500 ${fullWidth ? "w-full" : "w-full sm:w-[48%] lg:w-[31%]"} m-2`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Image Container with Floating Badges */}
      <div className="relative h-80 w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover"
          src={imageViewer(shop?.bannerImageUrl || shop?.logoImageUrl)}
          alt={shop?.name || "Shop image"}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Status Badge */}
        {shop?.status && (
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${shop.status === 'ACTIVE' ? 'bg-green-500/90 text-white' :
            shop.status === 'UNDER_REVIEW' ? 'bg-yellow-500/90 text-black' :
              'bg-red-500/90 text-white'
            }`}>
            {shop.status.replace('_', ' ')}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm transition-all duration-500">
        {/* Shop Title and Basic Info */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-start justify-between">
            <motion.h3
              whileHover={{ x: 3 }}
              className="text-2xl font-extrabold text-gray-900 dark:text-white line-clamp-1"
            >
              {shop?.name || "Shop Name"}
            </motion.h3>

            {/* Rating */}
            {/* <div className="flex items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-bold text-gray-900 dark:text-white">
                {shop?.rating?.toFixed(1) || '4.8'}
              </span>
            </div> */}
          </div>

          {/* Category and Location */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
              {shop?.category || 'General Store'}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {shop?.location?.town || 'Unknown Location'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-5 line-clamp-2 leading-relaxed">
          {shop?.description || "This shop offers amazing products with great quality and service."}
        </p>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {shop?.productCount || 0} products
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {shop?.openingHours || '9AM - 6PM'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <Link
              href={`/${shop?.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Visit Our Website
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <a
              href={`tel:${shop?.contactNumber}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              onClick={e => e.stopPropagation()}
            >
              {shop?.contactNumber || 'Not provided'}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/customers/products?id=${shop?.id}`);
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Products
          </motion.button>

        </div>
      </div>

      {/* Floating Social Links */}
      {shop?.socialMedia && (
        <div className="absolute bottom-24 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {shop.socialMedia.facebook && (
            <motion.a
              whileHover={{ y: -3 }}
              href={shop.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Facebook className="w-4 h-4" />
            </motion.a>
          )}
          {shop.socialMedia.instagram && (
            <motion.a
              whileHover={{ y: -3 }}
              href={shop.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
          )}
          {shop.socialMedia.twitter && (
            <motion.a
              whileHover={{ y: -3 }}
              href={shop.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-400 text-white rounded-full shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Twitter className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ShopItem;