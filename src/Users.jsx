import {Component, useEffect, useState } from 'react'
import axios from "axios";
import { useHistory, Link} from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [
  {headerName: "#", field: "id"},
  {headerName: "Email", field: "email"},
  {headerName: "First", field: "first_name"},
  {headerName: "Last", field: "last_name"},
  {headerName: "Avatar", 
    field: "avatar", 
    sortable: false, 
    autoHeight: true,
    cellStyle: {height: '100px'},
    cellRendererFramework: function(params) {
      return <img src={params.value} alt='avatar'/>
  }},
  {
    headerName:'Operations',
    cellRenderer: 'btnCellRenderer',
    cellRendererParams: {
      editHandler: function(field) {
        alert(`${field} was edited`);
      },
      deleteHandler: function(field) {
        alert(`${field} was deleted`);
      },
    }
  },
]

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  editHandler() {
   this.props.editHandler(this.props.value);
  }
  deleteHandler() {
    this.props.deleteHandler(this.props.value);
  }
  render() {
    return (
      <div>
        <button onClick={this.editHandler}>Edit</button>
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    )
  }
}

function Users() {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.setQuickFilter(filterText);
  }

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = () => {
    axios
      .get('https://reqres.in/api/users')
      .then(({ data }) => {
        setUsers(data.data)
      })
  }
  
  return users.length == 0 ? ( 
    <div>
      <h2>Loading</h2>
    </div>
  ) : ( 
    <div>
      <h2>List of Users</h2>
      <input placeholder='filter text' onChange={e => setFilterText(e.target.value)}/>
      <Link to="/user/create" className="btn btn-primary">New User</Link>
      <div
				className="ag-theme-balham"
				style={{
          width: '90vw',
          height: '90vh'
				}}
			>
				<AgGridReact
          defaultColDef={{
            flex: 1
          }}
          quickFilter={filterText}
          onGridReady={onGridReady}
          frameworkComponents={{
            btnCellRenderer: BtnCellRenderer,
          }}
					columnDefs={columnDefs}
					rowData={users}>
				</AgGridReact>
			</div>
    </div>
  );
}

export default Users;
