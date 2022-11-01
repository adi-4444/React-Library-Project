import './App.css';
import Library from './components/Library';
import { Routes, Route } from 'react-router-dom';
import Students from './components/Students';
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <div className="App" id='particles-js'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Library />} />
          <Route path='/students' element={<Students />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
