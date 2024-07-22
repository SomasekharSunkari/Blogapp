import './App.css';
import Header from './Components/Header/Header.mjs';
import Login from './Components/Login/Login.mjs';
import { Routes,Route } from 'react-router-dom';
import Register from './Components/Register/Register.mjs';
import { UserContextProvider } from './Components/Context/UserContext.mjs';
import CreatePosts from './Components/CreatePosts/CreatePosts.mjs';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
            <Header/>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register'element={<Register/>} />
        <Route path='/create' element={<CreatePosts/>}/>
      </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
