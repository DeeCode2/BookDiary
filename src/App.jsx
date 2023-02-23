import { AuthContextProvider } from './config/AuthContext';
import ProtectedRoute from './config/ProtectedRoute';
import {Route, Routes} from "react-router-dom";
import './App.scss'

//MUI fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import components
import SignIn from './components/registration/SignIn';
import SignUp from './components/registration/SignUp';
import Library from './components/Library';
import BookInfo from './components/BookInfo';
 import NewBook from './components/NewBook';
import EditEntry from "./components/EditEntry";
import Navbar from './components/Navbar';

import './App.scss';

function App() {
  return (
    <AuthContextProvider>
      
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/library' element={<ProtectedRoute><Library /></ProtectedRoute>} />
        {/* <Route path='/newbook' element={<ProtectedRoute><NewBook /></ProtectedRoute>} /> */}
        <Route path="/library/:bookId" element={<ProtectedRoute><BookInfo /></ProtectedRoute>} />
        <Route path="/library/:bookId/edit" element={<ProtectedRoute><EditEntry /></ProtectedRoute>} />
        
        
      </Routes>
    </AuthContextProvider>
  )
}

export default App
