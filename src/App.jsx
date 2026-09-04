import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import DeviceList from "./pages/DeviceList";
import CreateExperiment from "./pages/CreateExperiment";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />

          <Route 
            path="/devices" 
            element={<DeviceList />} 
          />

          <Route 
            path="/create" 
            element={<CreateExperiment />} 
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;