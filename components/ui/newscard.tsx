import { CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface NewsCard {
  imageUrl: string;
  title: string;
  description: string;
  date: string;
}

export default function NewsCard(
  { imageUrl, title, description, date }: NewsCard = {
    imageUrl: "/placeholder.svg?height=100&width=100",
    title: "Breaking News: Amazing Discovery",
    description:
      "Scientists have made an incredible breakthrough that could change the world as we know it.",
    date: "2023-10-15",
  }
) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5">
            <img
              src={imageUrl}
              alt=""
              className="h-48 w-full object-cover sm:h-full"
            />
          </div>
          <div className="flex flex-col justify-between p-4 sm:w-2/3 md:w-3/4 lg:w-4/5">
            <div>
              <h2 className="mb-2 text-lg font-bold line-clamp-2">{title}</h2>
              <p className="mb-2 text-sm text-gray-600 line-clamp-2">
                {description}
              </p>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="mr-1 h-3 w-3" />
              <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
