import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Dropdown.scss";
import { useState } from "react";

const Dropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

  return (
    <div className="dropdown-menu">
      <FormControl className="dromdown-form">
        <InputLabel id="demo-simple-select-label" className="dropdown-title">
     
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          onChange={handleChange}
        >
          <MenuItem value={10}></MenuItem>
          <MenuItem value={10}></MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
