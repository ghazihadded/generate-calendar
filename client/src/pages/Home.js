import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Inputs from "../component/Inputs";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, updateAdmin } from "../services/adminServices";
import AlertNotif from "../component/AlertNotif";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAdmin()).then((res) => setLoading(false));
  }, [dispatch]);

  const onChangeAdmin = (values) => {
    setLoadingUpdate(true);
    dispatch(updateAdmin(values)).then((res) => {
      if (res?.status === true) {
        setMessage("success update");
        setOpen(true);
        setType("success");
        setLoadingUpdate(false);
      } else {
        setMessage("failed update");
        setOpen(true);
        setType("error");
        setLoadingUpdate(false);
      }
    });
  };

  return (
    <>
      {loading ? (
        <p>loading ...</p>
      ) : (
        <>
        <AlertNotif message={message} open={open} handleClose={handleClose} type={type} />
        <Formik
          enableReinitialize={false}
          initialValues={{
            email: user ? user?.email : "",
            name: user ? user?.name : "",
          }}
          onSubmit={(values) => {
            onChangeAdmin(values);
          }}
        >
          {(formik) => {
            const { handleSubmit, handleChange, values } = formik;

            return (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Inputs
                  field={"email"}
                  label={"Email Address"}
                  handleChange={handleChange}
                  value={values}
                />
                <Inputs
                  field={"name"}
                  label={"name"}
                  handleChange={handleChange}
                  value={values}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loadingUpdate}
                >
                  update
                </Button>
              </Box>
            );
          }}
        </Formik>
        </>
      )}
    </>
  );
}

export default Home;
