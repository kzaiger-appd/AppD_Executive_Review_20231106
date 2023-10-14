// import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { listTodos } from '../graphql/queries'; // Adjust the import path as needed
import styled from 'styled-components';
import { updateTodo } from '../graphql/mutations'; // Adjust the import path as needed

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

// const EditorContainer = styled.div`
//   .ql-toolbar {
//     display: none;
//   }

//   &.focused .ql-toolbar {
//     display: block;
//   }
// `;

const EditorContainer = styled.div`
  .ql-toolbar {
    display: none;
  }

  &.focused .ql-toolbar {
    display: block;
    /* You can add additional styles here to adjust the toolbar appearance when focused. */
  }
  
  .ql-editor {
    border-top: 2px solid #ccc; /* Add a border to the top of the editor to make it visible. */
    padding-top: 5px; /* Adjust the padding as needed. */
  }
`;

function RichTextEditorCell({ value, onValueChange }) {
  const quillRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleToolbar = (event) => {
    const ToolbarElement = event.target.className;
    if (ToolbarElement==='ql-picker-label') {
      setIsFocused(true);
    }
  };

  return (
    <div onBlur={handleToolbar} style = {{
      width: 470
    }}>
    <EditorContainer className={`rich-text-editor ${isFocused ? 'focused' : ''}`}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onValueChange}
        modules={modules1}
        theme="snow"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
      />
    </EditorContainer>
    </div>
  );
}

// export default RichTextEditorCell;

function formatPlatform(platform) {
  switch (platform) {
    case "on-prem":
      return "On Prem";
    case "fso_and_cnao":
      return "Fso and Cnao";
    case "appd_cloud":
      return "Appd Cloud";
    case "csaas":
      return "Csaas";
    default:
      return platform; // Return the original value if not found in the mapping
  }
}

function ExecutiveSummary() {
  const [todos, setTodos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  <div id="dropdownContainer"></div>
  const [statusCounts, setStatusCounts] = React.useState({
    'onTrack': 0,
    delayed: 0,
    missed: 0,
  });
  
  React.useEffect(() => {
    setStatusCounts(countStatus(todos));
  }, [todos]);
  
  const countStatus = (todos) => {
    const counts = {
      'onTrack': 0,
      delayed: 0,
      missed: 0,
    };
    for (const row of todos) {
      counts[row.status] += 1;
    }
    return counts;
  };

  const fetchData = async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listTodos, {
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
      setNextToken(responseData.nextToken);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle other errors here, e.g., show an error message to the user
    }
  };


  const handleStatusChange = async (rowId, newStatus) => {
    try {
      // Call the GraphQL mutation to update the status of the row
      const response = await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: rowId, // Provide the ID of the row you want to update
            status: newStatus, // Provide the new status value
          },
        })
      );

      // Check for GraphQL errors in the response
      if (response.errors) {
        console.error('GraphQL Errors:', response.errors);
        // Handle GraphQL errors here
        return;
      }

      // Reload the data to reflect the updated status
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  const updateButtonCounts = () => {
    const buttons = document.querySelectorAll('.btn-status');
    for (const button of buttons) {
      const status = button.classList[button.classList.length - 1];
      button.textContent = `${status}: ${statusCounts[status]}`;
    }
  };

  React.useEffect(() => {
    updateButtonCounts();
  }, [statusCounts]);

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
      valueOptions: ["onTrack", "delayed", "missed"],
      renderCell: (params) => (
        <div
          style={{
            background:
              params.value === "onTrack" ? 'lightgreen' :
              params.value === "delayed" ? 'gold' :
              params.value === "missed" ? 'salmon' : 'red',
            borderRadius: '5px',
            cursor: 'pointer',
            // borderRadius: "5px"
          }}
        >
          <select
            value={params.value}
            onChange={(e) => {
              handleStatusChange(params.row.id, e.target.value);
            }}
            style={{
              backgroundColor:
                params.value === "onTrack"
                  ? "lightgreen"
                  : params.value === "delayed"
                  ? "gold"
                  : params.value === "missed"
                  ? "salmon"
                  : "red",
              color: "black", // You can adjust the text color of the selected option
              borderRadius: "5px",
            }}
          >
            <option value="onTrack" > On Track</option>
            <option value="delayed">Delayed</option>
            <option value="missed">Missed</option>
          </select>
        </div>
      ),
    },
  {
    field: 'platform',
    headerName: <Typography>Platform</Typography>,
    width: 120,
    editable: true,
    type: "singleSelect",
    valueOptions: ["CSaaS", "Appd Cloud", "On-Prem", "FSO and CNAO"],
    renderCell: (params) => (
      <div>
        {formatPlatform(params.value)}
      </div>
    ),
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
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
      <Button variant="success" style={{color:'black', background: 'lightgreen' }}>On Track: {statusCounts['onTrack']}</Button>
      <Button variant="warning" style={{ background: 'gold' }}>Delayed: {statusCounts.delayed}</Button>
      <Button variant="danger" style={{ color: 'black', background:'salmon' }}>Missed: {statusCounts.missed}</Button>

        <Navbar.Brand href="#"></Navbar.Brand>
      </Container>
    </Navbar> 
    <Box sx={{ height: '100%', width: '96%', marginLeft: 8 }}>
      <DataGrid
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rows={todos}
        getRowHeight={() => 'auto'}
        columns={columns}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </>
  );
}

export default ExecutiveSummary;
