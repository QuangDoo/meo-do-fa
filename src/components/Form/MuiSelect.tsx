import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps
} from '@material-ui/core';
import React, { ReactText, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
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
  rules?: RegisterOptions;
  error?: boolean;
  helperText?: React.ReactNode;
};

export default function MuiSelect(props: Props) {
  const [labelId] = useState(uuid());

  return (
    <FormControl variant={props.variant} required={props.required} error={props.error} fullWidth>
      <InputLabel id={labelId}>{props.label}</InputLabel>

      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
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

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}
