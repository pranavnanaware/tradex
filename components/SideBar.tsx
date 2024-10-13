import React from "react";
import NewsCard from "./ui/newscard";
import Link from "next/link";
import { Card } from "./ui/card";

interface SideBarProps {
  symbol: string;
  data: any;
  isLoading: boolean;
  isError: boolean;
}

const SideBar: React.FC<SideBarProps> = ({
  symbol,
  data,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4">Error fetching data</div>;
  }

  console.log(data.stories[0]);

  return (
    <main className="flex flex-col items-start p-4 my-2 overflow-y-auto max-h-screen">
      <h2 className="text-lg font-bold mb-4">
        {" "}
        Recent News for <span className="text-blue-400">{symbol}</span>
      </h2>
      {data && data.stories.length > 0 ? (
        data.stories.map((item: any, index: number) => (
          <Card className="bg-transparent shadow-2xl">
            <Link href={item.url} target="_blank">
              <div className="shadow-lg border-b-2 p-3">
                <h1 className="flex font-xs text-start font-semibold shadow-md">
                  {item.title}
                </h1>
              </div>
            </Link>
          </Card>
        ))
      ) : (
        <div>No news available for this ticker.</div>
      )}
    </main>
  );
};

export default SideBar;
