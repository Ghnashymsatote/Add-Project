import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FiEdit2, FiTrash2} from "react-icons/fi";
import { Button } from "react-bootstrap";
import ModalProject from "./ModalProject";
import axios from "axios";

// function getCachedU_id() {
//   return localStorage.getItem("u_id");
// }

function ProjectDetails() {
  const [showModal, setShowModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  // const cachedU_id = getCachedU_id();
  const handleShow = (id = null, data = null) => {
    setEditingId(id);
    setEditingData(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setEditingId(null);
    setEditingData(null);
    setShowModal(false);
  };

  const handleSave = (formData, id) => {
    getProject();
  };


  useEffect(() => {
    const u_id = localStorage.getItem("u_id");
    if (u_id && u_id !== "undefined") {
      getProject();
    }
  }, []);


  const getProject= () => {
    const u_id = localStorage.getItem("u_id");
    axios
      .get(`https://api.server.aitalentquest.com/projects?u_id=${u_id}`)
      .then((response) => {
        setProjectDetails(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
 

   //delete method--
   const handleDelete = (id) => {
    const u_id=localStorage.getItem("u_id");
   
     axios.delete(`https://api.server.aitalentquest.com/projects`,{
        data:{
          u_id:u_id,
          id:id
        }})
     .then((response)=>{
      console.log("Delete successful:", response.data);
      getProject();
     }).catch((error) => {
      console.error("There was an error deleting the education record!", error);
    });
    
    
  }

  // const fg= useEffect(() => {
  //     const fetchProject = async ()=>{
  //       try{
  //             const response=await axios.get(`https://api.server.aitalentquest.com/projects?u_id=${cachedU_id}`)
  //             if (response.status === 200) {
  //                 setProjectDetails(response.data);
  //             }
  //       }catch(error){
  //           console.log("Error fetching experience details:", error.response?.data || error.message);
  //       }
  //     };
  //     fetchProject();
  //   }, []);
  // const handleShow = () => setShowModal(true);

  // const handleClose = () => setShowModal(false);


  // const handleSave = (formData) => {
  //   setEducationDetails([...educationDetails, formData]); // Add new education detail to the list
  // };

  // const handleSave = (project) => {
  //   setProjectDetails((pre)=>[...pre,project])
    // if (id) {
    //   // Update existing record
    //   setProjectDetails((prevDetails) =>
    //     prevDetails.map((detail) => (detail.id === id ? formData : detail))
    //   );
    // } else {
    //   // Add new record
    //   setProjectDetails([...projectDetails, formData]);
    // }
  // };

//convert into raw data se formdata
  // function convertToFormData(data) {
  //   const formData = new FormData();
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       formData.append(key, data[key]);
  //     }
  //   }
    // To see the contents of formData
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }
  //   return formData;
  // }

 


  return (
    <>
      <Container className="m-5">
        <Row>
          {/* <Col sm={3}></Col> */}
          <Col sm={9}>
            <Row>
              <Col sm={9}>
                <h5>Project Details</h5>
              </Col>
              <Col sm={3}>
                <Button
                  onClick={()=>handleShow()}
                  style={{ cursor: "pointer" }}
                  type="submit"
                  variant="outline-secondary"
                >
                  Add Project
                </Button>
                {/* <span onClick={handleShow} style={{ cursor: "pointer" }}>
                  <FiEdit2 />
                </span> */}
              </Col>
            </Row>

            <Row>
              {projectDetails.map((project) => (
                <Col sm={12} key={project.id}  className="mt-3">
                  <div className="p-3 border rounded">
                    {/* <p>
                      <strong>Email:</strong> {detail.email}
                    </p> */}
                    <p>
                      <strong>Project ID:</strong> {project.id}

                    </p>
                      <p>
                        <strong>Name:</strong>{project.name}
                      </p>
                      <p>
                        <strong>Description :</strong>{project.desc}
                      </p>
                      <p>
                        <strong>Start Date :</strong>{project.start_date}
                      </p>
                      <p>
                        <strong>End Date :</strong>{project.end_date}
                      </p>
                      <p>
                        <strong>Link :</strong>{project.link}
                      </p>
                      <p>
                        <strong>Skills :</strong>{project.skills}
                      </p>
              
                    
                      
                    
                    <Button onClick={() => handleShow(project.id, project)}><FiEdit2 /></Button>
                    <Button 
                        onClick={() => handleDelete(project.id)} 
                        variant="danger" 
                        className="ml-2">
                      <FiTrash2 />
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <ModalProject
        show={showModal}
        handleClose={handleClose}
        handleSave={handleSave}
        projectId={editingId}
        projectData={editingData}
      />
    </>
  );
}

export default ProjectDetails;



// import React, { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import { Button } from "react-bootstrap";
// import ModalProject from "./ModalProject";
// import axios from "axios";

// function ProjectDetails() {
//   const [showModal, setShowModal] = useState(false);
//   const [projectDetails, setProjectDetails] = useState([]);
//   const [editingTitle, setEditingTitle] = useState(null);
//   const [editingData, setEditingData] = useState(null);

//   const handleShow = (title = null, data = null) => {
//     console.log("set state" ,title)
//     setEditingTitle(title);
//     setEditingData(data);
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setEditingTitle(null);
//     setEditingData(null);
//     setShowModal(false);
//   };

//   const handleSave = () => {
//     getDetailFunction();
//   };

//   function convertToFormData(data) {
//     const formData = new FormData();
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         formData.append(key, data[key]);
//       }
//     }
//     return formData;
//   }

//   const handleDelete = (title) => {
//     const email_address = localStorage.getItem("email");
//     const formDataObject = convertToFormData({ project_title: title, email: email_address });
    
//     if (email_address && email_address !== "undefined") {
//       axios
//         .delete(`https://aitq-api-t4yr74gyka-uc.a.run.app/projects/delete`, {
//           data: formDataObject
//         })
//         .then(() => {
//           getDetailFunction();
//         })
//         .catch((error) => {
//           console.error("There was an error deleting the project!", error);
//         });
//     } else {
//       console.error("Email address is not available in local storage.");
//     }
//   };

//   useEffect(() => {
//     getDetailFunction();
//   }, []);

//   const getDetailFunction = () => {
//     const email_address = localStorage.getItem("email");
//     if (email_address && email_address !== "undefined") {
//       axios
//         .get(`https://aitq-api-t4yr74gyka-uc.a.run.app/projects/get?email=${email_address}`)
//         .then((response) => {
//           setProjectDetails(response.data);
//         })
//         .catch((error) => {
//           console.error("There was an error fetching the data!", error);
//         });
//     }
//   };

//   return (
//     <>
//       <Container className="m-5">
//         <Row>
//           <Col sm={9}>
//             <Row>
//               <Col sm={9}>
//                 <h5>Project Details</h5>
//               </Col>
//               <Col sm={3}>
//                 <Button onClick={() => handleShow()} style={{ cursor: "pointer" }} type="submit" variant="outline-secondary">
//                   Add Project
//                 </Button>
//               </Col>
//             </Row>
//             <Row>
//               {projectDetails.map((detail) => (
//                 <Col sm={12} key={detail.project_title} className="mt-3">
//                   <div className="p-3 border rounded">
//                     <p>
//                       <strong>Project Title:</strong> {detail.project_title}
//                     </p>
//                     <p>
//                       <strong>Description:</strong> {detail.description}
//                     </p>
//                     <p>
//                       <strong>Technology Used:</strong> {detail.technology_used}
//                     </p>
//                     <p>
//                       <strong>Project Link:</strong> {detail.project_link}
//                     </p>
//                     <Button onClick={() => handleShow(detail.project_title, detail)}><FiEdit2 /></Button>
//                     <Button onClick={() => handleDelete(detail.project_title)} variant="danger" className="ml-2">
//                       <FiTrash2 />
//                     </Button>
//                   </div>
//                 </Col>
//               ))}
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//       <ModalProject
//         show={showModal}
//         handleClose={handleClose}
//         handleSave={handleSave}
//         ProjectTitle={editingTitle}
//         ProjectData={editingData}
//       />
//     </>
//   );
// }

// export default ProjectDetails;

