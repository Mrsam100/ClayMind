
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlassMountainScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Cold pastel palette background
    scene.background = new THREE.Color('#F0F8FF'); 
    // Volumetric fog for "atmospheric haze"
    scene.fog = new THREE.FogExp2(0xF0F8FF, 0.035);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 18);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    // --- Materials ---
    // 1. Ice / Crystalline Peaks
    const iceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.6, // Glass-like
      thickness: 2.0,
      ior: 1.45, // Ice IOR
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    });

    // 2. Floating Glass Discs (Iridescent)
    const glassDiscMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xE0F7FA,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 0.5,
      ior: 1.5,
      iridescence: 1.0,
      iridescenceIOR: 1.33,
      side: THREE.DoubleSide
    });

    // --- Geometry: Procedural Crystalline Mountains ---
    const mountainGroup = new THREE.Group();
    
    // Create clusters of crystals
    const createCrystalPeak = (x: number, z: number, scale: number) => {
      const height = scale * (Math.random() * 5 + 3);
      const radius = scale * (Math.random() * 2 + 1);
      const geometry = new THREE.ConeGeometry(radius, height, 4); // Pyramidal
      const mesh = new THREE.Mesh(geometry, iceMaterial);
      mesh.position.set(x, height / 2 - 5, z);
      // Randomize rotation for organic feel
      mesh.rotation.y = Math.random() * Math.PI;
      // Slight tilt
      mesh.rotation.x = (Math.random() - 0.5) * 0.2;
      mesh.rotation.z = (Math.random() - 0.5) * 0.2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // Generate a landscape
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 20 - 5;
      // Make center peaks taller
      const dist = Math.sqrt(x*x + z*z);
      const scale = Math.max(0.5, 2.5 - dist / 10); 
      
      const peak = createCrystalPeak(x, z, scale);
      mountainGroup.add(peak);
    }
    scene.add(mountainGroup);

    // --- Geometry: Floating Abstract Elements ---
    const floatingGroup = new THREE.Group();

    // 1. Discs
    for (let i = 0; i < 8; i++) {
      const radius = Math.random() * 2 + 1;
      const geo = new THREE.CylinderGeometry(radius, radius, 0.05, 32);
      const mesh = new THREE.Mesh(geo, glassDiscMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10 + 2,
        (Math.random() - 0.5) * 10
      );
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      floatingGroup.add(mesh);
    }

    // 2. Spheres (Bubbles)
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(sphereGeo, glassDiscMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 25,
        Math.random() * 12 + 1,
        (Math.random() - 0.5) * 15
      );
      floatingGroup.add(mesh);
    }
    scene.add(floatingGroup);


    // --- Lighting (Cinematic) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Main "Sun" light - Cold Blue/White
    const sunLight = new THREE.DirectionalLight(0xE0F7FA, 2.0);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Backlight for subsurface effect
    const backLight = new THREE.SpotLight(0x00FFFF, 1.5);
    backLight.position.set(-10, 5, -10);
    backLight.lookAt(0,0,0);
    scene.add(backLight);

    // --- Animation ---
    const clock = new THREE.Clock();

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Gentle camera sway
      const targetX = x * 2;
      const targetY = y * 2 + 5;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 2, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Floating animation
      floatingGroup.children.forEach((obj, i) => {
        obj.position.y += Math.sin(time + i) * 0.005;
        obj.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        obj.rotation.z += 0.001;
      });

      // Subtle pulse in mountains? No, mountains should be still. 
      // Maybe rotate the whole group very slowly
      mountainGroup.rotation.y = Math.sin(time * 0.05) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose
      iceMaterial.dispose();
      glassDiscMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 w-full h-full bg-gradient-to-b from-[#F0F8FF] to-[#E0F7FA]"
    />
  );
};

export default GlassMountainScene;
