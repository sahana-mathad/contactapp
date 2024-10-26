import { useEffect, useRef, useState } from 'react';
import { Navigate, Route,Routes } from 'react-router-dom';
import { getContacts, saveContact, updatePhoto } from './api/ContactService';
import './App.css';
import Contact from './components/Contact';
import ContactList from './components/ContactList';
import Header from './components/Header';

function App() {
  const modalRef=useRef();
  const fileRef=useRef();
	const [ data, setData ] = useState({});
	const [ currentPage, setCurrentPage ] = useState(0);
  const [file,setFile] = useState(undefined);
  const [ values,setValues] = useState({
    name:'',
    email:'',
    phone:'',
    address:'',
    title:'',
    status:'',
  })


	const getAllContacts = async (page = 0, size = 10) => {
		try {
			setCurrentPage(page);
			const { data } = await getContacts(page, size);
			setData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllContacts();
	}, []);

 const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();  

//  (function toggleModal(show){
//         return show ? modalRef.current.showModal() : modalRef.current.close()
//  })();
 
  const onChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value});
  }

  // const handleNewContact =  (event) => {
  //   event.preventDefault();
  //   saveContact(values)
  //   .then((data)=>{
  //     const formData = new FormData();
  //     formData.append('file', file,file.name);
  //     formData.append('id', data.id);
      
  //     return updatePhoto(formData);
  //   })
  //   .then((response) =>{
  //     if(response&& response.data){
  //       const {data:photoUrl}=response;
  //     toggleModal(false);
  //     setFile(undefined);
  //     console.log("derefence",file);
  //     fileRef.current.value = null;
  //     setValues({
  //       name: '',
  //       email: '',
  //       phone: '',
  //       address: '',
  //       title: '',
  //       status: '',
  //     });
  //     getAllContacts();
  //   } else{
  //     console.log("no data",response);
  //   }
  //   }).catch((error) => {
  //     console.log(error);
  //     // toastError(error.message);
  //   });
  // }
    

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      console.log("Photo updation",photoUrl);
      // resetValues();
      // toggleModal(false);
      modalRef.current.close()
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })
      getAllContacts();
    } catch (error) {
      console.log(error.response);
     // toastError(error.message);
    }
  };

      
 




	return (
	<>
  <Header  toggleModal={toggleModal} nbOfContacts={data.totalElements}  />
  <main className="main">
    <div className="container">
 <Routes>
            <Route path='/' element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
  </Routes>
  </div>
   </main>

   <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={()=>toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>


  </>
	);
}

export default App;

