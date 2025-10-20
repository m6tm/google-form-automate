import React from 'react';
import { Settings, Play, Pause } from 'lucide-react';

function App() {
  return (
    <div className="w-80 h-96 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Google Form Automate</h1>
      <div className="space-y-2">
        <button className="flex items-center w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Play className="w-5 h-5 mr-2" />
          Start Automation
        </button>
        <button className="flex items-center w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </button>
        <button className="flex items-center w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
}

export default App;
