import { useState, useEffect } from 'react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePickerCustom = ({ setDate }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState();
  useEffect(() => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    year && setDate(`${year}-${formattedMonth}`);
  }, [month, year]);

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
      <select
        className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="" disabled>
          Select Month
        </option>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        value={year}
        placeholder="Year eg.(2024)"
        onChange={handleYearChange}
      />
    </div>
  );
};

export default DatePickerCustom;
