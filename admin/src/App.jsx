import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/admin/Admin'
import { AppProvider } from "./Context/Context";

const App = () => {
  return (
    <AppProvider>
      <Navbar />
      <Admin/>
    </AppProvider>
  )
}

export default App;