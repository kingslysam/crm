"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DatePickerWithRangeProps {
  className?: string;
  selected: DateRange;
  onSelect: (range: DateRange) => void;
}

export default function DatePickerWithRange({ className, selected, onSelect }: DatePickerWithRangeProps) {
  const { theme: mode } = useTheme();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            color={mode === "dark" ? "secondary" : "default"}
            className={cn(" font-normal", {
              " bg-white text-default-600": mode !== "dark",
            })}
          >
            <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            {selected.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "LLL dd, y")} - {format(selected.to, "LLL dd, y")}
                </>
              ) : (
                format(selected.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected.from || undefined}
            selected={selected}
            onSelect={(range) => onSelect(range as DateRange)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
