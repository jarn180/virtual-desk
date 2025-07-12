import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Float, Html, useGLTF } from '@react-three/drei';
import { Suspense, useState, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function InteractiveMonitor({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.02);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Monitor Base */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4]} />
        <meshStandardMaterial color="#34495e" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Monitor Screen */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.1} roughness={0.9} />
      </mesh>
      
      {/* Screen Content */}
      <mesh position={[0, 0.1, 0.026]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.75, 0.45]} />
        <meshBasicMaterial 
          color={hovered ? "#00ff41" : "#003300"} 
          transparent 
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>
      
      {/* Screen glow effect when hovered */}
      {hovered && (
        <mesh position={[0, 0.1, 0.03]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshBasicMaterial 
            color="#00ff41" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

function InteractiveKeyboard({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Keyboard base */}
      <mesh>
        <boxGeometry args={[0.6, 0.03, 0.2]} />
        <meshStandardMaterial 
          color={hovered ? "#2c3e50" : "#34495e"} 
          metalness={0.3} 
          roughness={0.7} 
        />
      </mesh>
      
      {/* Individual keys */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[-0.25 + (i % 5) * 0.1, 0.02, -0.05 + Math.floor(i / 5) * 0.05]}>
          <boxGeometry args={[0.08, 0.01, 0.04]} />
          <meshStandardMaterial 
            color={hovered ? "#ecf0f1" : "#bdc3c7"} 
            metalness={0.1} 
            roughness={0.8} 
          />
        </mesh>
      ))}
    </group>
  );
}

function InteractiveMouse({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Mouse body */}
      <mesh>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshStandardMaterial 
          color={hovered ? "#e74c3c" : "#c0392b"} 
          metalness={0.2} 
          roughness={0.6} 
        />
      </mesh>
      
      {/* Mouse buttons */}
      <mesh position={[0, 0.011, 0.02]}>
        <boxGeometry args={[0.07, 0.005, 0.08]} />
        <meshStandardMaterial 
          color={hovered ? "#ecf0f1" : "#bdc3c7"} 
          metalness={0.1} 
          roughness={0.8} 
        />
      </mesh>
      
      {/* Scroll wheel */}
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.003]} />
        <meshStandardMaterial color="#95a5a6" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

function InteractiveBook({ position, onClick, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1) * 0.1;
    }
  });

  return (
    <Float speed={hovered ? 1 : 0.2} rotationIntensity={hovered ? 0.1 : 0.02}>
      <group
        ref={groupRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Book cover */}
        <mesh>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshStandardMaterial 
            color={hovered ? "#3498db" : "#2980b9"} 
            metalness={0.1} 
            roughness={0.8} 
          />
        </mesh>
        
        {/* Book pages */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[0.14, 0.19, 0.015]} />
          <meshStandardMaterial color="#ecf0f1" roughness={0.9} />
        </mesh>
        
        {/* Book spine */}
        <mesh position={[-0.075, 0, -0.005]}>
          <boxGeometry args={[0.005, 0.2, 0.02]} />
          <meshStandardMaterial 
            color={hovered ? "#2c3e50" : "#34495e"} 
            metalness={0.2} 
            roughness={0.7} 
          />
        </mesh>
      </group>
    </Float>
  );
}

function WorkspaceEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial 
          color="#34495e" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, 2, -7]} receiveShadow>
        <planeGeometry args={[15, 6]} />
        <meshStandardMaterial 
          color="#2c3e50" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Desk legs */}
      <mesh position={[-1.8, -0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.8, -0.5, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-1.8, -0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.8, -0.5, 0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function RealisticDesk() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main desk surface */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.08, 2]} />
        <meshStandardMaterial 
          color="#8B4513"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Desk drawers */}
      <mesh position={[1.5, -0.3, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 1.8]} />
        <meshStandardMaterial 
          color="#7A3F0A"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>
      
      {/* Drawer handles */}
      <mesh position={[1.9, -0.2, 0.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.9, -0.2, -0.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function TimeMachine({ position, timeEra, setTimeEra, hovered, setHovered }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (hovered) {
        groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      }
    }
  });

  const nextEra = () => {
    const eras = ['childhood', 'highschool', 'pg', 'college', 'present'];
    const currentIndex = eras.indexOf(timeEra);
    const nextIndex = (currentIndex + 1) % eras.length;
    setTimeEra(eras[nextIndex]);
  };

  return (
    <Float speed={hovered ? 2 : 0.5} rotationIntensity={hovered ? 0.3 : 0.1}>
      <group
        ref={groupRef}
        position={position}
        onClick={nextEra}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Time machine base */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={hovered ? "#f39c12" : "#e67e22"} 
            metalness={0.8} 
            roughness={0.2}
            emissive={hovered ? "#f39c12" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>
        
        {/* Spinning orb */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.06]} />
          <meshStandardMaterial 
            color="#3498db" 
            metalness={0.9} 
            roughness={0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Energy rings */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <torusGeometry args={[0.08 + i * 0.02, 0.005, 8, 16]} />
            <meshBasicMaterial 
              color="#00ff41" 
              transparent 
              opacity={hovered ? 0.8 : 0.4}
            />
          </mesh>
        ))}
        
        {/* Era indicator text */}
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.03}
          color="#ecf0f1"
          anchorX="center"
          anchorY="middle"
        >
          {timeEra.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
}

function ChildhoodScene() {
  return (
    <group>
      {/* Colorful kid's desk */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.08, 1.5]} />
        <meshStandardMaterial color="#3498db" roughness={0.6} />
      </mesh>
      
      {/* Lego baseplate */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[2, 0.02, 1]} />
        <meshStandardMaterial color="#27ae60" roughness={0.8} />
      </mesh>
      
      {/* Lego bricks scattered */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={0.2 + i * 0.1} rotationIntensity={0.1}>
          <mesh position={[-1 + (i % 4) * 0.5, 0.1 + (i % 3) * 0.03, -0.3 + Math.floor(i / 4) * 0.3]} castShadow>
            <boxGeometry args={[0.12, 0.06, 0.08]} />
            <meshStandardMaterial 
              color={['#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#27ae60'][i % 5]} 
              roughness={0.3} 
            />
          </mesh>
        </Float>
      ))}
      
      {/* Toy tools */}
      <mesh position={[0.8, 0.08, 0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#f39c12" roughness={0.4} />
      </mesh>
      
      {/* Crayon box */}
      <mesh position={[-0.8, 0.06, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <meshStandardMaterial color="#e67e22" roughness={0.8} />
      </mesh>
    </group>
  );
}

function HighSchoolScene() {
  return (
    <group>
      {/* School desk */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.5, 0.08, 2]} />
        <meshStandardMaterial color="#95a5a6" roughness={0.7} />
      </mesh>
      
      {/* Computer for SolidWorks */}
      <mesh position={[0, 0.35, -0.6]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.1} />
      </mesh>
      
      {/* SolidWorks screen */}
      <mesh position={[0, 0.35, -0.595]} castShadow>
        <planeGeometry args={[0.55, 0.35]} />
        <meshBasicMaterial color="#1e3a8a" />
      </mesh>
      
      {/* Textbooks */}
      {['Physics', 'Math', 'CAD'].map((subject, i) => (
        <Float key={i} speed={0.3} rotationIntensity={0.05}>
          <mesh position={[-1 + i * 0.4, 0.08 + i * 0.02, 0.4]} castShadow>
            <boxGeometry args={[0.15, 0.03, 0.2]} />
            <meshStandardMaterial 
              color={['#e74c3c', '#3498db', '#27ae60'][i]} 
              roughness={0.8} 
            />
          </mesh>
        </Float>
      ))}
      
      {/* Calculator */}
      <mesh position={[0.8, 0.06, 0.2]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.18]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.3} />
      </mesh>
      
      {/* Pencil case */}
      <mesh position={[-0.8, 0.05, -0.2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25]} />
        <meshStandardMaterial color="#9b59b6" roughness={0.6} />
      </mesh>
    </group>
  );
}

