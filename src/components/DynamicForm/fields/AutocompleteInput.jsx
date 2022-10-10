import { Autocomplete } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export default function AutocompleteInput({ field, ThemeTextField }) {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [valueDefault, setValueDefault] = React.useState();

  React.useEffect(() => {
    let defaultValue;
    let formDefaultValue;
    let options = field?.options || [];

    if (field.multiple) {
      defaultValue = [];
      formDefaultValue = [];
      if (Array.isArray(field.defaultValue)) {
        field.defaultValue.forEach((value) => {
          let option = options.filter(
            (option) => option.id.toString() === value.toString()
          );
          if (option && option[0]) {
            defaultValue.push(option[0]);
            formDefaultValue.push(option[0].id);
          }
        });
      } else defaultValue = [];
    } else {
      defaultValue = options.filter(
        (option) => option.id === field.defaultValue
      )[0];
      formDefaultValue = options.filter(
        (option) => option.id === field.defaultValue
      )[0];
      formDefaultValue = formDefaultValue?.id || null;
    }
    setValueDefault(defaultValue || null);
    setValue(field?.name, formDefaultValue);
  }, [field, setValue]);

  return (
    <Col sm={6} xs={12}>
      <Form.Group className="mb-4" controlId={field?.name}>
        <Row>
          <Col xs={12} className="mb-3">
            {(valueDefault || valueDefault === null) && (
              <Autocomplete
                // {...register(field?.name)}
                multiple={field.multiple}
                onChange={(event, newValue) => {
                  let formNewValue;
                  if (Array.isArray(newValue))
                    formNewValue = newValue.map((value) => value.id);
                  else formNewValue = newValue.id;
                  setValue(field?.name, formNewValue);
                }}
                getOptionLabel={(option) => option.label}
                defaultValue={valueDefault}
                filterSelectedOptions
                id={field?.name}
                name={field?.name}
                options={field?.options || []}
                className={classNames("w-100", {
                  "border-danger": errors[field?.name],
                })}
                renderInput={(params) => {
                  console.log("params", params);
                  return (
                    <ThemeTextField
                      {...params}
                      label={field?.title}
                      placeholder={field?.placeholder || field.title}
                    />
                  );
                }}
              />
            )}
          </Col>
          <Col xs={12}>
            {errors[field?.name] && (
              <p className="text-danger" role="alert">
                {errors &&
                  errors[field?.name] &&
                  errors[field?.name] &&
                  errors[field?.name].message}
              </p>
            )}
          </Col>
        </Row>
      </Form.Group>
    </Col>
  );
}
