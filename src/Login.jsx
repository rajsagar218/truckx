import { useState } from 'react'
import axios from "axios";
import { useHistory} from "react-router-dom";

function Login(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (evt) => {
    evt.preventDefault();
    const body = {
      email: email, 
      password: password,
    }
    axios.post('https://reqres.in/api/login', body).then(response => {
      console.log(response);
      if (response.status === 200)
        alert('login sucess');
      else
        alert('login failed');
      history.push('/');
    }).catch(err => {
      alert('login failed');
      history.push('/');
    });
  }

  return ( 
    <div>
      <form onSubmit={login}>
        <span>Email</span>
        <input type='email' onChange={e => setEmail(e.target.value)}/>
        <br />
        <span>Password</span>
        <input type='password' onChange={e => setPassword(e.target.value)}/>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
