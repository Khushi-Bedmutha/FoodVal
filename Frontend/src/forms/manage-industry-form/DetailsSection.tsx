import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/@/components/ui/form";
import { Input } from "@/@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { control } = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription>
                    Enter the details about your Industry.
                </FormDescription>
            </div>

            {/* Industry Name */}
            <FormField
                control={control}
                name="industryName"
                defaultValue="" 
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Industry Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex gap-4">
                {/* City */}
                <FormField
                    control={control}
                    name="city"
                    defaultValue="" 
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"  />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Country */}
                <FormField
                    control={control}
                    name="country"
                    defaultValue="" 
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Delivery Price */}
            <FormField
                control={control}
                name="deliveryPrice"
                defaultValue="" 
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Delivery price (Rs)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="1.50" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Estimated Delivery Time */}
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                defaultValue="" 
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder="30" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default DetailsSection;
