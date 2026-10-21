import { BrowserRouter, Routes, Route } from "react-router-dom";


import RecipeLibrary from "./pages/RecipeLibrary";
import Layout from "./components/layout/Layout";

import Settings from "./pages/Settings";
import DeviceDetail from "./pages/DeviceDetail";

import Home from "./pages/Home";
import DeviceList from "./pages/DeviceList";
import CreateExperiment from "./pages/CreateExperiment";
import ExperimentDetail from "./pages/ExperimentDetail";


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
            path="/devices/:deviceName"
            element={<DeviceDetail />}
          />

          <Route
            path="/recipes"
            element={<RecipeLibrary />}
          />



          <Route 
            path="/create" 
            element={<CreateExperiment />} 
          />

          <Route
            path="/experiment/:id"
            element={<ExperimentDetail />}
          />


        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;