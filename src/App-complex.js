import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Float } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function Blueprint({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <Float speed={hovered ? 2 : 0.5} rotationIntensity={hovered ? 0.5 : 0.1}>
      <group
        ref={groupRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, 1.1]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : '#f8f8ff'} 
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 1]} />
          <meshStandardMaterial 
            color={hovered ? '#4169E1' : '#1e40af'} 
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.2, 0.03, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.08]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[-0.2, 0.03, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.08]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
    </Float>
  );
}

function Caliper({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={hovered ? 1.5 : 0.3} rotationIntensity={hovered ? 0.3 : 0.05}>
      <group
        ref={groupRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : '#c0c0c0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-0.1, 0.05, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : '#c0c0c0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.1, 0.25, 0]}>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : '#c0c0c0'} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.01]} />
          <meshStandardMaterial 
            color={hovered ? '#ffd700' : '#b45309'} 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Notepad({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <Float speed={hovered ? 1 : 0.4} rotationIntensity={hovered ? 0.2 : 0.05}>
      <group
        ref={groupRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.03]} />
          <meshStandardMaterial 
            color={hovered ? '#fff8dc' : '#f5deb3'} 
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 0.7]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : '#fefefe'} 
            transparent
            opacity={0.95}
          />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[-0.15, 0.04, -0.25 + i * 0.08]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.3, 0.01]} />
            <meshStandardMaterial color="#e5e7eb" transparent opacity={0.6} />
          </mesh>
        ))}
        <mesh position={[-0.25, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.6]} />
          <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

function DeskSurface() {
  return (
    <group>
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial 
          color="#8B4513"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function DeskAccessories() {
  return (
    <group>
      <Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh position={[1.8, -0.35, -0.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.25]} />
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[1.8, -0.2, -0.8]} castShadow>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#3498db" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
      
      <Float speed={0.3} rotationIntensity={0.2} floatIntensity={0.05}>
        <mesh position={[-1.5, -0.4, -0.9]} castShadow>
          <boxGeometry args={[0.15, 0.02, 0.25]} />
          <meshStandardMaterial color="#e74c3c" roughness={0.8} metalness={0.1} />
        </mesh>
      </Float>
      
      <mesh position={[0, -0.42, 1.2]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#34495e" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

function Scene({ setActivePanel }) {
  const [hoveredBlueprint, setHoveredBlueprint] = useState(false);
  const [hoveredCaliper, setHoveredCaliper] = useState(false);
  const [hoveredNotepad, setHoveredNotepad] = useState(false);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <DeskSurface />
      <DeskAccessories />
      
      <Blueprint
        position={[-1, -0.35, 0.5]}
        onClick={() => setActivePanel('skills')}
        hovered={hoveredBlueprint}
        setHovered={setHoveredBlueprint}
      />
      
      <Caliper
        position={[1, -0.35, 0]}
        onClick={() => setActivePanel('projects')}
        hovered={hoveredCaliper}
        setHovered={setHoveredCaliper}
      />
      
      <Notepad
        position={[0, -0.4, -0.5]}
        onClick={() => setActivePanel('experience')}
        hovered={hoveredNotepad}
        setHovered={setHoveredNotepad}
      />
      
      <Text
        position={[-1, 0.3, 0.5]}
        fontSize={0.08}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
      >
        Skills & Expertise
      </Text>
      
      <Text
        position={[1, 0.3, 0]}
        fontSize={0.08}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
      >
        Featured Projects
      </Text>
      
      <Text
        position={[0, 0.3, -0.5]}
        fontSize={0.08}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
      >
        Experience & Education
      </Text>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
      />
      <Environment preset="apartment" />
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
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="panel-content">
          {children}
        </div>
      </div>
    </>
  );
}

function App() {
  const [activePanel, setActivePanel] = useState(null);

  const panelContent = {
    skills: {
      title: "Technical Skills",
      content: (
        <>
          <h3>Engineering & Design</h3>
          <ul>
            <li>SolidWorks & CAD Modeling</li>
            <li>AutoCAD & Technical Drawing</li>
            <li>3D Printing & Prototyping</li>
            <li>Mechanical Design & Analysis</li>
          </ul>
          <h3>Programming & Development</h3>
          <ul>
            <li>React & JavaScript</li>
            <li>Three.js & WebGL</li>
            <li>Python & MATLAB</li>
            <li>Git & Version Control</li>
          </ul>
          <h3>Manufacturing & Tools</h3>
          <ul>
            <li>CNC Machining</li>
            <li>Precision Measurement</li>
            <li>Quality Control</li>
            <li>Assembly & Testing</li>
          </ul>
        </>
      )
    },
    projects: {
      title: "Featured Projects",
      content: (
        <>
          <h3>Robotic Arm Controller</h3>
          <p>Designed and built a 6-DOF robotic arm with custom control software. Integrated computer vision for object recognition and precise manipulation tasks.</p>
          
          <h3>Automated Testing Fixture</h3>
          <p>Developed a pneumatic testing system for quality control in manufacturing. Reduced testing time by 60% while improving accuracy and repeatability.</p>
          
          <h3>3D Interactive Portfolio</h3>
          <p>Created this immersive portfolio using React Three Fiber and WebGL. Features interactive 3D objects and smooth animations for enhanced user experience.</p>
        </>
      )
    },
    experience: {
      title: "Experience & Education",
      content: (
        <>
          <h3>Mechanical Engineer</h3>
          <p><strong>Engineering Solutions Inc. (2022-Present)</strong></p>
          <p>Lead design and development of automated systems for manufacturing processes. Collaborate with cross-functional teams to deliver innovative solutions.</p>
          
          <h3>Engineering Intern</h3>
          <p><strong>Tech Innovations Corp. (2021-2022)</strong></p>
          <p>Supported product development through CAD modeling, prototyping, and testing. Gained hands-on experience with manufacturing processes and quality systems.</p>
          
          <h3>Education</h3>
          <p><strong>B.S. Mechanical Engineering</strong></p>
          <p>University of Technology (2018-2022)</p>
          <p>Concentration in Robotics and Automation</p>
        </>
      )
    }
  };

  return (
    <div className="App">
      <Canvas
        camera={{ position: [3, 3, 3], fov: 75 }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene setActivePanel={setActivePanel} />
        </Suspense>
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
