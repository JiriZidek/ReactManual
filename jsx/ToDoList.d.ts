/// <reference path="../scripts/react.d.ts" />
declare var ToDoStore: ToDoAppPoco;
interface ToDoItemPoco {
    Text: string;
    ID: number;
}
interface ToDoAppPoco {
    EditedText: string;
    List: ToDoItemPoco[];
}
declare namespace ToDoRedux {
    function ShowApp(): void;
    function Execute(cmd: Command): void;
    type TCmdType = "Add" | "Delete" | "UpdateEditor";
    interface Command {
        CmdType: TCmdType;
        Act(s: ToDoAppPoco): ToDoAppPoco;
    }
    class AddCommand implements Command {
        constructor(textToAdd: string);
        readonly CmdType: TCmdType;
        readonly TextToAdd: string;
        Act(s: ToDoAppPoco): ToDoAppPoco;
    }
    class DeleteCommand implements Command {
        constructor(id: number);
        readonly CmdType: TCmdType;
        readonly ID: number;
        Act(s: ToDoAppPoco): ToDoAppPoco;
    }
    class UpdateEditor implements Command {
        constructor(text: string);
        readonly CmdType: TCmdType;
        readonly Text: string;
        Act(s: ToDoAppPoco): ToDoAppPoco;
    }
}
declare class ToDoAppCompo extends React.Component<ToDoAppPoco, {}> {
    handleChange(event: React.FormEvent<HTMLInputElement>): void;
    addItem(): void;
    render(): JSX.Element;
}
declare class ToDoItemCompo extends React.Component<ToDoItemPoco, {}> {
    deleteItem(): void;
    render(): JSX.Element;
}
