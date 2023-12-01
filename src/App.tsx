import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { Main } from './page/main/main';
import { Login } from './page/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './page/create-post/create-post';



function App() {   
  return (
    <div className="App">
      <Router>
         <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
