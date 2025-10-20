import React from 'react';
import { Settings, Play, Pause } from 'lucide-react';
import RepeaterForm from './components/repreater-form';
import CustomButton from './components/CustomButton';

function App() {
  return (
    <div className="bg-gray-100 p-4 w-80 min-h-96" data-theme="mytheme">
      <h1 className="mb-4 font-bold text-gray-800 text-2xl">Google Form Automate</h1>
      <div className="space-y-2">
        <RepeaterForm />
        <CustomButton variant="primary" onClick={() => {}}>
          <Play className="mr-2 w-5 h-5" />
          Start Automation
        </CustomButton>
        <CustomButton variant="secondary" onClick={() => {}}>
          <Pause className="mr-2 w-5 h-5" />
          Pause
        </CustomButton>
        <CustomButton variant="accent" onClick={() => {}}>
          <Settings className="mr-2 w-5 h-5" />
          Settings
        </CustomButton>
      </div>
    </div>
  );
}

export default App;
