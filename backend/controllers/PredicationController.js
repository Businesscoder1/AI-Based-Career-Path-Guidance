const { PythonShell } = require('python-shell');
const User = require('../models/User'); // Assuming you're using a User model to manage user data
const Domain = require('../models/Domain'); // Assuming you have a Domain model to manage domains and subdomains

exports.predict = async (req, res) => {
    const userData = req.body; 
    const email = userData.email;
    console.log("User Data", email);

    // Formatting the input data
    const formattedData = {
        "Python": userData.assessment3.ratings.Python || 0,
        "Java": userData.assessment3.ratings.Java || 0,
        "C++": userData.assessment3.ratings['C++'] || 0,
        "JavaScript": userData.assessment3.ratings.JavaScript || 0,
        "C#": userData.assessment3.ratings['C#'] || 0,
        "PHP": userData.assessment3.ratings.PHP || 0,
        "Ruby": userData.assessment3.ratings.Ruby || 0,
        "Swift": userData.assessment3.ratings.Swift || 0,
        "Go": userData.assessment3.ratings.Go || 0,
        "Rust": userData.assessment3.ratings.Rust || 0,
        "Others": userData.assessment3.ratings.Others || 0,
        "Software_Development_Experience": userData.assessment1.internship === 'yes' ? 2 : 0,
        "Database_Management": userData.assessment3.ratings.Interest_In_Database_Management || 0,
        "Networking_Skills": userData.assessment3.ratings.Interest_In_Networking_Skills || 0,
        "Web_Development_Experience": userData.assessment3.ratings.Interest_In_WebDevelopment || 0,
        "Communication_Skills": userData.assessment2.skillRatings['Communication Skills'] || 0,
        "Problem_Solving_Abilities": userData.assessment2.skillRatings['Problem Solving'] || 0,
        "Teamwork_Collaboration": userData.assessment2.skillRatings.Teamwork || 0,
        "Time_Management": userData.assessment2.skillRatings['Time Management'] || 0,
        "Adaptability": userData.assessment2.skillRatings.Adaptability || 0,
        "GPA": parseFloat(userData.assessment1.cgpa) || 0,
        "Coursework_Completion_Status": userData.assessment1.courseStatus || "Not Specified",
        "Academic_Achievements": userData.assessment1.academicAchievement || "Not Specified",
        "Personal_Interests": userData.assessment1.personalInterest || "Not Specified",
        "Internship_Experience": userData.assessment1.internship || "No",
        "Certifications_Training": userData.assessment1.certificates || "No",
        "Leadership_Experience": userData.assessment1.leadership || "No"
    };

    try {
        let pyshell = new PythonShell('./controllers/Predict.py');

        // Send formatted data to the Python script
        pyshell.send(JSON.stringify(formattedData));

        // Handle response from Python script
        pyshell.on('message', async function (message) {
            console.log('Python message:', message);

            // Assuming `message` contains the recommendation
            const recommendation = message; // Assuming `message` directly contains the recommendation string

            try {
                // Fetch the subdomain using the recommendation (domain name)
                const domainName = recommendation.replace(/_/g, ' '); // In case of underscore, replace with space
                const foundDomain = await Domain.findOne({ domain: domainName });

                if (!foundDomain) {
                    return res.status(404).json({
                        success: false,
                        message: 'Domain not found'
                    });
                }

                // Update the user profile using their email
                await User.findOneAndUpdate(
                    { email }, // Find the user by email
                    { isRecommended: true, recomendation: domainName }, // Update fields
                    { new: true } // Return the updated document
                );

                // Send the prediction result along with the domain and subdomain information to the frontend
                return res.status(200).json({
                    success: true,
                    message: "Prediction successful",
                    prediction: recommendation,
                    domain: foundDomain // Include the domain and subdomain info
                });

            } catch (updateError) {
                console.error('Error updating user or fetching domain:', updateError);
                return res.status(500).json({
                    success: false,
                    message: "Failed to update user recommendation or fetch domain",
                    error: updateError.message
                });
            }
        });

        // Handle Python script errors
        pyshell.on('error', (error) => {
            console.error('Python error:', error);
            return res.status(500).json({
                success: false,
                message: "Prediction failed",
                error: error.message
            });
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
