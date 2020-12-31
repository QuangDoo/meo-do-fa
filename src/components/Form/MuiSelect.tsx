import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@material-ui/core';
import React, { ReactText, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

type SelectOption = {
  name: React.ReactNode;
  value: string | number | readonly string[];
  key: ReactText;
};

type Props = SelectProps & {
  options: SelectOption[];
  variant?: 'standard' | 'filled' | 'outlined';
  control?: Control;
};

export default function MuiSelect(props: Props) {
  const [labelId] = useState(uuid());

  return (
    <FormControl variant={props.variant || 'standard'} required={props.required} fullWidth>
      <InputLabel id={labelId}>{props.label}</InputLabel>

      <Controller
        name={props.name}
        control={props.control}
        as={
          <Select labelId={labelId} label={props.label}>
            {props.options.map((option) => (
              <MenuItem key={option.key} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </FormControl>
  );
}
