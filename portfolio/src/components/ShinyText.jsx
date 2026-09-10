export default function ShinyText({ text, disabled = false, speed = 5, className = '' }) {
  return (
    <div
      className={`inline-block bg-clip-text text-transparent ${
        disabled ? '' : 'animate-shine'
      } ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </div>
  );
}