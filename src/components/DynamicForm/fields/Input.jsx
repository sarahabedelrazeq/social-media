import React from "react";
import classNames from "classnames";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { useTheme } from "hooks";

export default function Input({ field, ThemeTextField }) {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Col sm={6} xs={12}>
      <Form.Group className="mb-4" controlId={field?.name}>
        <Row>
          <Col xs={12} className="mb-3">
            <Controller
              name={field?.name}
              control={control}
              rules={{ required: true }}
              defaultValue={field?.defaultValue ? field?.defaultValue : ""}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <>
                  <ThemeTextField
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    id={field?.name}
                    helperText={errors[field?.name]?.message}
                    name={field?.name}
                    type={field?.type || "text"}
                    placeholder={field?.placeholder || field.title}
                    label={field?.title}
                    aria-invalid={error?.message ? "true" : "false"}
                  />
                </>
              )}
            />
          </Col>
        </Row>
      </Form.Group>
    </Col>
  );
}
