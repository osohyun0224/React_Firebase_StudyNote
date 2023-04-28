import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Nav from './components/Nav';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { isAuthReady, user } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
        <Nav />
        <Routes>
          {/* replace : 속성값이 false라면 뒤로가기 눌렀을때 리다이렉트 이전의 url로 이동하는것이 가능하지만 true면 이동 불가 */}
          <Route path="/" element={user ? <Home /> : <Navigate replace={true} to="/login" />}></Route>
          <Route path="/login" element={!user ? <Login /> : <Navigate replace={true} to="/"/>}></Route>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate replace={true} to="/"/>}></Route>
        </Routes>
        </BrowserRouter>
      ) : "Loading..."}
    
    </div>
  );
}

export default App
