import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component({
  financialData,
}: {
  financialData: Record<string, any>;
}) {
  console.log(financialData);

  // Function to format key names
  const formatKeyName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/([0-9]+)/g, " $1 ")
      .replace(/  +/g, " ") // Replace multiple spaces with a single space
      .trim() //
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  return (
    <Card className="w-full h-full bg-neutral-900 shadow-black">
      <CardHeader>
        <CardTitle className="text-center text-xl text-zinc-400">
          Financial Data for{" "}
          <span className="text-blue-500">
            {typeof financialData["symbol"] === "string"
              ? financialData["symbol"]
              : ""}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md p-4">
          <ul className="space-y-2">
            {Object.entries(financialData)
              .filter(([key]) => key !== "companyOfficers")
              .map(([key, value], index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-medium">{formatKeyName(key)}</span>
                  <span className="text-gray-600">
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value, null, 2)
                      : value}
                  </span>
                </li>
              ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
