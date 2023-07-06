import React, { useEffect, useState } from 'react';
import TableList from '../component/TableList';
import { useDispatch,useSelector } from 'react-redux';
import { getAllStudent,createStudent } from '../services/adminServices';
import AlertNotif from '../component/AlertNotif';



const Students = () => {

  const dispatch=useDispatch()
  const{students} =useSelector(state=>state.students)
  const [loading,setLoading]=useState(false)
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");
  



const title = [ "num","name","email","level"];

const handleCreate=(values)=>{

  dispatch(createStudent(values)).then(res=>{
    if (res?.status === true) {
      setMessage("success ");
      setOpen(true);
      setType("success");
    }else if(res?.status === false){
      setMessage(res?.message);
      setOpen(true);
      setType("error");
    }
  })
}

  useEffect(()=>{
    setLoading(true)
    dispatch(getAllStudent()).then(res=> setLoading(false))
  },[dispatch])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <>
    {
    loading?(
      <p>loading ...</p>
    ):(
       
        (!students)?"something is wrong,try refreshing the page ":
       ( <>
        <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
        <TableList rows={students} title={title} path={"student"} handleCreate={handleCreate} />
        </>
       )
    )
    }
    </>
  );
};

export default Students;
