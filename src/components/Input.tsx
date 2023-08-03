import "./Input.css";
import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  error: boolean;
  value: string;
  errorType: string;
  ErrorCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  ErrorCheckYear: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  placeholder,
  error,
  value,
  errorType,
  ErrorCheck,
  ErrorCheckYear,
}: InputProps) {
  // const ErrorHandling = () => {
  //   return error && <p className="errorPop">{`${errorType} ${label}`}</p>;
  // };
  return (
    <>
      <div className={error ? "input error" : "input"}>
        <h2 className="titleInput">{label}</h2>
        <input
          value={value}
          placeholder={placeholder}
          onChange={
            label === "Month" || label === "Day" ? ErrorCheck : ErrorCheckYear
          }
        ></input>
        {error && <p className="errorPop">{errorType}</p>}
      </div>
    </>
  );
}

export default Input;