function PGScene() {
  return (
    <group>
      {/* Industrial desk */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.08, 2]} />
        <meshStandardMaterial color="#34495e" roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* P&G logo monitor */}
      <mesh position={[0, 0.35, -0.7]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      
      {/* P&G screen */}
      <mesh position={[0, 0.35, -0.695]} castShadow>
        <planeGeometry args={[0.75, 0.45]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* P&G logo on screen */}
      <mesh position={[0, 0.35, -0.69]} castShadow>
        <planeGeometry args={[0.3, 0.1]} />
        <meshBasicMaterial color="#0066cc" />
      </mesh>
      
      {/* Hard hat */}
      <mesh position={[-1.2, 0.15, 0.3]} castShadow>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#f39c12" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Safety clipboard */}
      <mesh position={[0.8, 0.06, 0.2]} castShadow>
        <boxGeometry args={[0.2, 0.03, 0.25]} />
        <meshStandardMaterial color="#ecf0f1" roughness={0.8} />
      </mesh>
      
      {/* Process improvement documents */}
      <mesh position={[-0.5, 0.055, 0]} castShadow>
        <boxGeometry args={[0.25, 0.01, 0.3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      
      {/* Coffee mug with P&G */}
      <mesh position={[1.2, 0.08, -0.3]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.12]} />
        <meshStandardMaterial color="#0066cc" roughness={0.6} />
      </mesh>
    </group>
  );
}

