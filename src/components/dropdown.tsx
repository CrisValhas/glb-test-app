import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { WallGeometries } from "../models/models";

export interface DropDownProps {
  onChange: (SelectChangeEvent: any) => void;
  selectedItems: string[];
  getLabelItem: (name: string) => string;
  items: WallGeometries;
}

export default function Dropdown(props: DropDownProps) {
  return (
    <Grid item width={300} position="absolute" top={20} left={20}>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel>Gestionar Walls</InputLabel>
        <Select
          fullWidth
          color="primary"
          value={props.selectedItems}
          onChange={(e) => props.onChange(e)}
          multiple
          label={"Manage walls"}
        >
          {Object.entries(props.items).map(([wallName], index) => (
            <MenuItem key={index} value={wallName}>
              {props.getLabelItem(wallName)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
