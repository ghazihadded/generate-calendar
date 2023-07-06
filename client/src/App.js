import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import SignIn from './pages/Login'

import './App.css';
import Register from './pages/Register';
import store from './redux';
import PrivateRoute from './routes/PrivateRoute';
import AdminPages from './routes/AdminPages';
import Home from './pages/Home';
import Professeurs from './pages/Professeurs';
import Students from './pages/Students';
import Update from './pages/Update';
import ClassRoom from './pages/ClassRoom';
import Groupes from './pages/Groupes'
import Calendrier from './pages/Calendrier';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
   
    <Route path='/'  element={<PrivateRoute />} >
      <Route element={<AdminPages />} >
      <Route  exact="true" path='/' element={<Home />} />
      <Route  exact="true" path='/professeurs'  element={<Professeurs />} />
      <Route  exact="true" path='/students'  element={<Students />} />
      <Route  exact="true" path='/professeur/:id'  element={<Update />} />
      <Route  exact="true" path='/student/:id'  element={<Update />} />
      <Route  exact="true" path='/classes'  element={<ClassRoom />} />
      <Route  exact="true" path='/groupes'  element={<Groupes />} />
      <Route  exact="true" path='/calendrier'  element={<Calendrier />} />
      
     </Route>
      </Route>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<SignIn />} />
    
    
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
