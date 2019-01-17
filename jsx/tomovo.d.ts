/// <reference path="../scripts/react-global.d.ts" />
declare class Graf extends React.Component<{}, {}> {
    getData(): {
        "name": string;
        "BMI": number;
        "age": number;
        "birthday": string;
        "city": string;
        "married": boolean;
        "index": number;
    }[];
    render(): JSX.Element;
}
