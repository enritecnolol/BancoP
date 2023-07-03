import { useState } from "react";
import "./dropdown.css";

interface DropdownProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  id: string;
}

const Dropdown = ({ onEdit, onDelete, id }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown" onMouseLeave={() => setIsOpen(false)}>
      <img
        onClick={() => setIsOpen(!isOpen)}
        src="../../../src/assets/3dots.png"
        alt="menu icon"
        style={{
          width: "40px",
        }}
      />

      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={() => onEdit(id)}>Editar</button>
          <button onClick={() => onDelete(id)}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
