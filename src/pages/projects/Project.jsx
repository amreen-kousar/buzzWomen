import React, {useState, useEffect } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Card, CardHeader, Container, Icon, IconButton, TableCell, Typography } from '@mui/material';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom'
import CreateTrainerBatch from './Components/CreateTrainerBatch'
import AddTrainerDrawer from './Components/AddTrainerDrawer';
function Project(props) {
  const location = useLocation()
  const [data1,setData1] = useState('')
  useEffect(() => {
    projData();
    // console.log(location.state, "props")
  }, [])
  const projData= async =>{
    var data = JSON.stringify({
      "project_id": 234,
      "role_id": 1,
      "emp_id": 144
    });
    
    var config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/getProjectData.php',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setData1(response.data.list)
      console.log(response.data,'<--------------setData1setData1');
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  const [projectDetails, setProjectDetails] = useState({ projectName: "BANGARAPETCI19102", districtName: "Kolar", partnerName: "CDPO", trainingTarget: "2879", projectDuration: " From: 01 - 04 - 2019 To: 31 - 03 - 2020", projectStatus: "Completed" })

  const styles = {
    buttonStyle: { boxShadow: "none", borderRadius: "7px", backgroundColor: "#edeff1", fontWeight: 500, textAlign: "left" },
    tableRowStyle: { justifyContent: 'center', alignItems: 'center', marginLeft: 200 },
    linkStyle: { textDecoration: 'none', color: "black" }
  }
  const addIcon = <IconButton>
    <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" />
  </IconButton>

  return (
    <div>
      <Page title="Dashboard: Project">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                <Link to="/dashboard/projects">
                  <IconButton>
                    <Iconify icon="material-symbols:arrow-back-rounded" />
                  </IconButton></Link>
                <span> Project</span>
              </Typography>
              <Card >
                <TableContainer >
                  <Table aria-label="customized table">
                    <TableBody>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Name : </TableCell>
                        <TableCell>: {data1.project_name} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>District Name</TableCell>
                        <TableCell>: {data1.location_name} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Partner Name </TableCell>
                        <TableCell>: {data1.partnerName} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Training Target</TableCell>
                        <TableCell>: {data1.training_target} </TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Duration</TableCell>
                        <TableCell> : From : {data1.startDate} </TableCell>
                        <TableCell> To : {data1.endDate}</TableCell>
                      </TableRow>
                      <TableRow style={styles.tableRowStyle}>
                        <TableCell>Project Status</TableCell>
                        <TableCell>: {data1.project_status} </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={5} >

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
              >
                <ButtonGroup
                  orientation="vertical"
                  style={{ boxShadow: "none", borderRadius: "0px" }} elevation={0} >

                  <Link to="/dashboard/projects/busTest" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle} endIcon={addIcon}>
                    <span style={{ width: "235px" }}>Bus: Test & check List</span>
                  </Button>
                  </Link><br />

                  <Link to="/dashboard/projects/materialStock" style={styles.linkStyle}>
                    <Button variant="secondary" style={styles.buttonStyle} startIcon={
                      <IconButton>
                        <Iconify style={{ color: "#6d7c89" }} icon="fluent:textbox-16-filled" />
                      </IconButton>
                    } endIcon={addIcon}>
                      <span style={{ width: "200px" }}> Materials Stocklist</span>
                    </Button>
                  </Link><br />

                  <Link to="/dashboard/projects/selfShakthi" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    startIcon={<IconButton>
                      <Iconify style={{ color: "#6d7c89" }} icon="mdi:bus-school" />
                    </IconButton>} endIcon={<IconButton>
                      <Iconify style={{ color: "#6d7c89" }} icon="fluent:notebook-eye-20-filled" />
                    </IconButton>}>
                    <span style={{ width: "200px" }}>Self Shakthi program</span>
                  </Button>
                  </Link>
                  <br />


                  <Link to="/dashboard/projects/gelathiProgram" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle} endIcon={<IconButton>
                    <Iconify style={{ color: "#6d7c89" }} icon="fluent:notebook-eye-20-filled" />
                  </IconButton>} startIcon={<IconButton>
                    <Iconify style={{ color: "#6d7c89" }} icon="twemoji:diya-lamp" />
                  </IconButton>}>
                    <span style={{ width: "200px" }}> Gelathi Program</span>
                  </Button>
                  </Link>
                  <br />


                  <Link to="/dashboard/projects/enrolledGelathi" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle} startIcon={
                    <IconButton>
                      <Iconify style={{ color: "#6d7c89" }} icon="mdi:user-group" />
                    </IconButton>
                  } endIcon={addIcon}>
                    <span style={{ width: "200px" }}> Enrolled Gelathis</span>
                  </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/enrolledGreenMotivators" style={styles.linkStyle}>
                    <Button variant="secondary" style={{ ...styles.buttonStyle, color: "green" }} startIcon={<IconButton>
                      <Iconify style={{ color: "green" }} icon="mingcute:user-add-fill" />
                    </IconButton>} endIcon={<IconButton>
                      <Iconify style={{ color: "green" }} icon="material-symbols:add" />
                    </IconButton>}>
                      <span style={{ width: "200px" }}> Enrolled Green Motivators</span>
                    </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/enrolledVyaapar" style={styles.linkStyle}>
                    <Button variant="secondary" style={{ ...styles.buttonStyle, color: "blue" }} startIcon={<IconButton>
                      <Iconify style={{ color: "blue" }} icon="mingcute:user-add-fill" />
                    </IconButton>} endIcon={<IconButton>
                      <Iconify style={{ color: "blue" }} icon="material-symbols:add" />
                    </IconButton>}>
                      <span style={{ width: "200px" }}>Enrolled Vyapar</span>
                    </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/gelathiCirlces" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}> Gelathi Circles</span>
                  </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/gelathiCirlces" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}> Schedule A Village Visit</span>
                  </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/assignedVillages" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}> Assigned Villages</span>
                  </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/scheduleCircleMeet" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}>Schedule A Circle Meeting</span>
                  </Button>
                  </Link>
                  <br />

                  <Link to="/dashboard/projects/scheduleBeehiveVisit" style={styles.linkStyle}><Button variant="secondary" style={styles.buttonStyle}
                    endIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="material-symbols:add" /> </IconButton>}
                    startIcon={<IconButton> <Iconify style={{ color: "#6d7c89" }} icon="ic:sharp-supervised-user-circle" /></IconButton>}>
                    <span style={{ width: "200px" }}>Schedule A Beehive Visit</span>
                  </Button>
                  </Link>
                  <br />

                </ButtonGroup>

              </Box>

              <Box style={{marginTop:50}}>


                <div style={{marginTop:50}}>
                        <CreateTrainerBatch />
                </div>
              </Box>
            </Grid>
          </Grid>



          {/* <Card onClick={() => {
                    console.log("its copensdfdsfds")
                handleOpenFilter()
              }}>
<Typography>hbjbhbjhbjh</Typography>
</Card> */}

          {/* <AddTrainerDrawer
            isOpenFilter={true}
            
            // onOpenFilter={handleOpenFilter}
            // onCloseFilter={handleCloseFilter}
          /> */}










        </Container>
      </Page>
    </div >
  )
}

export default Project