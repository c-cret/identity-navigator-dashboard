
import React, { ReactNode } from 'react';

interface TransitionWrapperProps {
  children: ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
};

export default TransitionWrapper;
