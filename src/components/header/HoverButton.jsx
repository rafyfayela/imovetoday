import React, { useState } from 'react';

const defaultStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  padding: '10px 16px',
  background: 'transparent',
  border: 'none',
  fontSize: '14px',
  fontWeight: 550,
  cursor: 'pointer',
  textAlign: 'left',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  color: '#333',
};

export default function HoverButton({
  children,
  style = {},
  hoverColor = '#f0f0f0',
  hoverTextColor,
  hoverShadow = '0 2px 8px rgba(0,0,0,0.1)',
  ...props
}) {
  const [hover, setHover] = useState(false);

  const combinedStyle = {
    ...defaultStyle,
    ...style,
    background: hover ? hoverColor : defaultStyle.background,
    color: hover && hoverTextColor ? hoverTextColor : style.color || defaultStyle.color,
    boxShadow: hover ? hoverShadow : 'none',
  };

  return (
    <button
      {...props}
      style={combinedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {children}
    </button>
  );
}
