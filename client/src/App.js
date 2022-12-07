import './css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Shopreg from './Components/Shopreg';
import Shoplogin from './Components/Shoplogin';
import Loadingpage from './Components/Loadingpage';
import About from './Components/About';
import Logout from './Components/Logout';
import Addproduct from './Components/Add Product.js'
import Allproduct from './Components/All product.js'
import Singleproduct from './Components/Singleproduct'


import { createContext, useReducer } from 'react';
import { initialState, reducer, } from '../src/reducer/UseReducer';
export const UserContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/seller-register" element={<Shopreg />}></Route>
            <Route path='/seller-login' element={<Shoplogin />}></Route>
            <Route path='/loading' element={<Loadingpage />}></Route>
            <Route path='/seller-profile' element={<About />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/adding-request' element = {<Addproduct/>}></Route>
            <Route path='/adding-request/:id' element = {<Singleproduct/>}></Route>
            <Route path='/all-item' element = {<Allproduct/>}></Route>            
            
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;

