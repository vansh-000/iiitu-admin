const packageData = [
  {
    name: 'Free package',
    price: 0.0,
    invoiceDate: `Doctorate of Philosophy (PhD) in Computer Engineering from NIT Kurukshetra, Haryana`,
    status: 'Paid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Doctorate of Philosophy (PhD) in Computer Engineering from NIT Kurukshetra, Haryana`,
    status: 'Paid',
  },
  {
    name: 'Business Package',
    price: 99.0,
    invoiceDate: `Doctorate of Philosophy (PhD) in Computer Engineering from NIT Kurukshetra, Haryana`,
    status: 'Unpaid',
  },
  {
    name: 'Standard Package',
    price: 59.0,
    invoiceDate: `Jan 13,2023`,
    status: 'Pending',
  },
];

const TableThree = ({Education}) => {
  console.log(Education);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-xl font-bold mb-4 text-black dark:text-white">Education</h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Year
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                University/College
              </th>
            </tr>
          </thead>
          <tbody>
            {Education.map((Edu, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {Edu.dateOfStart}-{Edu.dateOfEnd}
                  </h5>
                </td>
                <td className="text-center border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {Edu.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
