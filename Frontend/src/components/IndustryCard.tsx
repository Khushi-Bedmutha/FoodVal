// src/components/IndustryCard.tsx

import React from "react";
import { Industry } from "@/types";

interface IndustryCardProps {
  industry: Industry;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={industry.imageUrl} alt={industry.industryName} className="w-full h-48 object-cover rounded-t-lg" />
      <h3 className="text-lg font-bold">{industry.industryName}</h3>
      <p>{industry.city}, {industry.country}</p>
      <p>Delivery Price: ${industry.deliveryPrice}</p>
      <p>Estimated Delivery Time: {industry.estimatedDeliveryTime} mins</p>
      <p>Last Updated: {industry.lastUpdated}</p>
    </div>
  );
};

export default IndustryCard;
