import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import './App.css';

function SimpleBox({ position, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={hovered ? 'orange' : color} />
    </mesh>
  );
}

function Scene({ setActivePanel }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Desk */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Objects */}
      <SimpleBox 
        position={[-1, -0.2, 0]} 
        color="blue" 
        onClick={() => setActivePanel('skills')} 
      />
      <SimpleBox 
        position={[0, -0.2, 0]} 
        color="green" 
        onClick={() => setActivePanel('projects')} 
      />
      <SimpleBox 
        position={[1, -0.2, 0]} 
        color="red" 
        onClick={() => setActivePanel('experience')} 
      />
      
      <OrbitControls />
    </>
  );
}

function Panel({ title, onClose, children }) {
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="panel-content">{children}</div>
      </div>
    </>
  );
}

function App() {
  const [activePanel, setActivePanel] = useState(null);

  const panelContent = {
    skills: { title: "Skills", content: <p>Your technical skills here</p> },
    projects: { title: "Projects", content: <p>Your projects here</p> },
    experience: { title: "Experience", content: <p>Your experience here</p> }
  };

  return (
    <div className="App">
      <Canvas camera={{ position: [3, 3, 3], fov: 75 }}>
        <Scene setActivePanel={setActivePanel} />
      </Canvas>
      
      {activePanel && (
        <Panel
          title={panelContent[activePanel].title}
          onClose={() => setActivePanel(null)}
        >
          {panelContent[activePanel].content}
        </Panel>
      )}
    </div>
  );
}

export default App;