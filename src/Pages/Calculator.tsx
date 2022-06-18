import { useEffect, useState } from "react";
import "./Calculator.scss";

export default function Calculator() {
  const [newValue, setNewValue] = useState<string>("");
  const [oldValue, setOldValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [operand, setOperand] = useState<string>("");
  const [showDetails, setShowDetails] = useState<string>("");
  const [equalToPressed, setEqualToPressed] = useState<boolean>(false);
  const[changeSignToggle, setChangeSignToggle] = useState<boolean>(false);


  // This is function for calculation part of the calculator which takes the operand as parameter and uses the new value and set the result
  const calculation = (val: string) => {
    if (operand === "+") {
      setResult(Number(oldValue) + Number(newValue));
      setOldValue(String(Number(oldValue) + Number(newValue)));
      setNewValue("");
      setOperand(val);
    } else if (operand === "-") {
      setResult(Number(oldValue) - Number(newValue));
      setOldValue(String(Number(oldValue) - Number(newValue)));
      setNewValue("");
      setOperand(val);
    } else if (operand === "*") {
      setResult(Number(oldValue) * Number(newValue));
      setOldValue(String(Number(oldValue) * Number(newValue)));
      setNewValue("");
      setOperand(val);
    } else if (operand === "/") {
      setResult(Number(oldValue) / Number(newValue));
      setOldValue(String(Number(oldValue) / Number(newValue)));
      setNewValue("");
      setOperand(val);
    }
  };

  // This is the function which takes the value and set accordingly as new value and old value

  const buttonPresses = (value: string) => {
    if(equalToPressed){
      setOldValue("");
      setNewValue(value);
      setOperand("");
    setShowDetails( value);
      setEqualToPressed(false);
    }
    else{
    setNewValue(newValue + value);
    setShowDetails(showDetails + value);
    }
  };

  // This function take operand as parameter and set the operand
  const operandPressed = async (val: string) => {
    if(equalToPressed){
      setOldValue("");
      setNewValue("");
      setOperand(val);
      setShowDetails(val);
      setEqualToPressed(false);
    }
   else{
    setShowDetails(showDetails + val);
    if (operand !== "") {
      //  setNewOperand(val);
       calculation(val);
    } else {
        setOperand(val);
        setOldValue(newValue);
        setNewValue("");

    }
   }
  };

// This is the function which clear all and reset the calculator
  const clearAll = () => {
    setNewValue("");
    setOldValue("");
    setResult(0);
    setOperand("");
    setShowDetails("");
  }

  //This is the function which called when equal to function pressed and calling the same function calculation

  const equalPressed =  () => {
    if(operand !== ""){
        calculation(operand);
     setEqualToPressed(true);
    }else{
      setResult(Number(newValue));
    }
   
  }

  //This is the function which called when change sign function pressed and change the +ve to -ve and -ve to +ve accordingly
  const changeSign = () => {
    if(newValue !== ""){
      setChangeSignToggle(!changeSignToggle);
    setNewValue(String(Number(newValue) * -1));
    if(changeSignToggle)
    setShowDetails(showDetails.slice( 0, -2) + String(Number(newValue) * -1));
    else
    setShowDetails(showDetails.slice( 0, -1) + String(Number(newValue) * -1));
    }
  }
// This function called when x2 is pressed and I am just square the value.
  const x2 = () => {
    if(equalToPressed){
      setNewValue(String(Number(result) * Number(result)));
      setShowDetails( String(Number(result) * Number(result)));
      setEqualToPressed(false);
    }else{
          setNewValue(String(Number(newValue) * Number(newValue)));
    setShowDetails(showDetails.slice( 0, -1) + String(Number(newValue) * Number(newValue)));
    }

  }

  //This is the function which called when decimal function pressed and add the decimal point to the number

  const pointButtonPressed = () => {
    if(equalToPressed){
      setNewValue("0.");
      setShowDetails("0.");
      setEqualToPressed(false);
    }
    else{
      if(!newValue.includes(".")){
        setNewValue(newValue + ".");
        setShowDetails(showDetails + ".");
      }
    }
  }



  return (
    <div className="min-h-screen bg-[#DAF0FF] flex justify-center items-center">
      <div className="max-h-[95vh] calculator p-5">
        <div className=" flex w-full items-end flex-col pt-[25%]">
          <div className="text-2xl font-normal text-[#818181]">
            {showDetails}  { equalToPressed ? " = " + result : ""}
          </div>
          <div className="text-5xl font-medium text-[#424242] my-5">
            {result}
          </div>
        </div>

        <div className="flex text-[#7CC9FF] gap-5">
          <div className="common-button">C</div>
          <div className="common-button" onClick={changeSign}> + / -</div>
          {/* <div className="common-button"> % </div> */}
          {/* <div className="common-button" onClick={x2}>
            {" "}
            x <sup>2</sup>{" "}
          </div> */}
        </div>

        <div className="flex text-[#7CC9FF] gap-5 mt-3">
          <div className="back-space" onClick={clearAll}>Ac</div>
          {/* <div className="back-space">
            {" "}
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5353 1.11994e-08H21.0003C21.2655 1.11994e-08 21.5199 0.105357 21.7074 0.292893C21.8949 0.48043 22.0003 0.734784 22.0003 1V17C22.0003 17.2652 21.8949 17.5196 21.7074 17.7071C21.5199 17.8946 21.2655 18 21.0003 18H6.5353C6.37071 18 6.20865 17.9594 6.06352 17.8818C5.91838 17.8042 5.79465 17.6919 5.7033 17.555L0.370298 9.555C0.260659 9.39067 0.202148 9.19755 0.202148 9C0.202148 8.80245 0.260659 8.60933 0.370298 8.445L5.7033 0.445C5.79465 0.308084 5.91838 0.195832 6.06352 0.118205C6.20865 0.0405779 6.37071 -2.46193e-05 6.5353 1.11994e-08ZM7.0703 2L2.4043 9L7.0703 16H20.0003V2H7.0703ZM13.0003 7.586L15.8283 4.757L17.2433 6.172L14.4143 9L17.2433 11.828L15.8283 13.243L13.0003 10.414L10.1723 13.243L8.7573 11.828L11.5863 9L8.7573 6.172L10.1723 4.757L13.0003 7.586Z"
                fill="#858585"
              />
            </svg>
          </div> */}
          <div className="back-space" onClick={x2}>
            {" "}
            x <sup>2</sup>{" "}
          </div>
          <div className="blue-button h-16" onClick={() => operandPressed("/")}>
            {" "}
            /{" "}
          </div>
          <div className="blue-button h-16" onClick={() => operandPressed("*")}>
            {" "}
            *{" "}
          </div>
        </div>

        <div className="flex text-[#7CC9FF] gap-5 mt-3">
          <div className="number-button" onClick={() => buttonPresses("7")}>
            7
          </div>
          <div className="number-button" onClick={() => buttonPresses("8")}>
            8
          </div>
          <div className="number-button" onClick={() => buttonPresses("9")}>
            {" "}
            9{" "}
          </div>
          <div className="blue-button h-16" onClick={() => operandPressed("-")}>
            {" "}
            -{" "}
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <div className=" flex gap-5 mt-3">
              <div className="number-button" onClick={() => buttonPresses("4")}>
                {" "}
                4{" "}
              </div>
              <div className="number-button" onClick={() => buttonPresses("5")}>
                {" "}
                5{" "}
              </div>
              <div className="number-button" onClick={() => buttonPresses("6")}>
                {" "}
                6{" "}
              </div>
            </div>
            <div className=" flex gap-5 mt-3">
              <div className="number-button" onClick={() => buttonPresses("1")}>
                {" "}
                1{" "}
              </div>
              <div className="number-button" onClick={() => buttonPresses("2")}>
                {" "}
                2{" "}
              </div>
              <div className="number-button" onClick={() => buttonPresses("3")}>
                {" "}
                3{" "}
              </div>
            </div>

            <div className=" flex gap-5 mt-3">
              <div
                className="bg-white rounded-xl border-white flex items-center justify-center h-16 w-[70%] text-[#109DFF] cursor-pointer"
                onClick={() => buttonPresses("0")}
              >
                {" "}
                0{" "}
              </div>
              <div className="number-button" onClick={pointButtonPressed}> . </div>
            </div>
          </div>

          <div>
            <div
              className="blue-button h-24 mt-3"
              onClick={() => operandPressed("+")}
            >
              {" "}
              +{" "}
            </div>

            <div className="equal-to-button" onClick={equalPressed}> = </div>
          </div>
        </div>
      </div>
    </div>
  );
}
