import {Link} from "react-router-dom";

function Home() {
  return ( 
    <div>
      <span>Pages</span>
      <ul>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </div>
  );
}

export default Home;
