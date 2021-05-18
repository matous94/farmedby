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
const createMenuProps = (itemHeight = ITEM_HEIGHT) => {
  return {
    PaperProps: {
      sx: {
        maxHeight: itemHeight * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
};

export default function Select({
  value,
  onChange,
  options,
  multiple,
  label,
  name,
  required,
  itemHeight,
  size,
  sx
}) {
  const isChecked = (id) => {
    if (multiple) {
      return value.indexOf(id) > -1;
    }
    return value === id;
  };

  return (
    <FormControl
      size={size}
      variant="outlined"
      fullWidth
      required={required}
      sx={sx}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        name={name}
        label={label}
        multiple={multiple}
        value={value}
        onChange={onChange}
        renderValue={(selectedValue) => {
          if (multiple) {
            return selectedValue.map((id) => options[id].label).join(", ");
          }
          if (selectedValue === "") {
            return "";
          }
          return options[selectedValue].label;
        }}
        MenuProps={createMenuProps(itemHeight)}
        sx={{
          "& .MuiSelect-select:focus": {
            background: "inherit"
          },
          "& .MuiSelect-select": {
            whiteSpace: "normal"
          }
        }}
      >
        {Object.values(options).map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {multiple ? <Checkbox checked={isChecked(option.id)} /> : null}
            <ListItemText
              primary={option.label}
              sx={{
                whiteSpace: "normal"
              }}
            />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    })
  ).isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  sx: PropTypes.shape({}),
  size: PropTypes.string,
  itemHeight: PropTypes.number
};
Select.defaultProps = {
  multiple: false,
  name: undefined,
  required: false,
  sx: undefined,
  size: undefined,
  itemHeight: undefined
};
