import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import File from "./components/Mint/File";
import Profil from "./components/Profil";
function App() {
  return (
    <BrowserRouter>
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Profil />
          <Routes>
            <Route path="/" element={<File />} />
          </Routes>
        </div>
      </div>
    </EthProvider>
    </BrowserRouter>  
  );
}

export default App;
