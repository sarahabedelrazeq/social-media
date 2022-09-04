import React from "react";

export default function useForm(values) {
  const [form, setForm] = React.useState(values);

  const handleSetForm = React.useCallback((key, val) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [key]: val,
      };
    });
  }, []);

  return [form, handleSetForm];
}
