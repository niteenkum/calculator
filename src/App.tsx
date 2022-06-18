import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Calculator from "./Pages/Calculator";

function App() {
  return (

<BrowserRouter>
<Routes>
  <Route path="/" element={<Calculator />}>
    <Route path="/calculator" element={<Calculator />} />
    </Route>
</Routes>
</BrowserRouter>
  );
}

export default App;
