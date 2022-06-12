import logo from './logo.svg';
import './App.css';

import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import SingleArticlePage from './pages/SingleArticlePage';
import NotFound from './pages/NotFound';


function App({loggedIn}) {
  const {user} = useSelector((state)=> state.user)
  if(user){
    loggedIn = true
  }else {
    loggedIn =false
  }
  return (
    <BrowserRouter>
    <Navigation loggedIn={loggedIn}/>
    <Routes>
      <Route path="/" element={<Home />} />
    {/* conditionals to show pages depending if logged in or not */}
    {!user &&(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
  
    )}
    {user &&(
      <>
      <Route path="/new-article" element={<NewArticle />} />
      <Route path="/articles/:id/edit" element={<EditArticle />} />
      <Route path="/articles/me" element={<MyArticles />} />
      </>

    )}
      <Route path="/articles/:id" element={<SingleArticlePage />} />
      <Route path="/*" element={<NotFound />} />
      
     
    </Routes>     
    <Footer />
  </BrowserRouter>
  );
}

export default App;
