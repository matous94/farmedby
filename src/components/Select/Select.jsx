import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import MuiSelect from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function Select({
  selected,
  onChange,
  options,
  multiple,
  label,
  name
}) {
  const isChecked = (id) => {
    if (multiple) {
      return selected.indexOf(id) > -1;
    }
    return selected === id;
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        label={label}
        multiple={multiple}
        value={selected}
        onChange={onChange}
        renderValue={(value) =>
          multiple ? value.map((id) => options[id].label).join(", ") : value
        }
        MenuProps={MenuProps}
      >
        {Object.values(options).map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={isChecked(option.id)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

Select.propTypes = {
  options: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string
};
Select.defaultProps = {
  multiple: false,
  name: undefined
};
