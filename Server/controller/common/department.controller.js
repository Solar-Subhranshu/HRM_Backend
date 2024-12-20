const Department = require ("../../models/auth/common/department.model")


const showAllDepts = async(req,res) => {
    try {
        // show all departments except for Admin.
        const allDepts= await Department.find({ department: { $ne: "Admin" } });
        if (allDepts.length===0 || allDepts==null){
            return res.status(200).json({
                success : true,
                message : "No Departments Found, Please Add Department First."
            });
        }
        else{
            const deptNames =allDepts.map(dept => ({
                id: dept._id,
                empdept : dept.department
            }));
            return res.status(200).json({
                success : true,
                message :"Department List.",
                data : deptNames
        });
        }
    }
    catch(error) {

    return res.status(500).json({
        success :false,
        message: "Internal Server Error! Couldn't show Departments. ",
        error: error.message
    });        
    }
};

const addDept = async (req,res) => {
    try{
        const employeeId = req.employeeId;
        
        const {dept} = req.body || req.query;
        // console.log(dept);
        // const employeeId = req.employeeId;
       
        if(!dept){
            return res.status(400).json({
                success : false,
                message : "Field can't be empty"
            });
        }

        const deptExists = await Department.findOne({department :dept});
        if(deptExists){
            return res.status(400).json({
                success : false,
                message : "Department Already Exists"
            });
        }

        const newDept = new Department({
            department : dept,
            created_By : employeeId
        })
        const responseData = await newDept.save();
        if(responseData){
            return res.status(201).json({
                success:true,
                message:"Department insert successfully."
            })
        }
        return res.status(400).json({
            success:false,
            message:"something is wrong."
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : "Internal Server Error! Couldn't Add Department",
            error : error.message
        })
    }
};

const updateDept = async (req,res) => {
    try{
    const employeeId = req.employeeId;

    const {deptId,deptName} = req.body || req.query;
    // console.log(deptId,deptName);
  
        // we are assuming that always a valid deptId is passed 

    if(!deptId || !deptName){
        return res.status(400).json({
            success : false,
            message : "Fields can't be empty. "
        });
    }

    const deptExists = await Department.findOne({department :deptName});
    if(deptExists){
        return res.status(400).json({
            success : false,
            message : "Department Already Exists"
        });
    }

    const updatedDept = await Department.findByIdAndUpdate(deptId,
        {department :deptName},
        {updated_By : employeeId},
        {new: true}
    );

    if(!updatedDept){
        return res.status(400).json({
            success: false,
            message : "Department Updation Failed!, Try after few seconds!"
        });
    }

    return res.status(200).json({
        success : true,
        message : "Department Updation Successful !"
    });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal Server Error, Couldn't update department.",
        error : error.message
    })
}

}

module.exports = {
    showAllDepts,
    addDept,
    updateDept
}