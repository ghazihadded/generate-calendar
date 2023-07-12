import React from 'react'
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from "@mui/material";

function Calendar({groupeClasse}) {


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



    const getScheduleData = (day, timeSlot) => {
        const filteredData = groupeClasse?.find(
          (item) => item?.day === day && item?.time === timeSlot
        );
        return filteredData ? (
          <>
          <p>{`group-${filteredData?.groupe?.number}`}</p>
          <p>{filteredData?.matiere}</p>
          <p>{filteredData?.classRoom?.title}</p>
          </>
        ) : "";
      };


  return (
    <>
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
        

    </>
  )
}

export default Calendar
