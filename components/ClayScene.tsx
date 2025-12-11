/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ClayScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Clay Material Factory
    const createClayMaterial = (color: string) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0.6,
        metalness: 0.1,
        clearcoat: 0.1,
        clearcoatRoughness: 0.4,
        reflectivity: 0.2,
      });
    };

    // Geometries
    const shapes: THREE.Mesh[] = [];

    // 1. Large Torus (Violet) - Top Left
    const torusGeo = new THREE.TorusGeometry(3, 1, 16, 100);
    const torusMat = createClayMaterial('#6A4FBF');
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-8, 2, -10);
    scene.add(torus);
    shapes.push(torus);

    // 2. Icosahedron (Teal) - Bottom Right
    const icoGeo = new THREE.IcosahedronGeometry(2, 0);
    const icoMat = createClayMaterial('#2AB9A9');
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(8, -4, -8);
    scene.add(ico);
    shapes.push(ico);

    // 3. Sphere (Peach) - Top Right distance
    const sphereGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMat = createClayMaterial('#FFB673');
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(6, 6, -15);
    scene.add(sphere);
    shapes.push(sphere);

    // 4. Cone (Yellow) - Bottom Left
    const coneGeo = new THREE.ConeGeometry(1.5, 3, 32);
    const coneMat = createClayMaterial('#FFD447');
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(-5, -6, -12);
    cone.rotation.z = Math.PI / 4;
    scene.add(cone);
    shapes.push(cone);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xFFB673, 2, 50);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    camera.position.z = 10;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate shapes gently
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;

      ico.rotation.x -= 0.005;
      ico.rotation.y -= 0.005;

      sphere.position.y += Math.sin(Date.now() * 0.001) * 0.01;
      
      cone.rotation.x += 0.01;
      cone.rotation.z += 0.005;

      // Gentle Parallax effect
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose geometries/materials to prevent leaks
      shapes.forEach(shape => {
          shape.geometry.dispose();
          (shape.material as THREE.Material).dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply"
    />
  );
};

export default ClayScene;
