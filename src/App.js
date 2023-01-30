import {HashRouter, Route, Routes} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Header from './components/Header';
import Add from './components/Add';

function App() {
 
  return (
    <div className="App">
      <HashRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Add' element={<Add/>}/>
          <Route path='/Edit/:postId' element={<Add/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
