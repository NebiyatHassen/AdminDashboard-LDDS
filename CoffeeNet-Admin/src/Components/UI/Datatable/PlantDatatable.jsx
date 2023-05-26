import "./UserDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const columns = [
  { field: "id", headerName: "NO", width: 30 },
  { field: "Email", headerName: "Email", width: 200 },
  { field: "Disease", headerName: "Disease", width: 120 },
  { field: "Severity", headerName: "Severity", width: 120 },
  {
    field: "OriginalImage",
    headerName: "Original Image",
    width: 150,
    renderCell: (params) => {
      const path = params.row.OriginalImage;
      return (
        <a href={`${path}`} target="_blank" style={{ color: "green" }}>
          View image
        </a>
      );
    },
  },
  {
    field: "SegmentedImage",
    headerName: "Segmented Image",
    width: 150,
    renderCell: (params) => {
      const path = params.row.SegmentedImage;
      return (
        <a href={`${path}`} target="_blank" style={{ color: "green" }}>
          View image
        </a>
      );
    },
  },
  {
    field: "DetectedImage",
    headerName: "Detected Image",
    width: 150,
    renderCell: (params) => {
      const path = params.row.DetectedImage;
      return (
        <a href={`${path}`} target="_blank" style={{ color: "green" }}>
          View image
        </a>
      );
    },
  },
  { field: "Date", headerName: "Date", width: 130 },
];
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

export default function Datatable() {
  const [newdata, setData] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/v1/plants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      const plants = json.data.leafInfos;
      const filteredPlants = plants.map((plant, i) => {
        return {
          id: i + 1,
          Email: plant.email,
          OriginalImage: plant.OriginalImage,
          SegmentedImage: plant.SegmentedImage,
          DetectedImage: plant.DetectedImage,
          Disease: plant.disease,
          Date: plant.date,
          Severity: plant.severity,
        };
      });
      setData(filteredPlants);
    }
    fetchData();
  }, [deleteUser]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={newdata}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="datatable"
      />
    </div>
  );
}
