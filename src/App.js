import './App.css';

import { Routes, Route, useLocation } from 'react-router-dom';
import { CreateView , DetailView, EditView, HomeView, IndexView} from './views'
import { NavBar, Footer } from './components';

function App() {
  return (
    <div className="App">
      <div className='container'>
        {useLocation().pathname !== '/' && <NavBar />}
        
        <Routes>
			    <Route path="/" element={<IndexView />} />
			    <Route path="/detail/:id" element={<DetailView />} />
			    <Route path="/home" element={<HomeView />} />
			    <Route path="/create" element={<CreateView />} />
          <Route path="/edit/:id" element={<EditView />} />
        </Routes>
      </div>
      {useLocation().pathname !== "/" && (
          <Footer />
        )}
    </div>
  );
}

export default App;
