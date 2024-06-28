 <div>
            <label className="block    font-semibold ">
              Phases (comma-separated):
            </label>
            <input
              type="text"
              value={phases.join(", ")}
              onChange={handleArrayInput(setPhases)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Tools and Technologies (comma-separated):
            </label>
            <input
              type="text"
              value={toolsAndTechnologies.join(", ")}
              onChange={handleArrayInput(setToolsAndTechnologies)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>

          <div>
            <label className="block    font-semibold ">
              Required Resources (comma-separated):
            </label>
            <input
              type="text"
              value={requiredResources.join(", ")}
              onChange={handleArrayInput(setRequiredResources)}
              className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            />
          </div>



  {/* <div className="mt-4">
              <label className="block font-semibold ">Add payment terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Add billing timing</label>
              <input
                type="text"
                value={billingFrequency}
                onChange={(e) => setBillingFrequency(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div> */}






    <div>
      <div>
        <h2>Milestones List</h2>
        {milestones.length === 0 ? (
          <p>No milestones found.</p>
        ) : (
          <ul>
            {milestones.map((milestone) => (
              <li key={milestone._id}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
                <p>
                  Due Date: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className=" w-[80%] mx-auto mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row bg-slate-800 text-white font-bold py-1.5 px-4 rounded space-x-2">
            <span className="text-2xl">
              <LuMilestone />
            </span>
            <span className="">Milestones</span>
          </div>

          <div>
            <Link
              to={`../newMilestone/${projectId}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded"
            >
              New milestone
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 dark:bg-slate-600">
            <h3 className="text-lg font-bold mb-2">{/* {title} */}</h3>
            <p className="text-gray-700 mb-2">{/* {description} */}</p>
            <p>
              <strong>Due Date:</strong>
              {/* {dueDate} */}
            </p>
            <p>
              <strong>Project:</strong>
              {/* {projectReference} */}
            </p>
          </div>
        </div>
      </div>
    </div>
















    //new employee
export const newEmployee = async (req, res) => {
  // Fetch all the details from the request body
  const {
    firstName,
    lastName,
  gender,
    email,
    password,
    department,
    role,
    position,
    currentAddress,
    permanentAddress,
    bio,
    nationality,
    dateOfBirth,
    phoneNumber,
    onboardingDate,
    profilePicture 
  } = req.body;

  try {
    // Validation
    if (
      !employeeName ||
      !employeeEmail ||
      !employeePhoneNumber ||
      !password ||
      !designation ||
      !designationType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Encrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const isEmailExist = await User.findOne({ email: employeeEmail });
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }


    //convert the designation type into lowercase character
    const lowercaseDesignationType = designationType.toLowerCase();


    
      // Create an entry in the employee collection
      const employee = await Employee.create({
        employeeName,
        employeeEmail,
        password: hashPassword,
        gender,
        employeePhoneNumber,
        dateOfBirth,
        address,
        postOffice,
        policeStation,
        city,
        state,
        pinNumber,
        designation,
        designationType: lowercaseDesignationType,
        department,
      });

      
      // Create a user entry for authentication
      const user = await User.create({
        employeeId: employee._id,
        name: employeeName,
        email: employeeEmail,
        password: hashPassword,
        designation,
        designationType : lowercaseDesignationType,
      });


      return res.status(200).json({
        success: true,
        user,
        employee,
        message: "Account created successfully!",
      });
    
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Please check all the details",
    });
  }
};