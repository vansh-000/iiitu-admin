const TableAwards = ({ Award, setAward }) => {
  const handleEdit = (index, value) => {
    const updatedAward = [...Award];
    updatedAward[index] = value;
    setAward(updatedAward);
  };

  const handleAddAward = (e) => {
    e.preventDefault();
    setAward([...Award, ""]);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Awards and Honours
              </th>
            </tr>
          </thead>
          <tbody>
            {Award.map((awd, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    
                      <input
                        type="text"
                        value={awd}
                        placeholder='Awards and Honours'
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => handleEdit(index, e.target.value)}
                      />
                    
                    
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
          <button onClick={handleAddAward}>Add Award</button>
        
      </div>
    </div>
  );
};

export default TableAwards;