import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { WallGeometries } from "../models/models";

export interface DropDownProps {
  onChange: (SelectChangeEvent: unknown) => void;
  selectedItems: string[];
  getLabelItem: (name: string) => string;
  items: WallGeometries;
}

export default function Dropdown(props: DropDownProps) {
  return (
    <Grid item width={300} position="absolute" top={20} left={20}>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel>Select Walls</InputLabel>
        <Select
          fullWidth
          color="primary"
          value={props.selectedItems}
          onChange={(e) => props.onChange(e)}
          multiple
          label={"Select Walls"}
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
