import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";


function getCachedUid() {
  return localStorage.getItem("u_id"); // Retrieve u_id from local storage
}
function ModalProject({ show, handleClose, handleSave, projectId, projectData}) {
  const cachedUid = getCachedUid(); // Now retrieves u_id from local storage

  const [formData, setFormData] = useState({
    u_id: cachedUid || "", // Ensure u_id is set from local storage
    name: "",
    desc: "",
    start_date: "",
    end_date: "",
    link: "",
    skills: ""
  });

  useEffect(() => {
    console.log("project data",projectData,projectId)
    if (projectId && projectData) {
      setFormData(projectData); // Populate form with existing data
    }else{                      //extra else
        setFormData((prev)=>({
          ...prev,
          u_id: cachedUid || "", // Ensure u_id is set from local storage

        }))
    }
  }, [projectId, projectData, cachedUid]);


  // function convertToFormData(data) {               
  //   const formData = new FormData();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       formData.append(key, data[key]);
  //     }
  //   }
  //   // To see the contents of formData+
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }
  //   return formData;
  // }

  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = () => {
  //   handleSave(formData); // Pass form data to the parent component
  //   handleClose(); // Close the modal
  // };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   setError("");

  //   console.log("Form Data before submission:", formData); // Debugging log
  //   const formDataObject = convertToFormData(formData);
  //   try {
  //     handleSave(formData); // Save the data locally
  //     handleClose();
  //     const response = await axios.post(
  //       "https://aitq-api-t4yr74gyka-uc.a.run.app/projects/add",
  //       formDataObject,
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       handleSave(formData); // Save the data locally
  //       handleClose(); // Close the modal
  //     } else {
  //       setError("Failed to save education details.");
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data && error.response.data.error) {
  //       setError(error.response.data.error);
  //     } else {
  //       setError("An error occurred while saving education details.");
  //     }
  //     console.error("Request failed:", error.config);
  //     console.error("Response data:", error.response?.data);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    console.log(formData);
      try {  
      const method = projectId ? "PUT" : "POST";
      const url="https://api.server.aitalentquest.com/projects";
      console.log("here data",{
        u_id: cachedUid || "", // Ensure u_id is set from local storage
        // u_id: formData.u_id,
        id: projectId || undefined, // Include ID for updates
        name:formData.name,
        desc:formData.desc,
        start_date:formData.start_date,
        end_date:formData.end_date,
        link:formData.link,
        skills:formData.skills,
    })        
      const response=await axios({
        method,
        url,
        data: {
          u_id: cachedUid || "", // Ensure u_id is set from local storage
          // u_id: formData.u_id,
          id: projectId || undefined, // Include ID for updates
          name:formData.name,
          desc:formData.desc,
          start_date:formData.start_date,
          end_date:formData.end_date,
          link:formData.link,
          skills:formData.skills,
      },

      headers: {
        "Content-Type": "application/json", // Updated content type
    }
      })

      if (response) {
        console.log("responce",response);
        console.log(response.data);
        handleSave(formData, projectId); // Pass the updated data to the parent
        handleClose(); // Close the modal
      } else {
        throw new Error("Failed to save project details.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      console.log("ERER",error.message);
    }
  };
                                                                                //uid
      // const formDataObject = convertToFormData({...formData,u_id: localStorage.getItem("u_id")});
      //const method = ProjectId ? "PUT" : "POST"; // Determine method based on presence of projectId
      // const url = `https://api.server.aitalentquest.com/projects${ProjectId ? 'update' : 'add'}`;
              
      // const response = await axios({
      //   method,
      //   url,
      //   data: formDataObject,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Project Detail</Modal.Title> */}
          <Modal.Title>{projectId ? "Edit Project" : "Add Project"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {error && <p className="text-danger">{error}</p>} */}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="u_id"
                placeholder="User ID"
                value={formData.u_id}
                readOnly
              />
            </Form.Group>
           

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Links</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer> */}
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {projectId ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
      </Modal>
      {/* </Modal> */}
    </>
  );
}

