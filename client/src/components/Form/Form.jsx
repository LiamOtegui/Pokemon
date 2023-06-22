import React, { useState } from "react";
import style from "./Form.module.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = ({ formName, fields, button, action, validator }) => {

  const formFields = Object.keys(fields);

  const initialState = Object.entries(fields).reduce((acc, ele) => {
    acc[ele[0]] = ele[1]["value"];
    return acc;
  }, {});

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value }); // Estado de data.
    setErrors(validator({ ...data, [event.target.name]: event.target.value })); // Estado de errors.
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validator(data));

    if (Object.keys(errors).length) {
      alert(
        `${Object.keys(errors)
          .map((key) => errors[key])
          .join("\n")}`
      );
    } else {
      dispatch(action(data))
        .then((res) => {
          if (res.response.status === 200) {
            navigate(`/pokemons`);
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className={style.wrapper}>
      <form className={style.container} onSubmit={(event) => handleSubmit(event)}>
        <h1>{formName}</h1>
        <div className={`${style.content} ${formFields.length % 2 !== 0 && style.contentOdd}`}>
          {formFields.map((field) => {
            return (
              <div key={field} className={style.field}>
                <input
                  name={field}
                  type={fields[field].type}
                  value={data[field]} //
                  onChange={(event) => handleInputChange(event)} //
                  className={`${style.formFieldInput} ${errors[field] && style.warning}`}
                  placeholder={errors[field] || fields[field].name}
                />
                {errors[field] && (
                  <div>
                    {errors[field]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className={style.formButton} type={button.type}>
          {button.value}
        </button>
      </form>
    </div>
  );
};

export default Form;
