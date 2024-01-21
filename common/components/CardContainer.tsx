import React from "react";
import PricingCard from "./PricingCard";
import tiers from "../data/tiers";

interface CardContainerProps {
  redirect: boolean;
}

function CardContainer({ redirect }: CardContainerProps) {
  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            id={tier.id}
            name={tier.name}
            priceMonthly={tier.priceMonthly}
            description={tier.description}
            features={tier.features}
            redirect={redirect}
          />
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
