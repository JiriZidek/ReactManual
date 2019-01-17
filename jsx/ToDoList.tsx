/// <reference path="../scripts/react.d.ts" />

// https://www.youtube.com/watch?v=g48K9LEhHWs
// http://blog.wolksoftware.com/working-with-react-and-typescript
// https://mva.microsoft.com/en-US/training-courses/react-the-definitive-beginners-guide-16547?l=naHFTFzfC_9706218965
// https://egghead.io/courses/getting-started-with-redux



var ToDoStore: ToDoAppPoco = {
    EditedText: "",
    List: []
};


interface ToDoItemPoco {
    Text: string;
    ID: number;
}

interface ToDoAppPoco {
    EditedText: string;
    List: ToDoItemPoco[];
}

namespace ToDoRedux {

    export function ShowApp() {
        ReactDOM.render(
            <ToDoAppCompo {...ToDoStore} />,
            document.getElementById("appcontainer")
        );
    }

    export function Execute(cmd: Command) {
        ToDoStore = cmd.Act(ToDoStore);
        ShowApp();
    }

    type TCmdType = "Add" | "Delete" | "UpdateEditor";

    interface Command {
        CmdType: TCmdType;
        Act(s: ToDoAppPoco): ToDoAppPoco;
    }

    export class AddCommand implements Command {
        constructor(textToAdd: string) { this.TextToAdd = textToAdd; }
        readonly CmdType: TCmdType = "Add";
        readonly TextToAdd: string;
        Act(s: ToDoAppPoco): ToDoAppPoco {
            s.List.unshift({ ID: Date.now(), Text: ToDoStore.EditedText });
            s.EditedText = "";
            return s;
        }
    }

    export class DeleteCommand implements Command {
        constructor(id: number) { this.ID = id; }
        readonly CmdType: TCmdType = "Delete";
        readonly ID: number;
        Act(s: ToDoAppPoco): ToDoAppPoco {
            s.List = s.List.filter(x => x.ID !== this.ID);
            return s;
        }
    }

    export class UpdateEditor implements Command {
        constructor(text: string) { this.Text = text; }
        readonly CmdType: TCmdType = "UpdateEditor";
        readonly Text: string;
        Act(s: ToDoAppPoco): ToDoAppPoco {
            s.EditedText = this.Text;
            return s;
        }
    }

}


class ToDoAppCompo extends React.Component<ToDoAppPoco, {}> {

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        ToDoRedux.Execute(new ToDoRedux.UpdateEditor(event.currentTarget.value));
    }

    addItem() {
        ToDoRedux.Execute(new ToDoRedux.AddCommand(this.props.EditedText));
    }

    render() {
        let items = this.props.List.map((item) => {
            return <ToDoItemCompo {...item} key={item.ID} />;
        });
        return (
            <div className="panel panel-info">
                <div className="panel-heading">Seznam úkolů</div>
                <div className="panel-body">
                    <form className="form-group">
                        <input type="text" className="form-control" value={this.props.EditedText} onChange={this.handleChange.bind(this)} />
                        <button type="button" className="btn btn-default btn-xs" onClick={this.addItem.bind(this)}>Přidat</button>
                    </form>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}


class ToDoItemCompo extends React.Component<ToDoItemPoco, {}> {

    deleteItem() {
        ToDoRedux.Execute(new ToDoRedux.DeleteCommand(this.props.ID));
    }


    render() {
        return (
            <li className="list-group-item">
                {this.props.Text}
                <button type="button" className="btn btn-default btn-xs pull-right" onClick={this.deleteItem.bind(this)}>Smazat</button>
            </li>
        );
    }
}



