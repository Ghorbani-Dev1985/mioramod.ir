import { ReactNode } from "react";

export type ChartTheme = {
  light: string;
  dark: string;
};

export interface ChartSeriesConfig {
  label?: ReactNode;
  icon?: React.ComponentType;

  color?: string;

  theme?: ChartTheme;
}

export interface BaseChartProps<T = unknown> {
  data: T[];

  loading?: boolean;

  className?: string;

  emptyMessage?: string;
}

export interface ChartTooltipItem {
  name: string;

  value: string | number;

  color?: string;
}

export type ChartConfig = Record<
  string,
  {
    label?: string;

    color?: string;

    icon?: React.ComponentType;

    theme?: ChartTheme;
  }
>;

export interface ChartContextProps {
  config: ChartConfig;
}

interface LineChartData {
  name: string;

  value: number;
}

export interface Props {
  data: LineChartData[];
}

interface PieChartItem {
  name: string;
  value: number;
  color?: string;
   fill: string;
}

export interface DonutChartProps {
  data: PieChartItem[];
}