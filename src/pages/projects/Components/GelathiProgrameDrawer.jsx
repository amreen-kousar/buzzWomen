import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  TextField,
  Card,
  Dialog,
  CardContent,
  TextareaAutosize,
  Grid,
} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { ColorManyPicker } from '../../../components/color-utils';
// import ShaktiDialog from '../projects/Components/ShaktiDialog'
// ----------------------------------------------------------------------

GelathiProgrameDrawer.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function GelathiProgrameDrawer({
  isOpenFilter,
  onOpenFilter,
  onCloseFilter,
  clcikData,
  gelathiFacikitatorLead,
}) {
  const [session, setSession] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [gelatiNote, setGelatiNote] = useState('');
  const [getAllNotes, setGetAllNotes] = useState([]);


//   image
const [image, setImage] = React.useState([]);
  const [imagePath, setImagePath] = React.useState([]);
  const [viewImage, setViewImage] = React.useState(false);
  const [locationS,setLocation] = useState()
  const userid = JSON.parse(localStorage.getItem('userDetails'))?.id

  localStorage.setItem('clickData', clcikData);
  const localstoragrClickData = localStorage.getItem('clcikData');
  useEffect(() => {
    // let isSubscribe =true

    getGFSessionData();
    getNoteHandler();

    // console.log(clcikData)
  }, [clcikData]);
  useEffect(() => {
    console.log('useEffect for getnotehandler');

    let isSubscribe = true;

    if (isSubscribe) {
      getNoteHandler();
      getGFSessionData();
    }

    return () => {
      isSubscribe = false;
    };
  }, []);
  console.log(clcikData, '<---------gf_session_namegf_session_name');

//   image converting 
function getBase64(file, callback) {

    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));

    reader.readAsDataURL(file);
  }
  const data = new FormData();
