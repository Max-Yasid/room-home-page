import React from 'react';
import './App.css';
import SimpleBar from 'simplebar-react';
import Index from './pages/Index';
import 'simplebar-react/dist/simplebar.min.css';

function App() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <div className="App">
        <Index />
      </div>
    </SimpleBar>
  );
}

export default App;
