const User = require('../models/User');
const CareerPath = require('../models/CareerPath');
const Module = require('../models/Module');
const { extractUserId } = require('../middleware/extractUserId');



// Route to get modules
exports.myModules = async (req, res) => {
    try {
      // Extract userId from the request object (set by the middleware)
      const userId = req.userId;
  
      // Find the user in the database and populate their career path
      const user = await User.findById(userId).populate({
        path: 'careerPath',  // Populate the careerPath field
      });
  
      if (!user || !user.careerPath) {
        return res.status(404).json({ message: 'User or career path not found' });
      }
      // Extract the `modules` array from the user's career path
      const careerPath = user.careerPath;
      const moduleUniqueCodes = careerPath.modules; // An array of uniqueCode strings
     
      // Fetch the modules based on uniqueCode values
      const modulesWithDetails = await Module.find({
          uniqueCode: { $in: moduleUniqueCodes }  // Match modules by uniqueCode
        });
  
      // Return the modules associated with the user's career path
      res.json(modulesWithDetails);
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.courseContent = async (req, res) => {
    try {
        const uniqueCode = req.params.uniqueCode; // Extract the uniqueCode from request parameters
        console.log(uniqueCode);

        // Fetch the module details with the given uniqueCode
        const moduleDetails = await Module.findOne({ uniqueCode });

        if (!moduleDetails) {
            return res.status(404).json({ message: 'Module not found' });
        }
console.log(moduleDetails)
        res.status(200).json(moduleDetails);
    } catch (error) {
        console.error('Error fetching module details:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
  
  
  
  