const convertImage = (e) => {
    console.log("this is calleddddfdsfs")
    data.append('emp_id', userid);
    data.append('file', e.target.files[0]);
    setImagePath([...imagePath, e.target.files[0]])
    const imageData = URL.createObjectURL(e.target.files[0]);
    console.log(imageData, "files")
    getBase64(e.target.files[0], function (base64Data) {
      setImage([...image, base64Data])
      setViewImage(true)
    });
  }
  // sending image 
  const postImages = async () => {
    var dataImage = []
    const form = new FormData()
    form?.append("emp_id", userid)
    //form?.append("file[]",imagePath[0])

    const data = imagePath?.map(itm => {
      form?.append("file[]", itm)
    })
    var requestOptions = {
      method: 'POST',
      body: form,
      redirect: 'follow'
    };
    // var config = {
    //   method: 'post',
    //   url: "https://bdms.buzzwomen.org/appTest/new/taAttachments.php",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: form
    // };
    //console.log(config)
    let res = fetch("https://bdms.buzzwomen.org/appTest/new/taAttachments.php", requestOptions).then(itn => {
      console.log(itn, "<--itemgh")
    })
      .catch(err => {
        console.log(err, "<---wertyu")
      })
    //console.log(res,"<----2werdcfvghbj")


  }
  const getGFSessionData = (async) => {
    var data = JSON.stringify({
      gf_session_id: clcikData?.name,
    });

    var config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/getGFSessionData.php',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setSession(response.data);
        console.log(response.data, '<---------setSessionsetSession');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const noteSubmitHandler = () => {
    setShowNote(false);
    var userid = JSON.parse(localStorage.getItem('userDetails'))?.id;
    var role = JSON.parse(localStorage.getItem('userDetails'))?.role;

    var data = JSON.stringify({
      notes: gelatiNote,
      type: session.type,
      tb_id: session.tb_id,
      emp_id: session.user_id,
    });

    console.log(data, 'material api');
    const config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/createNotes.php',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          // viewMessage('Project added sucessfully');
          setShowNote(false);
          getNoteHandler();
          console.log('susscesfully added data material');
        }
      })
      .catch(function (error) {
        console.log(error, 'failed');
      });
    console.log('submit');
  };

  const getNoteHandler = () => {
    console.log('getNoteHandler');
    var userid = JSON.parse(localStorage.getItem('userDetails'))?.id;
    var role = JSON.parse(localStorage.getItem('userDetails'))?.role;
    var data = JSON.stringify({
      type: session.type,
      tb_id: session.tb_id,
      // "type":2, "tb_id":21407
    });

    console.log(data, 'material api');
    const config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/getNotes.php',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          setGetAllNotes(response?.data?.notes);
          console.log(response, 'notesData');
        }
      })
      .catch(function (error) {
        console.log(error, 'failed');
      });
    console.log('submit');
  };
  console.log(getAllNotes, 'getallnotes');
  return (
    <>
      {/* <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button> */}

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 350 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {`${session?.type_name}`}
          </Typography>
          {console.log(clcikData, '<------clcikDataclcikData')}
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Card>
                <CardContent>
                  <Typography style={{ flexDirection: 'row' }} variant="body1" gutterBottom>
                    Project:&nbsp;{session?.projectName}
                    {console.log(session?.gf_session_name, '<--------gf_session_namegf_session_name')}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Partner :&nbsp;{session?.partnerName}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Training&nbsp;Batch:&nbsp;{session?.training_batch_name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Plan Date :{session?.plan_date}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Contact Person:
                    {session?.contact_person}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Contact Number:
                    {session?.contact_number}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    Trainer Name:
                    {session?.trainer_name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    GF Name:
                    {session?.gf_name}
                  </Typography>
                </CardContent>
              </Card>
              {/* <ShaktiDialog /> */}
              <Card style={{ marginTop: 20 }}>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    Visit Participants :
                    <Typography variant="body1" gutterBottom>
                      {session?.total_participants}{' '}
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            
              <Card style={{ marginTop: 20 }}>
              <div style={{display:'flex', marginTop:"20px"}}>
              <div>
              <label for="inputTag" style={{ cursor: "pointer", display: "flex" }}>
                  <Iconify
                    icon={'mdi:camera'}
                    sx={{ width: 25, height: 25, ml: 2, color: "#ff7424" }}
                  />&nbsp;
                 Photos
                  <input style={{ display: "none" }} accept="image/png, image/gif, image/jpeg" id="inputTag" type="file" onChange={(e) => { convertImage(e) }} />
                </label>
                </div> 
                <div >
                <Button onClick={postImages} 
                sx={{
                  
                }}> <IconButton 
                
                >
                <Iconify
                  style={{ color: 'black' }}
                  icon="material-symbols:add"
                
                />
              </IconButton>
              </Button>
                </div>
                
              
              </div>
              </Card>
             
              <Card style={{ marginTop: 20 }}>
                <CardContent>
                  <Typography variant="h6">
                    Notes
                    <IconButton style={{ float: 'right' }}>
                      <Iconify
                        style={{ color: 'black' }}
                        icon="material-symbols:add"
                        onClick={() => {
                          setShowNote(true);
                        }}
                      />
                    </IconButton>
                  </Typography>
                </CardContent>
              </Card>

              {showNote ? (
                <div>
                  {/* <Dialog fullScreen open={open} onClose={handleClose}TransitionComponent={Transition}></Dialog> */}
                  <Card style={{ marginTop: 20, marginLeft: 10 }}>
                    <TextField
                      style={{ marginTop: 20, marginLeft: 20 }}
                      id="outlined-multiline-static"
                      label="Notes"
                      multiline
                      rows={5}
                      variant="outlined"
                      onChange={async (e) => {
                        let note = await e?.target?.value;
                        setGelatiNote(e?.target?.value);
                        console.log('note', gelatiNote);
                      }}
                    ></TextField>
                    <Button style={{ marginTop: 20, marginLeft: 20, marginBottom: 20 }} onClick={noteSubmitHandler}>
                      Save
                    </Button>
                  </Card>
                </div>
              ) : null}

              <CardContent>
                <div>
                  {getAllNotes &&
                    getAllNotes.map((i, index) => {
                      {
                        console.log(i, 'ivalue');
                      }
                      return (
                        <>
                          <Card style={{ marginTop: 20, marginLeft: 10 }}>
                            {/* <Grid pt={1} pb={1} container xs={12} md={4} direction="row" alignItems="center" justifyContent="space-between" style={{ marginLeft: 15}}> */}
                            <Grid
                              container
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                              style={{ marginTop: 10 }}
                            >
                              <Typography variant="body1">
                                {' '}
                                {gelathiFacikitatorLead.gfl_name} {i?.date}
                              </Typography>

                              {console.log(i?.notes, '<----------------------i?.notesi?.notes')}
                            </Grid>
                            <Typography variant="body1" gutterBottom style={{ marginTop: 10, marginLeft: 30 }}>
                              {i?.notes}{' '}
                            </Typography>
                          </Card>
                        </>
                      );
                    })}
                </div>
              </CardContent>
            </div>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
