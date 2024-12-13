
// app.post("/api/v1/domain", async (req, res) => {
//     const domainList = [
//         {
//           domain: "Software Development & Engineering",
//           subdomains: [
//             "Software Engineer",
//             "Software Developer",
//             "Game Developer",
//             "Front-End Developer",
//             "Back-End Developer",
//             "Full-Stack Developer",
//             "Mobile App Developer",
//             "Embedded Systems Engineer",
//             "UI/UX Designer",
//             "Web Designer",
//             "Software Tester",
//             "DevOps Engineer",
//             "Quality Assurance Engineer",
//             "Blockchain Developer",
//             "Programmer"
//           ]
//         },
//         {
//           domain: "AI & ML",
//           subdomains: [
//             "AI Engineer",
//             "ML Engineer",
//             "Data Scientist",
//             "Business Intelligence Analyst",
//             "Research Scientist"
//           ]
//         },
//         {
//           domain: "IT & System Management",
//           subdomains: [
//             "Computer Systems Manager",
//             "IT Project Manager",
//             "IT Sales Professional",
//             "IT Consultant",
//             "IT Support Specialist",
//             "Technical Support Engineer",
//             "Computer and Information Systems Manager",
//             "Technical Writer",
//             "Digital Marketing Specialist",
//             "CSE Teacher",
//             "IT Project Manager"
//           ]
//         },
//         {
//           domain: "Cyber Security & Network Management",
//           subdomains: [
//             "Cybersecurity Analyst",
//             "Network Engineer",
//             "Network Administrator",
//             "Computer Network Architect"
//           ]
//         },
//         {
//           domain: "Hardware and Systems Engineering",
//           subdomains: [
//             "Computer Hardware Engineer",
//             "Cloud Architect",
//             "Embedded Systems Analyst",
//             "Database Administrator",
//             "Embedded Systems Engineer"
//           ]
//         }
//       ];

//       // Function to insert all domain data into MongoDB
//       async function insertDomains() {
//         try {
//           await Domain.insertMany(domainList);
//           res.json({ success: true, message: 'Domains inserted successfully' });
//         } catch (error) {
//           console.error('Error inserting domains:', error);
//           res.status(500).json({ success: false, message: error.message });
//         }
//       }

//       // Call the function to insert data
//       insertDomains();
//     });

const Domain = require('../models/Domain');

exports.getDomains = async (req, res) => {
    // Retrieve domain from query parameters
    const domain = req.query.domain; // Change from req.params to req.query
    const modifiedString = domain.replace(/_/g, ' '); 

    console.log(modifiedString); // Log the modified domain for debugging

    try {
        // Find the domain in the database, ensuring the search is done on modifiedString
        const foundDomain = await Domain.findOne({ domain: modifiedString }); // Use modifiedString
        if (foundDomain) {
            res.json({ success: true, domain: foundDomain });
        } else {
            res.status(404).json({ success: false, message: 'Domain not found' });
        }
    } catch (error) {
        console.error('Error getting domains:', error);
        res.status(500).json({ success: false, message: 'Error while getting the domain' });
    }
};


