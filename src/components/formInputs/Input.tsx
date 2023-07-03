import { InputHTMLAttributes } from 'react';
import './input.css'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: boolean;
}

const CustomInput = ({label, error, ...props }: CustomInputProps) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <input className={`form-control ${error && 'input-error' }`}
                {...props} 
            />
        </div>
    );
};

export default CustomInput;