function CollegeScene() {
  return (
    <group>
      {/* University desk */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.08, 2]} />
        <meshStandardMaterial color="#722f37" roughness={0.5} />
      </mesh>
      
      {/* Laptop */}
      <mesh position={[0, 0.05, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.02, 0.6]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.5} />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.25, -0.6]} rotation={[-Math.PI * 0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      
      {/* Texas A&M screen */}
      <mesh position={[0, 0.25, -0.59]} rotation={[-Math.PI * 0.15, 0, 0]} castShadow>
        <planeGeometry args={[0.75, 0.45]} />
        <meshBasicMaterial color="#722f37" />
      </mesh>
      
      {/* Engineering textbooks */}
      {['Thermo', 'Statics', 'Dynamics', 'Materials'].map((subject, i) => (
        <Float key={i} speed={0.2} rotationIntensity={0.03}>
          <mesh position={[-1.5 + i * 0.35, 0.08 + i * 0.03, 0.6]} castShadow>
            <boxGeometry args={[0.18, 0.04, 0.25]} />
            <meshStandardMaterial 
              color={['#722f37', '#1e3a8a', '#059669', '#dc2626'][i]} 
              roughness={0.8} 
            />
          </mesh>
        </Float>
      ))}
      
      {/* Engineering calculator */}
      <mesh position={[0.8, 0.055, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>
      
      {/* Aggie ring */}
      <Float speed={1} rotationIntensity={0.2}>
        <mesh position={[-0.8, 0.08, 0.2]} castShadow>
          <torusGeometry args={[0.03, 0.01, 8, 16]} />
          <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
      
      {/* Study notes */}
      <mesh position={[0.3, 0.055, 0]} castShadow>
        <boxGeometry args={[0.3, 0.01, 0.4]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Scene({ setActivePanel }) {
  const [hoveredMonitor, setHoveredMonitor] = useState(false);
  const [hoveredKeyboard, setHoveredKeyboard] = useState(false);
  const [hoveredMouse, setHoveredMouse] = useState(false);
  const [hoveredBook, setHoveredBook] = useState(false);
  const [hoveredTimeMachine, setHoveredTimeMachine] = useState(false);
  const [timeEra, setTimeEra] = useState('present');

  const getSceneColors = () => {
    switch(timeEra) {
      case 'childhood': return { bg: '#87CEEB', fog: '#87CEEB' }; // Sky blue
      case 'highschool': return { bg: '#F0F8FF', fog: '#F0F8FF' }; // Alice blue
      case 'pg': return { bg: '#2F4F4F', fog: '#2F4F4F' }; // Dark slate gray
      case 'college': return { bg: '#722F37', fog: '#722F37' }; // Texas A&M maroon
      default: return { bg: '#2c3e50', fog: '#2c3e50' }; // Present dark
    }
  };

  const colors = getSceneColors();

  return (
    <>
      <color attach="background" args={[colors.bg]} />
      <fog attach="fog" args={[colors.fog, 3, 12]} />
      
      {/* Dynamic lighting based on era */}
      <ambientLight intensity={timeEra === 'childhood' ? 0.6 : 0.2} />
      <directionalLight 
        position={[5, 8, 3]} 
        intensity={timeEra === 'childhood' ? 1.2 : 0.8} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={15}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      
      <WorkspaceEnvironment />
      
      {/* Time Machine - always present */}
      <TimeMachine
        position={[1.5, 0.1, 0.5]}
        timeEra={timeEra}
        setTimeEra={setTimeEra}
        hovered={hoveredTimeMachine}
        setHovered={setHoveredTimeMachine}
      />
      
      {/* Era-specific scenes */}
      {timeEra === 'childhood' && <ChildhoodScene />}
      {timeEra === 'highschool' && <HighSchoolScene />}
      {timeEra === 'pg' && <PGScene />}
      {timeEra === 'college' && <CollegeScene />}
      {timeEra === 'present' && (
        <>
          <RealisticDesk />
          <InteractiveMonitor
            position={[0, 0.35, -0.8]}
            onClick={() => setActivePanel('skills')}
            hovered={hoveredMonitor}
            setHovered={setHoveredMonitor}
          />
          <InteractiveKeyboard
            position={[0, 0.05, -0.2]}
            onClick={() => setActivePanel('projects')}
            hovered={hoveredKeyboard}
            setHovered={setHoveredKeyboard}
          />
          <InteractiveMouse
            position={[0.4, 0.05, -0.1]}
            onClick={() => setActivePanel('experience')}
            hovered={hoveredMouse}
            setHovered={setHoveredMouse}
          />
          <InteractiveBook
            position={[-1.2, 0.15, 0.3]}
            onClick={() => setActivePanel('experience')}
            hovered={hoveredBook}
            setHovered={setHoveredBook}
          />
        </>
      )}
      
      {/* Era-specific title */}
      <Text
        position={[0, 2, -2]}
        fontSize={0.15}
        color="#ecf0f1"
        anchorX="center"
        anchorY="middle"
      >
        {timeEra === 'childhood' && 'Eddie the Builder (Age 8)'}
        {timeEra === 'highschool' && 'The Woodlands High School (2018-2022)'}
        {timeEra === 'pg' && 'P&G Manufacturing Intern (2023-2024)'}
        {timeEra === 'college' && 'Texas A&M Engineering (2022-2026)'}
        {timeEra === 'present' && 'Eddie Silva - Interactive Portfolio'}
      </Text>
      
      <Text
        position={[0, 1.6, -2]}
        fontSize={0.08}
        color="#bdc3c7"
        anchorX="center"
        anchorY="middle"
      >
        {timeEra === 'present' ? 'Click on objects to explore' : 'Click the time machine to continue'}
      </Text>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={2}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0.2, 0]}
        enableDamping={true}
        dampingFactor={0.05}
      />
      <Environment preset={timeEra === 'childhood' ? 'sunset' : 'night'} background={false} intensity={0.1} />
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
      title: "Skills & Activities - Eddie Silva",
      content: (
        <>
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
            <strong>The Woodlands, Texas | (281) 602-9488 | silvaedd04@gmail.com</strong>
          </div>
          
          <h3>Technical Skills</h3>
          <ul>
            <li>Certified SolidWorks Associate Certification</li>
            <li>Proficient in MS Word, Excel, & Powerpoint</li>
            <li>PRStory</li>
            <li>CAD modeling</li>
          </ul>
          
          <h3>Language Skills</h3>
          <ul>
            <li>Spanish: Native tongue. Fluent (speaking, reading, writing)</li>
          </ul>
          
          <h3>Soft Skills</h3>
          <ul>
            <li>Time Management</li>
            <li>Customer Service</li>
            <li>Planning & Scheduling</li>
            <li>Budget Management</li>
          </ul>
          
          <h3>Activities & Hobbies</h3>
          <ul>
            <li>CAD modeling</li>
            <li>Traveling</li>
            <li>Exercise</li>
          </ul>
        </>
      )
    },
    projects: {
      title: "Experience - Eddie Silva",
      content: (
        <>
          <h3>Procter & Gamble - Phoenix, Arizona</h3>
          <p><strong>Process Engineer Manufacturing Intern</strong> | May 2024 – August 2024</p>
          <ul>
            <li>Collaborated with operations, vendors, facilities, and PC&IS to design, mount, and install equipment monitoring cameras</li>
            <li>Identified and created 5S areas and visuals for commonly used tools and parts within operations</li>
            <li>Developed a method to reduce bottle underfills and gain 0.5% process reliability and reduce material utilization loss due to bottle kickoff by about 50%</li>
            <li>Utilized a changeover toolkit to determine opportunities to improve operations changeovers and implemented new standards to capture those losses and gain about 1% process reliability</li>
          </ul>
          
          <h3>Procter & Gamble - Phoenix, Arizona</h3>
          <p><strong>Engineering Manufacturing Intern</strong> | May 2023 – August 2023</p>
          <ul>
            <li>Developed a vendor acceptance test (VAT) for a new robotic palletizer to ensure it met all requirements before implementation</li>
            <li>Worked closely with quality, microbiology, and operations to implement new sanitization equipment to eliminate the trip/slip hazard of previous equipment</li>
            <li>Investigated opportunities to increase throughput and executed an experimental order (EO) to accelerate the case packer by 20%, testing its feasibility</li>
          </ul>
          
          <h3>Sugar Britches Cafe - Conroe, Texas</h3>
          <p><strong>Server</strong> | August 2020 – August 2022</p>
          <ul>
            <li>Attend an average of 7 tables at a time with a total of 30+ individual orders while executing daily accounting reports from customers that generated up to $2K in weekend revenue</li>
          </ul>
          
          <h3>Zoner's Pizza - The Woodlands, Texas</h3>
          <p><strong>Cashier / Line Cook</strong> | November 2019 – August 2020</p>
          <ul>
            <li>Managed 15+ orders from multiple sources while scheduling with balancing the cash register and generating accurate reports of $6K from weekly sales</li>
          </ul>
        </>
      )
    },
    experience: {
      title: "Education - Eddie Silva",
      content: (
        <>
          <h3>Texas A&M University</h3>
          <p><strong>College Station, Texas</strong></p>
          <p><strong>Bachelor of Science in Engineering</strong> | Expected May 2026</p>
          
          <h3>Scholarships & Recognition</h3>
          <ul>
            <li>Houston Livestock and Rodeo Scholar</li>
            <li>Regents' Scholar</li>
            <li>National Recognition Scholar</li>
          </ul>
          
          <h3>The Woodlands High School</h3>
          <p><strong>The Woodlands, Texas</strong></p>
          <p><strong>Cum Laude GPA: 3.745 / 4.0</strong> | May 2022</p>
        </>
      )
    }
  };

  return (
    <div className="App">
      <Canvas
        camera={{ position: [1.5, 1.2, 2.2], fov: 65 }}
        shadows
        gl={{ antialias: true }}
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