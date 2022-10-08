import classNames from "classnames";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

const languages = [
  { code: "en", title: "English" },
  { code: "ar", title: "Arabic" },
];

export default function TransitionInput({ field, ThemeTextField }) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  return languages.map((language, index) => (
    <Col sm={6} xs={12} key={index}>
      <Form.Group
        className="mb-4"
        controlId={`${field?.name}-${language.code}`}
      >
        <Row>
          <Col xs={12} className="mb-3">
            <ThemeTextField
              label={`${field?.title} (${language.title})`}
              onChange={(event) => {
                setValue(field?.name, {
                  ...getValues(field?.name),
                  [language.code]: event.target.value,
                });
              }}
              id={`${field?.name}-${language.code}`}
              name={`${field?.name}-${language.code}`}
              value={
                getValues(field?.name) && getValues(field?.name)[language.code]
                  ? getValues(field?.name)[language.code]
                  : ""
              }
              placeholder={field?.placeholder || field.title}
              aria-invalid={
                errors &&
                errors[field?.name] &&
                errors[field?.name][language.code]
                  ? "true"
                  : "false"
              }
              type={field?.type || "text"}
              className={classNames("w-100", {
                "border-danger":
                  errors &&
                  errors[field?.name] &&
                  errors[field?.name][language.code],
              })}
            />
          </Col>
          <Col xs={12}>
            {errors[field?.name] && (
              <p className="text-danger" role="alert">
                {errors &&
                  errors[field?.name] &&
                  errors[field?.name][language.code] &&
                  errors[field?.name][language.code].message}
              </p>
            )}
          </Col>
        </Row>
      </Form.Group>
    </Col>
  ));
}
