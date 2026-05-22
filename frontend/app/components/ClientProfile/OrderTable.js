import React from "react";
import CardTable from "../Cards/CardTable";

const OrderTable = () => {
  return (
    <>
      <div>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap w-full  lg:w-[70%] mb-12 px-4">
            <CardTable color="dark" />
          </div>
          <div className="flex flex-wrap">
            <div className="mx-3">Order Verification key</div>
          </div>
          <div>date</div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
