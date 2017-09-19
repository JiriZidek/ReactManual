/// <reference path="../../../Pokusy/rmReactD3/scripts/react-d3.d.ts" />
declare class Graf extends React.Component<{}, {}> {
    render(): JSX.Element;
}
declare function RenderGraph(): void;
declare function getData(): {
    "name": string;
    "BMI": number;
    "age": number;
    "birthday": string;
    "city": string;
    "married": boolean;
    "index": number;
}[];
