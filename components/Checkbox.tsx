import React, { useState, ChangeEvent } from "react";

interface CheckboxProps {
  checkboxValues: {
    web: boolean;
    ios: boolean;
    android: boolean;
    desktop: boolean;
  };
  setCheckboxValues: React.Dispatch<
    React.SetStateAction<{
      web: boolean;
      ios: boolean;
      android: boolean;
      desktop: boolean;
    }>
  >;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checkboxValues,
  setCheckboxValues,
}) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <div className="flex gap-3 flex-col items-start w-full justify-evenly">
      <p className="text-white font-bold mb-2 mr-4 ">Select your platforms</p>
      <div className="flex flex-row w-full justify-evenly items-center mt-5 pt-3">
        <div className="mr-6">
          <input
            className="mr-2 leading-tight text-white"
            type="checkbox"
            id="web"
            name="web"
            checked={checkboxValues.web}
            onChange={handleCheckboxChange}
            style={{ marginRight: "0.5rem" }}
          />
          <label htmlFor="web" className="mr-2 text-white">
            Web
          </label>
        </div>
        <div className="mr-6">
          <input
            className="mr-2 leading-tight text-white"
            type="checkbox"
            id="ios"
            name="ios"
            checked={checkboxValues.ios}
            onChange={handleCheckboxChange}
            style={{ marginRight: "0.5rem" }}
          />
          <label htmlFor="ios" className="mr-2 text-white">
            iOS
          </label>
        </div>
        <div className="mr-6">
          <input
            className="mr-2 leading-tight text-white"
            type="checkbox"
            id="android"
            name="android"
            checked={checkboxValues.android}
            onChange={handleCheckboxChange}
            style={{ marginRight: "0.5rem" }}
          />
          <label htmlFor="android" className="mr-2 text-white">
            Android
          </label>
        </div>
        <div className="mr-6">
          <input
            className="mr-2 leading-tight text-white"
            type="checkbox"
            id="desktop"
            name="desktop"
            checked={checkboxValues.desktop}
            onChange={handleCheckboxChange}
            style={{ marginRight: "0.5rem" }}
          />
          <label htmlFor="desktop" className="mr-2 text-white">
            Desktop
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
