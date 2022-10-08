import { TextField } from "@mui/material";
import { useTheme } from "hooks";
import React from "react";

export default function ThemeTextField(props) {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      InputLabelProps={{
        ...props.InputLabelProps,
        style: { color: theme.text },
      }}
      InputProps={{
        ...props.InputProps,
        style: { color: theme.text, borderColor: theme.text },
      }}
      FormHelperTextProps={{
        ...props.FormHelperTextProps,
        style: { color: theme.text },
        className: "mt-2",
      }}
      className="w-100"
    />
  );
}
