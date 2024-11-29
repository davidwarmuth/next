"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ReactNode } from "react";
import clsx from "clsx";

export type RadialChartType = {
  title?: string;
  description?: string;
  footer?: ReactNode;
  valueLabel?: string;
  value: number;
  referenceLabel?: string;
  reference: number;
  asCard?: boolean;
  variant?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
};

export function RadialChart({
  title,
  description,
  footer,
  valueLabel,
  value,
  referenceLabel,
  reference,
  asCard = false,
  variant,
}: RadialChartType) {
  const chartData = [
    {
      reference: reference,
      value: value,
      fill: "var(--color-value)",
    },
  ];

  const chartConfig = {
    reference: {
      label: referenceLabel,
    },
    value: {
      label: valueLabel,
      color: "hsl(var(--" + variant + "))",
    },
  } satisfies ChartConfig;

  const startAngle = -180;
  const endAngle =
    startAngle - (chartData[0].value / chartData[0].reference) * 360 || -180;

  return (
    <Card
      className={clsx("flex flex-col", !asCard && "border-none shadow-none")}
    >
      {(title || description) && (
        <CardHeader className="items-center pb-0">
          {title && <CardTitle className="text-xl">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="flex-1 pt-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[175px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan className="fill-muted-foreground text-lg">
                          {" / " + chartData[0].reference.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {valueLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
      )}
    </Card>
  );
}
