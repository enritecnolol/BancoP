import { ChangeEvent } from 'react';
import './select.css'

interface CustomSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[];
    label?: string;
    value: number;
    onChange: (value: ChangeEvent<HTMLSelectElement>) => void
}

const CustomSelect = ({ options, label, value, onChange }: CustomSelectProps) => {

    return (
        <div className="custom-select-container">
            {label && <label>{label}</label>}
            <select value={value} onChange={onChange} className="custom-select">
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
