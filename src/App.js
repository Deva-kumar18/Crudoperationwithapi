import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([
    {
    Id:1,title:"steve",price:"12345678",description:"sanfrance"
  },
  {
    Id:2,title:"stevee",price:"123678",description:"sanferance"
  }]);
  const [newItem, setNewItem]= useState({Id:"",title:"",price:"",description:""})

  const [editingId, setEditingId]= useState(null)

  const handleData = ()=>{
    setData([...data,newItem])
    setNewItem({Id:"",title:"",price:"",description:""})
  }
  const handleUpdate =()=>{
    const updateData = data.map((item)=>
      item.Id===newItem.Id ? newItem:item
    );
    setData(updateData);
    setNewItem({Id:"",title:"",price:"",description:""});
    setEditingId(null)
  }
  const handleDelete = (id)=>{
    const filterData = data.map((item)=>
    item.Id !==id)
    setData(filterData)
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://fakestoreapi.com/products') 
      .then((response) => {
        setData(response.data);
        console.log(response,'llllllllllll');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleAdd = () => {
    axios.post('https://fakestoreapi.com/products', newItem) 
      .then(() => {
        fetchData();
        setNewItem({ Id: '', title: '', price: '', description: '' });
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  const handleUpdates = () => {
    axios.put(`https://example.com/api/data/${newItem.Id}`, newItem) 
      .then(() => {
        fetchData();
        setNewItem({ Id: '', title: '', price: '', description: '' });
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDeletes = (id) => {
    axios.delete(`https://example.com/api/data/${id}`) 
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  

  return (
    <div className="App">
    <h1>CRUD Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.Id}>
              <td>
                {editingId === item.Id ? (
                  <input
                    type="text"
                    value={newItem.Id}
                    onChange={(e) =>
                      setNewItem({ ...newItem, Idd: e.target.value })
                    }
                  />
                ) : (
                  item.Id
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                  />
                ) : (
                  item.title
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <input
                    type="password"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                  />
                ) : (
                  item.price
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  />
                ) : (
                  item.description
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <>
                    <button onClick={handleUpdate}>Update</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(item.Id)}>Edit</button>
                    <button onClick={() => handleDelete(item.Id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="ID"
          value={newItem.Id}
          onChange={(e) => setNewItem({ ...newItem, Id: e.target.value })}
        />
        <input
          type="text"
          placeholder="title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="password"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      </div>
  );
}

export default App;
