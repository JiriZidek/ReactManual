/// <reference path="react-global.d.ts" />

declare namespace ReactD3 {

    interface ChartProps {
        title: any;
        width: any;
        height: any;
        margins: any;
    }

    class Chart extends React.Component<ChartProps, {}> {

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

    class LineChart extends React.Component<LineChartProps, {}> {

    }

}