
interface ChartProps {
    title: any;
    width: any;
    height: any;
    margins: any;
}

declare class Chart extends React.Component<ChartProps, {}> {

}

interface LineChartProps {
    margins: any;
    title: string;
    data: any[];
    width: number;
    height: number;
    chartSeries: any;
    x(any): void;
}

declare class LineChart extends React.Component<LineChartProps, {}> {

}