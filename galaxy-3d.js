document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    document.body.insertBefore(renderer.domElement, document.body.firstChild);

    // Création des étoiles
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff,
        size: 1,
        transparent: true,
        opacity: 0.8
    });

    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
        const distance = Math.random() * 2000 - 1000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        const x = distance * Math.sin(phi) * Math.cos(theta);
        const y = distance * Math.sin(phi) * Math.sin(theta);
        const z = distance * Math.cos(phi);
        
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 500;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animate();

    // Redimensionnement
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});