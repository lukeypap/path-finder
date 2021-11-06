import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledInputLabel = styled(InputLabel)`
  && {
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  && {
    color: white;
  }
  .MuiSvgIcon-root {
    color: white;
  }
`;

const DropDown = (props) => {
  const { name, label, value, onChange, options, error = null, color } = props;

  return (
    <FormControl variant="standard" fullWidth>
      <StyledInputLabel>Algorithm</StyledInputLabel>
      <StyledSelect value={value} name={name} label={label} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default DropDown;
