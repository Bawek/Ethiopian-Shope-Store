'use client'
import React, { useState, useEffect } from "react";
// components

import CardStats from "@/app/[locale]/components/Cards/CardStats.js";
import { useGetProductsQuery } from "@/lib/features/products/products";
export default function HeaderStats({
  subtitle1,
  subtitle2,
  subtitle3,
  subtitle4,
}) {
  const merchant_id = localStorage.getItem("unique_id");
  const { data, isLoading, isError } = useGetProductsQuery(merchant_id);
  const [outOfStocks, setOutOfStock] = useState([]);
  const [notification, setNotification] = useState([]);
  const [store, setStore] = useState([]);
  const [catagories, setCatagories] = useState([]);

  const [sseConnection, setSseConnection] = useState(null);
  const storedmerchantId = localStorage.getItem("unique_id");

  function showOrderNotification() {
    toast.success("Out of Stock", {
      description: "product is out of Stock.",
      duration: 5000, // Duration of the notification in ms
    });
  }

  // Fetch initial data
  // useEffect(() => {
  //   fetch(`http://localhost:8000/store/product/stock/${storedmerchantId}/`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Initial stock:", data); // Debugging
  //       setOutOfStock(data);
  //     })
  //     .catch((error) => console.error("Error fetching initial orders:", error));
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:8000/store/product/${storedmerchantId}/total-categories/`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Initial stock:", data); // Debugging
  //       setCatagories(data.total_categories);
  //     })
  //     .catch((error) => console.error("Error fetching initial orders:", error));
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     `http://localhost:8000/store/product/${storedmerchantId}/total-stock/`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Initial store:", data); // Debugging
  //       setStore(data.total_stock);
  //     })
  //     .catch((error) => console.error("Error fetching initial store:", error));
  // }, []);

  // // Establish SSE connection
  // useEffect(() => {
  //   console.log("New merchant Id:", storedmerchantId); // Debugging

  //   const url = `http://localhost:8000/store/product/stock/stream/${storedmerchantId}/`;
  //   const eventSource = new EventSource(url);
  //   setSseConnection(eventSource);

  //   eventSource.onmessage = (event) => {
  //     const newData = JSON.parse(event.data);
  //     console.log("New data:", newData); // Debugging
  //     //     // Determine if the data is new or an update

  //     if (newData) {
  //       const existing = outOfStocks?.findIndex(
  //         (outOfStock) => outOfStock.id === newData[0].id
  //       );
  //       console.log("existingIndex:", existing); // Debugging

  //       if (existing !== -1) {
  //         setNotification((prev) => [
  //           ...prev,
  //           { type: "Update", ...newData[0] },
  //         ]);
  //       } else {
  //         setNotification((prev) => [...prev, { type: "New", ...newData[0] }]);
  //       }
  //     }

  //     console.log("New Notification:", notification); // Debugging
  //     // showOrderNotification();

  //     setOutOfStock((prevOutStocks) => {
  //       // Check if the order exists in the current state
  //       const existingIndex = prevOutStocks.findIndex(
  //         (OutStock) => OutStock?.id === newData[0]?.id
  //       );
  //       if (existingIndex !== -1) {
  //         console.log("New data:", newData[0]); // Debugging
  //         // Update the existing order
  //         console.log("existingIndex:", existingIndex); // Debugging

  //         const updatedOrders = [...prevOutStocks];
  //         updatedOrders[existingIndex] = { ...newData[0] };
  //         return updatedOrders;
  //       } else {
  //         // Add the new order
  //         return [...prevOutStocks, { ...newData[0] }];
  //       }
  //     });
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("EventSource failed:", error);
  //     eventSource.close();
  //     // Attempt to reconnect or notify the user here
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log("New Notification:", notification); // Debugging
  // }, [notification]);
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={subtitle1 ? subtitle1 : "Total Products"}
                  statTitle={`${data?.all_products?.length}` || "30"}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={subtitle2 ? subtitle2 : "NEW USERS"}
                  statTitle={store?.toString() || "0"}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={subtitle3 ? subtitle3 : "SALES"}
                  statTitle={
                    `${outOfStocks?.out_of_stock_products?.length}` || "0"
                  }
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={subtitle4 ? subtitle4 : "PERFORMANCE"}
                  statTitle={catagories?.toString() || "0"}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
