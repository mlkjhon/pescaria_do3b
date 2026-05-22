import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Pages/Principal';
import Login from './Pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  )
}
