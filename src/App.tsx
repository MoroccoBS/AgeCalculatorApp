import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import Display from "./components/Display";
import { ChangeEvent, useState, useCallback } from "react";

function App() {
  const [dayValue, setDayValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [errorTypeDay, setErrorTypeDay] = useState("");
  const [errorTypeMonth, setErrorTypeMonth] = useState("");
  const [errorTypeYear, setErrorTypeYear] = useState("");
  const [ageDay, setAgeDay] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);
  const [ageYear, setAgeYear] = useState(0);
  const Errors = [
    "This field is required",
    "Must be a valid",
    "Must be in the past",
    "Must be in the future",
  ];

  const CalculateAge = () => {
    console.log(dayError, monthError, yearError);
    if (dayError === true || monthError === true || yearError === true) {
      return;
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    const currentDay = currentDate.getDate();

    const parsedDay = parseInt(dayValue);
    const parsedMonth = parseInt(monthValue);
    const parsedYear = parseInt(yearValue);

    const calculatedAgeDay = parsedDay - currentDay;
    let calculatedAgeMonth = currentMonth - parsedMonth;
    let calculatedAgeYear = currentYear - parsedYear;

    if (
      calculatedAgeMonth < 0 ||
      (calculatedAgeMonth === 0 && calculatedAgeDay < 0)
    ) {
      calculatedAgeYear--;
      calculatedAgeMonth += 12;
    }

    setAgeDay(calculatedAgeDay);
    setAgeMonth(calculatedAgeMonth);
    setAgeYear(calculatedAgeYear);
  };

  const ErrorCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!/^\d{0,2}$/.test(inputValue)) {
      return;
    } else {
      setDayValue(inputValue);
    }
  }, []);

  const ErrorCheckMonth = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!/^\d{0,2}$/.test(inputValue)) {
      return;
    } else {
      setMonthValue(inputValue);
    }
  }, []);

  const ErrorCheckYear = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!/^\d{0,4}$/.test(inputValue)) {
      return;
      // setYearError(true);
    } else {
      setYearValue(inputValue);
    }
  }, []);

  const RangeCheck = useCallback((value: number, label: string) => {
    switch (label) {
      case "Day":
        if (value < 1 || value > 31) {
          setDayError(true);
          setErrorTypeDay(`${Errors[1]} ${label}`);
        } else {
          setDayError(false);
        }
        break;
      case "Month":
        if (value < 1 || value > 12) {
          setMonthError(true);
          setErrorTypeMonth(`${Errors[1]} ${label}`);
        } else {
          setMonthError(false);
        }
        break;
      case "Year":
        if (value > 2022 || value < 1900) {
          if (value > 2023) {
            setYearError(true);
            setErrorTypeYear(`${Errors[2]}`);
          }
          if (value < 1900) {
            setYearError(true);
            setErrorTypeYear(`${Errors[3]}`);
          }
        } else {
          setYearError(false);
        }
        break;
      default:
        break;
    }
  }, []);

  const handleClick = () => {
    if (dayValue === "") {
      setDayError(true);
      setErrorTypeDay(Errors[0]);
    }
    if (monthValue === "") {
      setMonthError(true);
      setErrorTypeMonth(Errors[0]);
    }
    if (yearValue === "") {
      setYearError(true);
      setErrorTypeYear(Errors[0]);
    }
    RangeCheck(parseInt(dayValue), "Day");
    RangeCheck(parseInt(monthValue), "Month");
    RangeCheck(parseInt(yearValue), "Year");
    if (dayValue !== "" && monthValue !== "" && yearValue !== "") {
      CalculateAge();
    }
  };

  return (
    <>
      <div className="App">
        <div className="inputContainer">
          <Input
            label="Day"
            placeholder="MM"
            error={dayError}
            value={dayValue}
            errorType={errorTypeDay}
            ErrorCheck={ErrorCheck}
            ErrorCheckYear={ErrorCheckYear} // Add ErrorCheckYear prop
          ></Input>
          <Input
            label="Month"
            placeholder="DD"
            error={monthError}
            value={monthValue}
            errorType={errorTypeMonth}
            ErrorCheck={ErrorCheckMonth}
            ErrorCheckYear={ErrorCheckYear} // Add ErrorCheckYear prop
          ></Input>
          <Input
            label="Year"
            placeholder="YYYY"
            error={yearError}
            value={yearValue}
            errorType={errorTypeYear}
            ErrorCheck={ErrorCheck}
            ErrorCheckYear={ErrorCheckYear} // Add ErrorCheckYear prop
          ></Input>
        </div>
        <Button onClick={handleClick}></Button>
        <div className="display-container">
          <Display label="Year" children={ageYear}></Display>
          <Display
            label="Month"
            children={ageMonth < 10 && ageMonth > 0 ? `0${ageMonth}` : ageMonth}
          ></Display>
          <Display
            label="Day"
            children={ageDay < 10 && ageDay > 0 ? `0${ageDay}` : ageDay}
          ></Display>
        </div>
      </div>
    </>
  );
}

export default App;
