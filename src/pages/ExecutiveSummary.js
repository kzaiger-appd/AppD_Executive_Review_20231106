// import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries'; // Adjust the import path as needed


const modules1 = {
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
  'header', 'font', 'bold', 'italic', 'underline', 'color', 'background', 'list'
];


const RichTextEditorCell = ({ value, onValueChange }) => {

  // const [currentModule, setCurrentModule] = useState(modules1);
  // const handleFocus = () => {
    // setCurrentModule(modules1);
// }
// const handleBlur = () => {
  // setCurrentModule(modules1);
// }

  return(
  <ReactQuill
    value={value}
    onChange={onValueChange}
    modules={modules1}
    formats={formats}
    theme="snow"
    onKeyDown={(event) => {
      event.stopPropagation();
    }}
    // onFocus={handleFocus}
    // onBlur={handleBlur}
  />)
  };

function ExecutiveSummary() {
  const [todos, setTodos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.graphql(
          graphqlOperation(listTodos, {
            // limit: paginationModel.pageSize,
            nextToken: nextToken,
          })
        );

        // Check for GraphQL errors in the response
        if (response.errors) {
          console.error('GraphQL Errors:', response.errors);
          // Handle GraphQL errors here, e.g., show an error message to the user
          return;
        }

        const responseData = response.data.listTodos;
        const todoItems = responseData.items.map((todo) => ({
          id: todo.id,
          projectName: todo.projectName,
          releaseContent: todo.releaseContent,
          status: todo.status,
          platform: todo.platform_type,
          ccoTarget: todo.ccoTarget,
          ccoActual: todo.ccoActual,
          backlog: todo.backlog,
          // Add more fields as needed
        }));
        setTodos(todoItems);
        setNextToken(responseData.nextToken); // Update the nextToken

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle other errors here, e.g., show an error message to the user
      }
    }

    fetchData();
  }, [paginationModel, nextToken]);

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
    valueOptions: ["CSaaS", "Appd Cloud", "On-Prem", "FSO and CNAO"]
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
    editable: true,
    width: 370,
    renderCell: (params) => (
      <RichTextEditorCell
        value={params.row.backlog || ''}
        onValueChange={(content) => {
          params.row.executiveSummary=content;
        }}
      />
    ),
  },
  ];

  return (
    <Box sx={{ height: '100%', width: '96%', marginLeft: 8 }}>
      <DataGrid
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={todos}
        getRowHeight={() => 'auto'}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ExecutiveSummary;
