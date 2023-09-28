import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@material-ui/core/Typography";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }],
        [{ 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' },]
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    };

const formats = [
  'header', 'font', 'list', 'bold', 'italic', 'underline', 'link'
];

const RichTextEditorCell = ({ value, onValueChange }) => (
    <ReactQuill
      value={value}
      onChange={onValueChange}
      modules={modules}
      formats={formats}
      theme="snow"
      onKeyDown={(event) => {
        event.stopPropagation();
      }}
    />
  );

const columns = [
    { field: 'projectName', headerName: <Typography>Project Name</Typography>,  width: 400, renderCell: (params) => (
        <div>
          <Typography>{params.row.projectName || ''}</Typography>
          <Typography color="textSecondary">{params.row.releaseContent || ''}</Typography>
        </div>
      )},
    {
      field: 'status',
      headerName: <Typography>Status</Typography>,
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["On Track", "Delayed", "Missed"]
    },
    {
      field: 'platform',
      headerName: <Typography>Platform</Typography>,
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["CSaaS", "Appd Cloud", "On-Prem", "FSO"]
    },
    {
      field: 'cco',
      headerAlign: 'left',
      headerName: <Typography>Launch</Typography>,
      width: 150,
      renderCell: (params) => (
        <div>
          <Typography>Planned <Typography color="textSecondary">{params.row.ccoTarget || ''}</Typography></Typography>
          <Typography>Actual <Typography color="textSecondary">{params.row.ccoActual || ''}</Typography></Typography>
        </div>
      )},
    {
      field: 'executiveSummary',
      headerName: <Typography>Executive Summary</Typography>,
      sortable: false,
      width: 500,
      renderCell: (params) => (
        <RichTextEditorCell
          value={params.row.executiveSummary || ''}
          onValueChange={(content) => {
            params.row.executiveSummary= content;
          }}
        />
      ),
    },
  ];
  
  const rows = [
    { id: 1, projectName: 'MDS - Harmukh -9.4.1', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim', status: 'On Track', platform: 'CSaaS', ccoTarget: '2023-09-11', ccoActual: '2023-09-15', executiveSummary: 'Test' },
    { id: 2, projectName: 'NX - OS O1F - 10.4(1)', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'Delayed', platform: 'Appd Cloud', ccoTarget: '2023-09-11', ccoActual: '2023-09-15', executiveSummary: 'Test' },
    { id: 3, projectName: 'NX-OS NR3F - 10.3(3)', releaseContent: 'SW: Security enhancements (Compliance and certifications), Ongoing enhancements in BGP, Routing & SRTE, Enhancing Cisco application framework, and ePBR', status: 'Missed', platform: 'On-Prem' , ccoTarget: '2023-09-13', ccoActual: '2023-09-19', executiveSummary: 'Test'},
    { id: 4, projectName: 'MDS - Harmukh -9.4.1', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim ', status: 'On Track', platform: 'FSO and CNAO', ccoTarget: '2023-09-11', ccoActual: '2023-09-15', executiveSummary: 'Test' },
    { id: 5, projectName: 'NX - OS O1F - 10.4(1)', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'On Track', platform: 'FSO and CNAO' , ccoTarget: '2023-09-11', ccoActual: '2023-09-18', executiveSummary: 'Test'},
    { id: 6, projectName: 'NX-OS NR3F - 10.3(3)', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim ', status: 'Missed', platform: 'CSaaS', ccoTarget: '2023-09-11', ccoActual: '2023-09-18', executiveSummary: 'Test' },
    { id: 7, projectName: 'NX - OS O1F - 10.4(1)', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim', status: 'Missed', platform: 'CSaaS', ccoTarget: '2023-09-11', ccoActual: '2023-09-19', executiveSummary: 'Test' },
    { id: 8, projectName: 'FNX - OS O1F - 10.4(1)', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'Delayed', platform: 'FSO and CNAO' , ccoTarget: '2023-09-11', ccoActual: '2023-09-14', executiveSummary: 'Test'},
    { id: 9, projectName: 'MDS - Harmukh -9.4.1', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'On Track', platform: 'FSO and CNAO' , ccoTarget: '2023-09-11', ccoActual: '2023-09-13', executiveSummary: 'Test'},
    { id: 10, projectName: 'NX - OS O1F - 10.4(1)', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim ', status: 'Delayed', platform: 'CSaaS', ccoTarget: '2023-09-01', ccoActual: '2023-09-10', executiveSummary: 'Test' },
    { id: 11, projectName: 'NX-OS NR3F - 10.3(3)', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim', status: 'Missed', platform: 'On-Prem', ccoTarget: '2023-09-21', ccoActual: '2023-09-25', executiveSummary: 'Test' },
    { id: 12, projectName: 'NX - OS O1F - 10.4(1)', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'On Track', platform: 'FSO and CNAO', ccoTarget: '2023-09-11', ccoActual: '2023-09-17', executiveSummary: 'Test' },
    { id: 13, projectName: 'FNX - OS O1F - 10.4(1)', releaseContent: 'Analytics Nellis/Creech SMA with PMON feature set TLSI.3 (Cu : UPS) Yocto dependency for Creech /Tinker* MFA (Cu:UPS) Native DC with CNMI, Auto Claim ', status: 'Delayed', platform: 'On-Prem', ccoTarget: '2023-09-11', ccoActual: '2023-09-22', executiveSummary: 'Test' },
    { id: 14, projectName: 'MDS - Harmukh -9.4.1', releaseContent: 'HW: Trappist/Trappist HD (48 1GT 1RU TOR), Mando 4, Rochefort, ToroCalican (48P 100G N9800 LC), Einstok (32D, 12.8T DD-HBM)*', status: 'On Track', platform: 'CSaaS', ccoTarget: '2023-09-11', ccoActual: '2023-09-25', executiveSummary: 'Test' },
  ];


function Csaas(){
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 5,
        page: 0,
      });

    // Filter rows with platform 'CSaaS'
    const filteredRows = rows.filter(row => row.platform === 'CSaaS');

    
      
    return (
        <Box sx={{ height: '100%', width: '96%', marginLeft: 8 }}>
          <DataGrid
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rows={filteredRows}
            getRowHeight={() => 'auto'}
            columns={columns}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );
}

export default Csaas;
