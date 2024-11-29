import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/@/components/card";
import { Industry } from "@/types";

type Props = {
    industry: Industry;
  };

  const IndustryInfo = ({ industry }: Props) => {
    return (
        <Card className="border-sla">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            {industry.industryName}
          </CardTitle>
          <CardDescription>
            {industry.city}, {industry.country}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex">
          
        </CardContent>
      </Card>
    )

  }
  export default IndustryInfo;
