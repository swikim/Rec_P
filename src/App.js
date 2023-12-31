import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Calculator from './pages/Calculator';
import Navbar from './components/Navbar';
import Weather from './pages/Weather'
function App() {
  return (
    <BrowserRouter>
      {/* Router를 중첩해 Navbar가 있는 컴포넌트를 만들어볼까요?*/}
      <Navbar />
      <Routes>

        {/* Navbar가 있는 컴포넌트를 만들어볼까요?*/}
        <Route>
          <Route path='/' element={<Main />} />
          {/* 라우팅을 동적으로 관리하고싶어요 "1" 대신 들어가야 할게 뭘까요?*/}
          
        </Route>
        <Route path='/Calculator' element={<Calculator />} />
        <Route path='/Weather' element={<Weather />}/>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;