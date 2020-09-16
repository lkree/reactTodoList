import React, {useState} from 'react';
import uuid from 'uuid';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './index.scss';
import { ItemsToShowStatuses } from './utils/utils';


const item = {
   title: '',
   description: '',
   favourite: true,
   deleted: true,
   id: '',
   edited: false,
   completed: false
};


const App = () => {
   const [items, setItems] = useState([]);
   const [itemsToShow, setItemsToShow] = useState(ItemsToShowStatuses.all);
   // const [id, setId] = useState(uuid());
   // const [item, setItem] = useState('');
   // const [editItem, setEditItem] = useState(false);

   const handleChange = (id, prop, value) => {
      // setItem(event.target.value);

      const newItems = { ...items };
      newItems.find((i) => i.id === id)[prop] = value;

      setItems(newItems);
   }

   const handleSubmit = (event, { title, description }) => {
      event.preventDefault();

      if (item.length <= 0) {
         return;
      }

      const newItem = {
         id: uuid(),
         title,
         description,
         edited: false
      };

      setItems([...items, newItem]);
   }

   const updateTodosToShow = string => {
      setItemsToShow(string);

      let newItems;

      switch(itemsToShow) {
         case ItemsToShowStatuses.todo:
            newItems = items.filter(item => !item.completed);
            break;
         case ItemsToShowStatuses.done:
            newItems = items.filter(item => item.completed);
            break;
         default:
            newItems = items;
      }

      if (items !== newItems) {
         setItems(newItems);
      }
   }

   const handleDoneTask = id => {
      const filteredItems = items.map(item => {
         if (item.id === id)
            item.completed = !item.completed;

         return item;
      });

      setItems(filteredItems);
   }

   const handleDelete = id => {
      const filteredItems = items.filter(item => item.id !== id)
      setItems(filteredItems);
   }

   const handleEdit = id => {
      const filteredItems = items.filter(item => item.id !== id);
      const selectedItem = items.find(item => item.id === id);

      setItems(filteredItems);
      setId(id);
      setItem(selectedItem.title);
      setEditItem(true);
   }

   const handleDeleteDoneTasks = () => {
      const filteredItems = items.filter(item => item.completed === false);

      setItems(filteredItems);
   }

   const clearList = () => {
      setItems([]);
   }

   return (
      <div className="todolist-container">
         <div className="todolist_table">
            <h3 className="todolist_table__title">Drop your task!</h3>
            <TodoInput
               item={item}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
            />
            <TodoList
               items={items}
               filterDoneTasks={() => {}}
               clearList={clearList}
               handleDelete={handleDelete}
               handleEdit={handleEdit}
               handleDoneTask={handleDoneTask}
               handleDeleteDoneTasks={handleDeleteDoneTasks}
               updateTodosToShow={updateTodosToShow}
            />
         </div>
      </div>
   )
};

// class App extends Component {
//    constructor(props) {
//       super(props);
//
//       this.state = {
//          items: [],
//          itemsToShow: "all",
//          id: uuid(),
//          item: '',
//          editItem: false,
//       };
//    }
//
//    handleChange = event => {
//       this.setState({
//          item: event.target.value
//       });
//    }
//
//    handleSubmit = event => {
//       event.preventDefault();
//
//       const newItem = {
//          id: this.state.id,
//          title: this.state.item,
//          completed: false
//       };
//
//       const updatedItems = [...this.state.items, newItem];
//
//       if (this.state.item.length > 0) {
//          this.setState({
//             items: updatedItems,
//             id: uuid(),
//             item: '',
//             editItem: false
//          });
//       }
//    }
//
//    updateTodosToShow = string => {
//       this.setState({
//          itemsToShow: string
//       });
//    };
//
//    handleDoneTask = (id) => {
//       const filteredItems = this.state.items.map(item => {
//          if (item.id === id)
//             item.completed = !item.completed;
//
//          return item;
//       });
//
//       this.setState({
//          items: filteredItems,
//       });
//    }
//
//    handleDelete = id => {
//       const filteredItems = this.state.items.filter(item => item.id !== id)
//       this.setState({
//          items: filteredItems
//       });
//    }
//
//    handleEdit = id => {
//       const filteredItems = this.state.items.filter(item => item.id !== id);
//       const selectedItem = this.state.items.find(item => item.id === id);
//
//       this.setState({
//          items: filteredItems,
//          id: id,
//          item: selectedItem.title,
//          editItem: true
//       });
//    }
//
//    handleDeleteDoneTasks = () => {
//       const filteredItems = this.state.items.filter(item => item.completed === false);
//
//       this.setState({
//          items: filteredItems
//       });
//    }
//
//    clearList = () => {
//       this.setState({
//          items: []
//       });
//    }
//
//    render() {
//       let items = [];
//
//       if (this.state.itemsToShow === "all") {
//          items = this.state.items;
//       } else if (this.state.itemsToShow === "todo") {
//          items = this.state.items.filter(item => !item.completed);
//       } else if (this.state.itemsToShow === "done") {
//          items = this.state.items.filter(item => item.completed);
//       }
//
//       return (
//          <div className="todolist-container">
//             <div className="todolist_table">
//                <h3 className="todolist_table__title">Drop your task!</h3>
//                <TodoInput
//                   item={this.state.item}
//                   handleChange={this.handleChange}
//                   handleSubmit={this.handleSubmit}
//                />
//                <TodoList
//                   items={items}
//                   filterDoneTasks={this.filterDoneTasks}
//                   clearList={this.clearList}
//                   handleDelete={this.handleDelete}
//                   handleEdit={this.handleEdit}
//                   handleDoneTask={this.handleDoneTask}
//                   handleDeleteDoneTasks={this.handleDeleteDoneTasks}
//                   updateTodosToShow={this.updateTodosToShow}
//                />
//             </div>
//          </div>
//       );
//    }
// }

export default App;
