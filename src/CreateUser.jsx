import { useState } from 'react'
import axios from "axios";
import { useHistory} from "react-router-dom";

function CreateUser(props) {
  let history = useHistory();
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const createUser = (evt) => {
    evt.preventDefault();
    const body = {
      name: name, 
      job: job,
    }
    axios.post('https://reqres.in/api/users', body).then(response => {
      console.log(response);
      if (response.status == 200 || response.status == 201)
        alert('createUser sucess');
      else
        alert('createUser failed');
      history.push('/');
    }).catch(err => {
      alert('createUser failed');
      history.push('/');
    });
  }

  return ( 
    <div>
      <form onSubmit={createUser}>
        <span>Name</span>
        <input placeholder='Name' onChange={e => setName(e.target.value)}/>
        <br />
        <span>Job</span>
        <input placeholder='Job Title' onChange={e => setJob(e.target.value)}/>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateUser;
