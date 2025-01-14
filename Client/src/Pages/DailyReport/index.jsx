import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DailyReport() {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/layout/dashboard");
  };

  const [showAllEmployee, setShowAllEmployee] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [fewSelect, setFewSelect] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const fetchAllEmployeeNameWithId = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/showAllEmployee");
      setShowAllEmployee(response.data.data);
      setFilteredEmployees(response.data.data);
    } catch (error) {
      console.log("Enable to fetch Employee Name With Id", error);
    }
  };

  const handleSearch = (query) => {
    const filtered = showAllEmployee.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.employeeCode.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedEmployees(filteredEmployees.map((emp) => emp._id));
    } else {
      setSelectedEmployees([]);
    }
    setSelectAll(!selectAll);
    setFewSelect(false);
  };

  const handleFewSelect = () => {
    setSelectAll(false);
    setFewSelect(!fewSelect);
    if (!fewSelect) {
      setSelectedEmployees([]);
    }
  };

  const toggleEmployeeSelection = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((empId) => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  useEffect(() => {
    fetchAllEmployeeNameWithId();
  }, []);

  return (
    <div className="pr-4">
      <div className="flex flex-col items-center justify-center border-4 mt-5 h-full w-full ml-2 rounded-md" style={{ borderColor: "#740FD6" }} >
        <div className="bgMainColor w-2/3 text-center -m-3 ml-2 rounded-md">
          <h6 className="text-white font-semibold text-xl">Daily Report</h6>
        </div>

        {/* Top Section */}
        <div className="w-full mt-6 flex flex-row justify-end ">
          {/* Report Date */}
          <div className="w-1/2">
            <div className="flex flex-col ml-8 mt-4 mr-96">
              <label>Report Date</label>
              <input
                type="date"
                className="w-full rounded-md border py-2 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Selection Section */}
          <div className="w-1/2">
            <h3 className="font-semibold text-lg ml-4">Selection By</h3>
            <div className="flex flex-col">
              <div className="flex items-center ml-4 gap-1">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                <label>All Employee</label>
              </div>
              <div className="flex items-center ml-4 gap-1">
                <input type="checkbox" checked={fewSelect} onChange={handleFewSelect} />
                <label>Few Employee</label>
              </div>

              {/* Search Bar */}
              <div className="w-full relative mt-4 pl-4 pr-12">
                <span className="absolute mt-3 left-6 flex items-center text-gray-500"> <IoSearchOutline size={20} /> </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-md border py-2 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                {/* Employee Table */}
                <div className="w-full border border-gray-600">
                  <table className="table-auto w-full border-collapse border border-gray-500">
                    <thead className="border border-gray-500 sticky top-0 bg-white z-2">
                      <tr>
                        <th className="text-blue-600/100 border border-gray-500 w-20">Select</th>
                        <th className="text-blue-600/100 border border-gray-500">Employee</th>
                      </tr>
                    </thead>
                  </table>

                  <div className="max-h-[350px] overflow-y-auto">
                    <table className="table-auto w-full border-collapse border border-gray-500">
                      <tbody>
                        {filteredEmployees.map(({ _id, name, employeeCode }) => (
                          <tr key={_id}>
                            <td className="border border-gray-300 w-20 text-center items-center align-middle h-8" style={{ width: "max-width" }} >
                              <input
                                type="checkbox"
                                checked={selectedEmployees.includes(_id)}
                                onChange={() => toggleEmployeeSelection(_id)}
                                disabled={!fewSelect && !selectAll}
                              />
                            </td>
                            <td className="border border-gray pl-4">{name}({employeeCode})</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* all check box  Section */}
        <div className="flex ml-8 justify-between w-full mr-8 mt-4">
          <div className="ml-8 gap-1 flex">
            <input type="checkbox" />
            <label>Absent Report</label>
          </div>

          <div className="gap-1 flex">
            <input type="checkbox" />
            <label>Present Report</label>
          </div>

          <div className="mr-12 flex gap-1">
            <input type="checkbox" />
            <label>Mis-Punch Report</label>
          </div>
        </div>

        {/* button part  */}
        <div className="mt-6 flex gap-6 mb-2">
          <button  className="font-semibold mr-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show Report</button>
          <button onClick={handleCloseClick}  className="font-semibold  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">Close</button>
        </div>

      </div>
    </div>
  );
}

export default DailyReport;
