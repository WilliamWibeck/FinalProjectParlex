import { useState, useEffect } from "react";

const Particles = () => {
  const generateParticle = () => {
    const spawnFromTop = Math.random() > 0.5;
    return {
      id: Math.random(),
      top: spawnFromTop ? -10 : Math.random() * 100,
      left: spawnFromTop ? Math.random() * 100 : -10,
      delay: Math.random() * 5,
    };
  };

  const [particles, setParticles] = useState(() =>
    Array.from({ length: 100 }, () => generateParticle())
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) => {
        const newParticle = generateParticle();
        return [...prevParticles.slice(1), newParticle];
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(({ id, top, left, delay }) => (
        <div
          key={id}
          className="absolute w-2 h-2 bg-[#6b46c1] rounded-full animate-moveDiagonal"
          style={{
            top: `${top}vh`,
            left: `${left}vw`,
            animationDelay: `${delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Particles;
