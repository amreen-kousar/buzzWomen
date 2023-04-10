import React from "react";
import { Typography,Card,CardContent, IconButton, Stack, Select,MenuItem} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import { vi } from "date-fns/locale";

export default function AssignBatches(){
   
    const state = useLocation();
    const [gelathi, setGelathi] = useState('');
    const [gl,setGl] = useState(false);
    const [data1, setData1] = useState('')
    const [villages, setVillages] = useState('');
    const [batch,setBatch] = useState('');
    const [tc, setTc] = useState('');
    let [alloted,setAlloted]=useState(0)

   const [selected,setSelected]=useState([])

   const id = sessionStorage?.getItem("proId")
useEffect(() => {
  projData();

}, [])

const projData = async => {
  console.log(location, "location props")
  var userDetails = JSON.parse(localStorage?.getItem('userDetails'))
  var role = JSON.parse(localStorage?.getItem('userDetails'))?.role
  var idvalue = JSON.parse(localStorage?.getItem('userDetails'))?.id;
  var data = JSON.stringify({
    "project_id": id,
    "role_id": role,
    "emp_id": idvalue
  });

  var config = {
    method: 'post',
    url: 'https://bdms.buzzwomen.org/appTest/getProjectData.php',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      setData1({ ...response.data.list })
      console.log(response.data.list, '<--------------setData1setData1');
    })
    .catch(function (error) {
      console.log(error);
    });

}
  // useEffect(() => {
  //   gelathinamelist(35)
   
  // }, []
  // )
//   const gelathinamelist= async() =>{
   
//     var data = JSON.stringify({
//         "project_id":234,
//         "role_id":13  , 
//         "operation_manager_id":35,
//         "pageNum": 1
//       });
      
//       var config = {
//         method: 'post',
//         url: 'https://bdms.buzzwomen.org/appTest/getPeopleList.php',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         data : data
//       };
//       axios(config)
//       .then(function (response) {
//         setGelathi(response?.data)
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
      
// }

const villagelist= async(itm) =>{
  console.log(itm,"itemassignedddddddddddd")
  setGl(true)
  var data = JSON.stringify({
    "project_id":data1?.project_id, 
    "emp_id":itm?.emp_id,
    
  
    });


 
    
    var config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/getTrainingBatchList.php',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      setVillages(response?.data)
      setAlloted(response?.data?.checked_count)
      setTc(response?.data?.list.length)
    })
    .catch(function (error) {
      console.log(error);
    });
    
}
console.log(villages,"checkedlist")
const CreateBatch= async(itm) =>{
  const userid = JSON.parse(localStorage.getItem('userDetails'))?.id
  selected.push(itm?.training_batch_id)
  setSelected(selected)
  console.log(id,"createbatchhhhhh")
  var data = JSON.stringify({
     
     "project_id":data1?.project_id, 
     "training_batch_id":id,
      "emp_id":userid
    });
console.log(alloted,selected)
      
  setAlloted(alloted=>parseInt(alloted)+1)    
  {console.log(alloted,"countttttttt")}
    var config = {
      method: 'post',
      url: 'https://bdms.buzzwomen.org/appTest/createGFBatch.php',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      setBatch(response?.data)
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

const deletevillage=(itm)=>{
  
   
  
}

    return(
       
     
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h5" gutterBottom>
                    <Link to="/dashboard/projects/project">
                        <IconButton>
                            <Iconify icon="material-symbols:arrow-back-rounded" />
                        </IconButton></Link>
                    Assign Batches
                </Typography>
           
            </Stack>
          
        
        <Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                  <Typography style={{color:"#ff7424"}}>Select Gelathi Facilitator </Typography>
                  <Stack mt={2} mb={2}>
                  {/* {data.state == "" && "Select "} */}
              <Select color="common" label="Gelathi Facilitator" variant="standard">
             
                  {data1?.gelathiFacilitator?.map((itm)=>{
                  
                    return(
                            <MenuItem onClick={()=>{villagelist(itm)}} value={itm?.emp_id}>{itm?.name}</MenuItem>
                            
                    )
                    
                  })}
                </Select>
                  </Stack>
                </CardContent>
          </Card><br/>
       
                     {(gl)?<Typography gutterBottom style={{textAlign:'center'}}>
                     Total Villages: {alloted}/{tc}
                     {console.log(alloted,"alloteddddddddd")}
                     </Typography>:null}
                
                 {(gl)?<Card style={{ marginTop: 20,  borderRadius: 20 }}>
                <CardContent>
                 
                  <Stack mt={2} mb={2}>
             
             
                  {villages?.list?.map((itm)=>{
                    {console.log(itm,"villagesssssssssssssss")}
                    return(
                      <>
                            {/* <Typography value={itm?.training_batch_id}>{itm?.name}
                             <Iconify icon="mdi:car-sports-utility-vehicle" style={{float:'left',margin:10}}/>
                            </Typography> */}

                            <TableContainer >
                  <Table aria-label="customized table">
                    <TableBody>
                      <TableRow >
                        <TableCell> <Iconify icon="mdi:car-sports-utility-vehicle" style={{float:'left',margin:5,display:'flex',fontSize:20, color:'black'}}/> 
                        <Typography value={itm?.training_batch_id}>{itm?.name}
                        
                        
                        {(selected.includes(itm?.training_batch_id)) || (itm?.flag=='1')?<IconButton  style={{float:'right'}} >
                          <Iconify icon="typcn:tick" style={{fontSize:20,color:"green"}}/>
                        </IconButton>:
                        (itm?.flag=='0')?<IconButton onClick={()=>CreateBatch(itm)} style={{float:'right'}}>
                          <Iconify icon="material-symbols:add-circle-rounded" style={{fontSize:20,color:"	#0ad5ee"}}/>
                        </IconButton>:null}
                          
                        </Typography>
                       
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                      </>
                    )
                  })}
                
                  </Stack>
                </CardContent>
                 </Card>:null}
            


        </Container>
       
    )
}