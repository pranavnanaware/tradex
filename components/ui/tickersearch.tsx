"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface Ticker {
  symbol: string;
  // Add other properties if needed
}

async function getTickers(query: string) {
  const response = await fetch(
    `http://127.0.0.1:5000/api/search?query=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export function TickerSearch({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [tickers, setTickers] = React.useState<Ticker[]>([]);
  const router = useRouter();

  const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (inputValue.trim() !== "") {
        getTickers(inputValue).then((data) => setTickers(data));
      } else {
        setTickers([]);
      }
    }, 300);
  }, [inputValue]);

  // Update inputValue when value prop changes
  useEffect(() => {
    setInputValue(value);
    queryClient.invalidateQueries({ queryKey: [""] });
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && tickers.length > 0) {
      onSelect(tickers[0].symbol);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[60%] h-12 bg-transparent justify-between rounded-lg font-semibold text-base"
        >
          {inputValue ? inputValue.toUpperCase() : "Select Ticker"}
          <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <div className="mx-2"></div>
      <Button
        className="h-12 font-semibold text-sm"
        onClick={() => router.push(`/${inputValue}`)}
        disabled={!inputValue}
      >
        BUY / SELL
      </Button>
      <PopoverContent className="w-[800px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Ticker"
            value={inputValue}
            onValueChange={(value) => setInputValue(value)}
            onKeyDown={handleKeyDown}
          />
          <CommandList>
            <CommandEmpty>No ticker found.</CommandEmpty>

            <CommandGroup>
              {tickers.map((ticker) => (
                <CommandItem
                  key={ticker.symbol}
                  value={ticker.symbol}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ticker.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ticker.symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
