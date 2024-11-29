import { Form } from "@/@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/@/components/ui/separator";

import ImageSection from "./ImageSection";
import LoadingButton from "@/@/components/LoadingButton";
import { Button } from "@/@/components/ui/button";
import { Industry } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    industryName: z.string({
      required_error: "Industry name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Must be a valid number",
    }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  }).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type IndustryFormData = z.infer<typeof formSchema>;

type Props = {
  industry?: Industry;
onSave: (industryFormData: FormData) => void;
isLoading: boolean;
};

const ManageIndustryForm = ({ onSave, isLoading , industry}: Props) => {
  const form = useForm<IndustryFormData>({
    resolver: zodResolver(formSchema),

  });

  useEffect(() => {
    if (!industry) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (industry.deliveryPrice / 100).toFixed(2)
    );
    const updatedIndustry = {
      ...industry,
      deliveryPrice: deliveryPriceFormatted,
     
    };
    form.reset(updatedIndustry);
  
 }, [form, industry]);



  const onSubmit = (formDataJson: IndustryFormData) => {
    const formData = new FormData();

    formData.append("industryName", formDataJson.industryName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );


    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }
    
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageIndustryForm;
