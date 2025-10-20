import React from 'react';
import RepeaterForm from './components/repreater-form';

function App() {
  return (
    <div className="bg-gray-100 p-4 w-full" data-theme="mytheme">
      <h1 className="mb-4 font-bold text-gray-800 text-2xl">Google Form Automate</h1>
      <div className="space-y-2">
        <RepeaterForm />
      </div>
    </div>
  );
}

export default App;
