import React, { FC, useState, useEffect } from "react";
import { MDBRow, MDBCol } from "mdbreact";

interface IProps {
  type: number;
  active: boolean;
  done: boolean;
  failed: boolean;
  logLines: string[];
}

enum STEP {
  Waiting,
  Start,
  // Sign,
  // View, // View on Etherscan should display after tx is signed but we are not currently handling this TODO (?)
  Confirmed,
  Failed
}

export const OrganisationLine: FC<IProps> = ({
  type,
  active,
  done,
  failed,
  logLines
}: IProps) => {
  const [step, setStep] = useState<STEP>(STEP.Waiting);
  const [lastLog, setLastLog] = useState<string>(
    type === 0 ? "Start Installation" : "Waiting"
  );

  useEffect(() => {
    if (done) {
      if (step === STEP.Confirmed) return;
      setStep(STEP.Confirmed);
      return;
    }

    if (failed) {
      if (step === STEP.Failed) return;
      console.log("settin failed");
      setStep(STEP.Failed);
      return;
    }

    if (!active) {
      if (step === STEP.Waiting) return;
      setStep(STEP.Waiting);
      return;
    }

    if (step === STEP.Start) return;
    setStep(STEP.Start);
  }, [active, done, step, failed]);

  useEffect(() => {
    if (done || (!active && !failed)) return;
    if (logLines.length > 0) setLastLog(logLines[logLines.length - 1]);
  }, [logLines, active, done, failed]);

  const Output: FC = () => {
    let text = undefined;

    switch (step) {
      case STEP.Waiting:
        text = type === 0 ? "Start Installation" : "Waiting";
        break;

      case STEP.Start:
        text = lastLog;
        break;

      case STEP.Confirmed:
        text = "Confirmed";
        break;

      case STEP.Failed:
        text = lastLog;
        break;

      default:
        console.log("Unimplemented step");
    }

    return <div style={{ float: "right" }}>{text}</div>; // Should link to txHash
  };

  return (
    <MDBRow>
      <MDBCol size="2">ICON</MDBCol>
      <MDBCol size="5">
        <div>
          {type === 0 ? "Create Organisation" : "Configure Organisation"}
        </div>
      </MDBCol>
      <MDBCol size="5">
        <Output />
      </MDBCol>
    </MDBRow>
  );
};

export default OrganisationLine;
