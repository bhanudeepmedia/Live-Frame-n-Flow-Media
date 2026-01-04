import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center overflow-hidden group magnetic-target";
  
  const variants = {
    primary: "bg-transparent border border-white/20 hover:border-accent text-white hover:text-background",
    outline: "border border-white/20 text-white hover:border-white",
    ghost: "text-white/60 hover:text-white"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;