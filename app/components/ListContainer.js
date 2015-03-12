var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var todoStore = require('../stores/todoStore');
var todoActions = require('../actions/todoActions');

function getInitialState(){
  return {
    list: todoStore.getList()
  }
}

function componentDidMount() {
  todoStore.addChangeListener(this._onChange);
}

function componentWillUnmount() {
 todoStore.removeChangeListener(this._onChange);
}

function handleAddItem(newItem){
  todoActions.addItem(newItem);
}

function handleRemoveItem(index){
  todoActions.removeItem(index);
}

function render(){
  return (
    <div className="col-sm-6 col-md-offset-3">
      <div className="col-sm-12">
        <h3 className="text-center"> Todo List </h3>
        <AddItem add={this.handleAddItem}/>
        <List items={this.state.list} remove={this.handleRemoveItem}/>
      </div>
    </div>
  );
}

function _onChange() {
  this.setState({
    list: todoStore.getList()
  })
}

var ListContainer = React.createClass({
  getInitialState:      getInitialState,
  handleAddItem:        handleAddItem,
  handleRemoveItem:     handleRemoveItem,
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  _onChange:            _onChange,
  render:               render
});

module.exports = ListContainer;
