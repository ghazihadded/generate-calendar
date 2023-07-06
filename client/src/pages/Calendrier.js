import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createAllGroueClass,deleteAllGroueClass,getAllGroueClass } from "../services/adminServices";
import AlertNotif from "../component/AlertNotif";

const Calendrier = () => {
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type,setType]=useState(null)
  const dispatch = useDispatch();
  const { groupeClasse } = useSelector((state) => state.groupeClasses);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "8h-9h",
    "9h-10h",
    "10h-11h",
    "11h-12h",
    "12h-13h",
    "13h-14h",
    "14h-15h",
    "15h-16h",
    "16h-17h",
  ];


  useEffect(()=>{
    setLoading(true)
   dispatch(getAllGroueClass()).then(r=>{
    setLoading(false)
   })
  },[dispatch])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getScheduleData = (day, timeSlot) => {
    const filteredData = groupeClasse?.find(
      (item) => item?.day === day && item?.time === timeSlot
    );
    return filteredData ? (
      <>
      <p>{`group-${filteredData?.groupe?.number}`}</p>
      <p>{filteredData?.classRoom?.title}</p>
      </>
    ) : "";
  };

  const create = () => {
    setLoadingCreate(true);
    dispatch(createAllGroueClass()).then((res) => {
      setLoadingCreate(false);
    });
  };

  const onDelete=()=>{
    dispatch(deleteAllGroueClass()).then(res=>{
      console.log(res)
      if(res===false){
        setMessage("failed delete")
        setOpen(true);
        setType("error")
      }
    })
  }

  console.log(groupeClasse)

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
        <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
          <Box display="flex" justifyContent="center" marginTop="2rem">
            {groupeClasse && groupeClasse?.length===0?
             <Button variant="contained" color="primary" onClick={create} style={{ marginRight: '1rem' }}>
             Generate Calendar
           </Button>
           :
           <Button variant="contained" color="primary" onClick={onDelete}>
           Delete Calendar
         </Button>
           }
          
          </Box>
          {loadingCreate?
        <p>loading...</p>
        :
<TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {daysOfWeek.map((day) => (
                    <TableCell align="center" key={day}>
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timeSlots.map((timeSlot) => (
                  <TableRow key={timeSlot}>
                    <TableCell>{timeSlot}</TableCell>
                    {daysOfWeek.map((day) => (
                      <TableCell align="center" key={`${day}-${timeSlot}`}>
                        {getScheduleData(day, timeSlot)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
          
        </>
      )}
    </>
  );
};

export default Calendrier;
