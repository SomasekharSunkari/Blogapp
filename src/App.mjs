import './App.css';
import Header from './Components/Header/Header.mjs';
import Login from './Components/Login/Login.mjs';
import { Routes,Route } from 'react-router-dom';
import Register from './Components/Register/Register.mjs';

function App() {
  return (
    <div className="App">
            <Header/>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register'element={<Register/>} />
      </Routes>
      
    </div>
  );
}

export default App;