export default ModalProject;





// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import axios from "axios";

// function getCachedEmail() {
//   return localStorage.getItem("email"); // Replace with actual cache retrieval logic
// }

// function ModalProject({ show, handleClose, handleSave, ProjectTitle, ProjectData }) {
//   const cachedEmail = getCachedEmail();
//   const [formData, setFormData] = useState({
//     email: cachedEmail || "", // Make sure this is not empty
//     project_title: "",
//     description: "",
//     technology_used: "",
//     project_link: "",
//   });
//   const [newTitle, setNewTitle] = useState();

//   useEffect(() => {
//     console.log("project data", ProjectData, ProjectTitle);
//     if (ProjectTitle && ProjectData) {
//       setFormData(ProjectData); // Populate form with existing data
//     } else {
//       // Reset form if no ProjectTitle is provided (i.e., adding a new project)
//       setFormData({
//         email: cachedEmail || "",
//         project_title: "",
//         description: "",
//         technology_used: "",
//         project_link: "",
//       });
//     }
//   }, [ProjectTitle, ProjectData, cachedEmail]);

//   function convertToFormData(data) {
//     const formData = new FormData();
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         formData.append(key, data[key]);
//       }
//     }
//     // To see the contents of formData
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }
//     return formData;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       const formDataObject = ProjectTitle ? convertToFormData({
//         email: email, 
//         description: formData.description,
//         technology_used: formData.technology_used,
//         project_link: formData.project_link,
//         project_title_old:ProjectTitle,
//         project_title_new: newTitle
//       }) 
//         : convertToFormData({ ...formData, email: email });
//       const method = ProjectTitle ? "PUT" : "POST"; // Determine method based on presence of ProjectTitle
//       const url = `https://aitq-api-t4yr74gyka-uc.a.run.app/projects/${ProjectTitle ? 'update' : 'add'}`;

//       const response = await axios({
//         method,
//         url,
//         data: formDataObject,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });

//       console.log("API Response:", response);
//       if(ProjectTitle && response.status === 200){
//         handleSave(); // Pass the updated data to the parent
//         handleClose(); // Close the modal
//       }
//       else if ( response.status === 201) {
//         handleSave(); // Pass the updated data to the parent

//         handleClose(); // Close the modal
//       } else {
//         throw new Error("Failed to save project details.");
//       }
//     } catch (error) {
//       console.error("Request failed:", error);
//       // Optionally, handle error state here (e.g., display an error message to the user)
//     }
//   };

//   return (
//     <>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{ProjectTitle ? "Edit Project" : "Add Project"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 readOnly
//               />
//             </Form.Group>
//             {ProjectTitle ? <>
//               <Form.Group className="mb-3" controlId="formProjectTitle">
//                 <Form.Label>Old Project Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="project_title_old"
//                   value={ProjectTitle}
//                   readOnly
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formProjectTitle">
//                 <Form.Label>New Project Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="project_title_new"
//                   value={newTitle}
//                   onChange={(e)=>{ setNewTitle(e.target.value)}}
//                   autoFocus
//                   placeholder="Enter project title"
//                 />
//               </Form.Group>
//             </>
//               :
//               <Form.Group className="mb-3" controlId="formProjectTitle">
//                 <Form.Label> Project Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="project_title"
//                   value={formData.project_title}
//                   onChange={handleChange}
//                   autoFocus
//                   placeholder="Enter project title"
//                 />
//               </Form.Group>}




//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Enter project description"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formTechnologyUsed">
//               <Form.Label>Technology Used</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="technology_used"
//                 value={formData.technology_used}
//                 onChange={handleChange}
//                 placeholder="Enter technologies used"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formProjectLink">
//               <Form.Label>Project Link</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="project_link"
//                 value={formData.project_link}
//                 onChange={handleChange}
//                 placeholder="Enter project link"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             {ProjectTitle ? "Update" : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default ModalProject;

