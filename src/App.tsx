import { OSProvider } from './contexts/OSContext';
import Desktop from './components/Desktop';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import WindowManager from './components/WindowManager';

function App() {
  return (
    <OSProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <Desktop />
        <MenuBar />
        <WindowManager />
        <Dock />
      </div>
    </OSProvider>
  );
}

export default App;
