import { useGetIndustry } from "@/api/IndustryApi"; // Updated API hook to fetch industry data
import IndustryInfo from "@/components/IndustryInfo"; // Component to display industry info
import OrderSummary from "@/components/OrderSummary"; // Order summary component
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { useParams } from "react-router-dom";

import CheckoutButton from "@/components/CheckoutButton"; // Checkout button component
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"; // User form data type
import { useCreateCheckoutSession } from "@/api/OrderApi"; // API to create checkout session
import { Card, CardFooter } from "@/@/components/card";

const DetailPage = () => {
  const { industryId } = useParams(); // Get industry ID from URL params
  const { industry, isLoading } = useGetIndustry(industryId); // Fetch industry data
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession(); // Create checkout session hook

  // Checkout function
  const onCheckout = async (userFormData: UserFormData) => {
    if (!industry) {
      return;
    }

    // Prepare data for checkout
    const checkoutData = {
      industryId: industry._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    // Call the checkout API
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url; // Redirect to the checkout page
  };

  if (isLoading || !industry) {
    return "Loading..."; // Loading state
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={industry.imageUrl} // Display industry image
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <IndustryInfo industry={industry} /> {/* Show industry info */}
          <span className="text-2xl font-bold tracking-tight">Industry Details</span>
          <div className="text-1xl font-light tracking-tight" > Amount of waste: 15Kg </div>
          <div className="text-1xl font-light tracking-tight" > Contact Details: 8578365735 </div>

        </div>

        <div>
          <Card>
            <OrderSummary industry={industry} /> {/* Summary of industry details */}
            <CardFooter>
              <CheckoutButton
                disabled={false} // Always enabled in this case
                onCheckout={onCheckout} // Handle checkout on button click
                isLoading={isCheckoutLoading} // Manage loading state
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
