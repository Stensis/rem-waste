import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseSkipPage from './pages/ChooseSkipPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseSkipPage />} />
      </Routes>
    </Router>
  );
}

export default App;
