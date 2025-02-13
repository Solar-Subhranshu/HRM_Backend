import React from 'react'
import { useEffect } from 'react'
import { showDepartment } from '../../Utils/Api/ShowDepartment'
import { showDesignation } from '../../Utils/Api/ShowDesignation'
import { showCompany } from '../../Utils/Api/ShowCompany'
import { useState } from 'react'

function Index() {

    const [showDepartmentList, setShowDepartmentList]=useState([]);
    const [showDesignationList, setShowDeginationList]=useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
    const [showCompanyList, setShowCompanyList]=useState([]);

    const [formData, setFormData]=useState({
        // formId,
        companyId : "",
        department: "",
        designation : "",
        joiningDate: "",
        employeeType : "",
        interviewDate: " ",
        modeOfRecruitment :"",
        reference : "",
        ctc : "",
        inHand :"",
        employeeESI: "",
        employeePF:"",
        employerESI:"",
        employerPF :"",
    })

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('my form data is ', formData)
            const response = await axios.patch(
                'http://localhost:8000/auth/approve-joiningForm',
                formData,
                { withCredentials: true }
            );

            console.log("my formdata is ", formData)
            console.log("Form submitted successfully", response.data);
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };
  

    
    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    useEffect(()=>{
        showCompany(setShowCompanyList)
    }, [])

    useEffect(()=>{
        showDepartment(setShowDepartmentList);
    },[]);

    useEffect(()=>{
        if (selectedDepartmentId) showDesignation(setShowDeginationList, selectedDepartmentId);
    }, [selectedDepartmentId])

  return (
    <>
    <div className='p-2'>
        <div  className='py-1 rounded-md bgMainColor mt-4 shadow-xl'>
            <h1 className='text-center text-white font-bold text-xl'>Joining Details</h1>
        </div>
        <div >
            <form>
                <div className='grid grid-cols-4 gap-4'>
                    {/* company name field  */}
                    <div className="flex flex-col">
                        <label>Company Name</label>
                        <select 
                        name="companyId"
                        value={formData.companyId || ""}
                        onChange={handleFormData}
                        className="border border-gray-500 rounded-md  py-2 px-4 "
                        >
                        <option>---Select Company Name--- </option>
                        {showCompanyList?.map(({name, _id})=>(
                            <option key={_id} value={_id}>{name}</option>
                        ))}
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label>Interview Date</label>
                        <input type='date' 
                            name='interviewDate'
                            value={formData.interviewDate}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    <div className='flex flex-col'>
                        <label>Joining Date</label>
                        <input 
                            type='date' 
                            name='joiningDate'
                            value={formData.joiningDate}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    <div className='flex flex-col'>
                        <label>Official Contact</label>
                        <input 
                            type='text' 
                            name='' 
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Official Email</label>
                        <input 
                            type='email' 
                            name='' 
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* department field    */}
                    <div className="flex flex-col">
                        <label>Department</label>
                        <select 
                        name="department"
                        onChange={(e) => {
                            handleFormData(e);
                            setSelectedDepartmentId(e.target.value);
                        }}
                         className='border border-gray-500 px-4 py-2 rounded-md'
                        >
                        <option value=''>--Select Department --</option>
                        {showDepartmentList?.map(({ empdept, id }) => (
                        <option key={id} value={id}>{empdept}</option>
                        ))}
                        </select>
                    </div>
                        
                    {/* designation field  */}
                    <div className="flex flex-col">
                        <label>Designation</label>
                        <select 
                        name="designation"
                        onChange={(event) => {
                            const { name, value} = event.target;
                            console.log("name", name, "value", value);
                            setFormData((prev) => ({ ...prev, [name] : value}))
                        }}
                        className='border border-gray-500 px-4 py-2 rounded-md'>
                        {showDesignationList?.map(({designation, _id})=>(
                        <option key={_id} value={_id}>{designation}</option>
                        ))}
                        </select>
                    </div>
                    
                    {/* employee type  */}
                    <div className='flex flex-col'>
                        <label>Employee Type</label>
                        <input 
                            type='text' 
                            name='employeeType' 
                            value={formData.employeeType}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* Recruitment mode  */}
                    <div className='flex flex-col'>
                        <label>Recruitment Mode </label>
                        <input 
                            type='text' 
                            name='modeOfRecruitment' 
                            value={formData.modeOfRecruitment}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    {/* reference ny input field  */}
                    <div className='flex flex-col'>
                        <label>Reference By</label>
                        <input 
                            type='text' 
                            name='reference' 
                            value={formData.reference}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>

                    
                </div>
                
                <div className='py-1 rounded-md bgMainColor mt-4 shadow-xl'>
                   <h2 className='text-center  text-white text-xl font-bold'>Salary Break Down </h2>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                    <div className='flex flex-col'>
                        <label>CTC </label>
                        <input 
                            type='text' 
                            name='ctc' 
                            value={formData.ctc}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Inhand Salary</label>
                        <input 
                            type='text' 
                            name='inHand' 
                            value={formData.inHand}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employee PF </label>
                        <input 
                            type='text' 
                            name='employeePF' 
                            value={formData.employeePF}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employee ESI</label>
                        <input type='text'
                         name='employeeESI'
                         value={formData.employeeESI}
                         onChange={handleFormData}
                         className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employer PF </label>
                        <input 
                           type='text' 
                           name='employerPF' 
                           value={formData.employerPF}
                           onChange={handleFormData}
                           className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label>Employer ESI</label>
                        <input 
                            type='text' 
                            name='employerESI' 
                            value={formData.employerESI}
                            onChange={handleFormData}
                            className='border border-gray-500 px-4 py-2 rounded-md' />
                    </div>
                </div>

                <div className='mt-4'>
                    <button onClick={handleSubmit} className='py-2 px-4 bg-red-500 rounded-md text-white font-semibold'>Submit</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Index






