// Dropdown.tsx
import React from 'react';
import Select from 'react-select';

interface DropdownProps {
    setView: (view: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ setView }) => {
    const options = [
        { value: 'multiMonthYear', label: 'Ano' },
        { value: 'dayGridMonth', label: 'Mês' },
        { value: 'timeGridWeek', label: 'Semana' },
        { value: 'timeGridDay', label: 'Dia' },
    ];

    const handleViewChange = (selectedOption: any) => {
        setView(selectedOption.value);
    };

    return (
        <Select
            options={options}
            onChange={handleViewChange}
            defaultValue={options[0]} // Opção padrão
            className="w-full"
        />
    );
};

export default Dropdown;