import React , { useEffect, useState } from 'react'
import TableList from '../component/TableList';
import { useDispatch,useSelector } from 'react-redux';
import { createProf, getAllProf } from '../services/adminServices';
import AlertNotif from '../component/AlertNotif';

function Professeurs() {
  
  const dispatch=useDispatch()
  const{professeurs} =useSelector(state=>state.professeurs)
  const [loading,setLoading]=useState(false)
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");
    
      const title = [ "id","name","email","level"];

      const handleCreate=(values)=>{
        values.password="123456"
        values.role="PROFESSEUR"
        dispatch(createProf(values)).then(res=>{
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
        dispatch(getAllProf()).then(res=> setLoading(false))
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
           
          (!professeurs)?"something is wrong,try refreshing the page ":( <>
            <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
            <TableList rows={professeurs} title={title} path={"professeur"} handleCreate={handleCreate} />
            </>
           )

            
        )
        }
        </>
      );
  
}

export default Professeurs
