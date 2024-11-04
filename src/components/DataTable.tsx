import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useRef } from 'react';
import { ColDef, ICellRendererParams, GridApi } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface RowData {
  No: number;
  ClassName: string;
  Description: string;
}

const GridExample: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([
    { No: 1, ClassName: "Angular", Description: "A web framework" },
    { No: 2, ClassName: "React", Description: "A JavaScript library" },
    { No: 3, ClassName: "Node", Description: "JavaScript runtime" },
  ]);
  const [originalData, setOriginalData] = useState<RowData[]>(rowData);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const gridApi = useRef<GridApi | null>(null);

  const colDefs: ColDef[] = [
    { field: "No" },
    {
      field: "Actions",
      cellRenderer: (params: ICellRendererParams) => (
        <>
          <IconButton onClick={() => handleEdit(params)} color="primary">
            {editingRowIndex === params.node.rowIndex ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <IconButton onClick={() => handleDelete(params.data)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      editable: false,
    },
    { field: "ClassName", editable: true },
    { field: "Description", editable: true },
  ];

  const handleEdit = (params: ICellRendererParams) => {
    const rowIndex = params.node.rowIndex;
    if (rowIndex != null) {
      if (editingRowIndex === rowIndex) {
        gridApi.current?.stopEditing();
        setEditingRowIndex(null);
      } else {
        setEditingRowIndex(rowIndex);
        gridApi.current?.startEditingCell({
          rowIndex,
          colKey: "ClassName",
        });
      }
    }
  };

  const handleDelete = (data: RowData) => {
    setRowData((prevData) => prevData.filter((row) => row.No !== data.No));
  };
  const Search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    const filteredData = originalData.filter((row) =>
      row.ClassName.toLowerCase().includes(searchText) ||
      row.Description.toLowerCase().includes(searchText)
    );
    setRowData(filteredData);
    console.log("sdassadsadsasad")
  };
  return (
    <div>
      <TextField
        onChange={Search}
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ fontSize: '1.5rem', color: 'purple' }} />
            </InputAdornment>
          ),
          style: {
            borderRadius: '5px',
            backgroundColor: '#f0f0f0',
          },
        }}
      />
      <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, overflow: 'hidden' }}>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            editType="fullRow"
            onGridReady={(params) => {
              gridApi.current = params.api;
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default GridExample;
