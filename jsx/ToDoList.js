/// <reference path="../scripts/react.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// https://www.youtube.com/watch?v=g48K9LEhHWs
// http://blog.wolksoftware.com/working-with-react-and-typescript
// https://mva.microsoft.com/en-US/training-courses/react-the-definitive-beginners-guide-16547?l=naHFTFzfC_9706218965
// https://egghead.io/courses/getting-started-with-redux
var ToDoStore = {
    EditedText: "",
    List: []
};
var ToDoRedux;
(function (ToDoRedux) {
    function ShowApp() {
        ReactDOM.render(React.createElement(ToDoAppCompo, __assign({}, ToDoStore)), document.getElementById("appcontainer"));
    }
    ToDoRedux.ShowApp = ShowApp;
    function Execute(cmd) {
        ToDoStore = cmd.Act(ToDoStore);
        ShowApp();
    }
    ToDoRedux.Execute = Execute;
    var AddCommand = /** @class */ (function () {
        function AddCommand(textToAdd) {
            this.CmdType = "Add";
            this.TextToAdd = textToAdd;
        }
        AddCommand.prototype.Act = function (s) {
            s.List.unshift({ ID: Date.now(), Text: ToDoStore.EditedText });
            s.EditedText = "";
            return s;
        };
        return AddCommand;
    }());
    ToDoRedux.AddCommand = AddCommand;
    var DeleteCommand = /** @class */ (function () {
        function DeleteCommand(id) {
            this.CmdType = "Delete";
            this.ID = id;
        }
        DeleteCommand.prototype.Act = function (s) {
            var _this = this;
            s.List = s.List.filter(function (x) { return x.ID !== _this.ID; });
            return s;
        };
        return DeleteCommand;
    }());
    ToDoRedux.DeleteCommand = DeleteCommand;
    var UpdateEditor = /** @class */ (function () {
        function UpdateEditor(text) {
            this.CmdType = "UpdateEditor";
            this.Text = text;
        }
        UpdateEditor.prototype.Act = function (s) {
            s.EditedText = this.Text;
            return s;
        };
        return UpdateEditor;
    }());
    ToDoRedux.UpdateEditor = UpdateEditor;
})(ToDoRedux || (ToDoRedux = {}));
var ToDoAppCompo = /** @class */ (function (_super) {
    __extends(ToDoAppCompo, _super);
    function ToDoAppCompo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDoAppCompo.prototype.handleChange = function (event) {
        ToDoRedux.Execute(new ToDoRedux.UpdateEditor(event.currentTarget.value));
    };
    ToDoAppCompo.prototype.addItem = function () {
        ToDoRedux.Execute(new ToDoRedux.AddCommand(this.props.EditedText));
    };
    ToDoAppCompo.prototype.render = function () {
        var items = this.props.List.map(function (item) {
            return React.createElement(ToDoItemCompo, __assign({}, item, { key: item.ID }));
        });
        return (React.createElement("div", { className: "panel panel-info" },
            React.createElement("div", { className: "panel-heading" }, "Seznam \u00FAkol\u016F"),
            React.createElement("div", { className: "panel-body" },
                React.createElement("form", { className: "form-group" },
                    React.createElement("input", { type: "text", className: "form-control", value: this.props.EditedText, onChange: this.handleChange.bind(this) }),
                    React.createElement("button", { type: "button", className: "btn btn-default btn-xs", onClick: this.addItem.bind(this) }, "P\u0159idat"))),
            React.createElement("div", { className: "panel-body" },
                React.createElement("ul", { className: "list-group" }, items))));
    };
    return ToDoAppCompo;
}(React.Component));
var ToDoItemCompo = /** @class */ (function (_super) {
    __extends(ToDoItemCompo, _super);
    function ToDoItemCompo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToDoItemCompo.prototype.deleteItem = function () {
        ToDoRedux.Execute(new ToDoRedux.DeleteCommand(this.props.ID));
    };
    ToDoItemCompo.prototype.render = function () {
        return (React.createElement("li", { className: "list-group-item" },
            this.props.Text,
            React.createElement("button", { type: "button", className: "btn btn-default btn-xs pull-right", onClick: this.deleteItem.bind(this) }, "Smazat")));
    };
    return ToDoItemCompo;
}(React.Component));
//# sourceMappingURL=ToDoList.js.map