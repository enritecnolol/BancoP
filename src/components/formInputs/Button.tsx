import React, { ButtonHTMLAttributes } from 'react';
import './button.css'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'default' | 'primary' | 'secondary';
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'text', color = 'default', children, ...props }) => {
    return (
        <button className={`custom-button ${variant} ${color}`} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;
