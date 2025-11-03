import "./App.css";
import { StepDialog, Step, useStepDialog } from "steps-dialog";
import { z } from "zod";
import { Layout as FirstStepLayout } from "./Steps/FirstStep/Layout";
import { Layout as SecondStepLayout } from "./Steps/SecondStep/Layout";
import { Layout as ThirdStepLayout } from "./Steps/ThirdStep/Layout";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Define custom props types for each step
type FirstStepProps = {
  customMessage: string;
  showHint: boolean;
};

type SecondStepProps = {
  minAge: number;
  maxAge: number;
};

type ThirdStepProps = {
  showSummary: boolean;
  theme: "dark" | "light";
};

function App() {
  const dialog = useStepDialog();

  // Define props to pass to each step
  const firstStepProps: FirstStepProps = {
    customMessage: "Please enter your full name",
    showHint: true,
  };

  const secondStepProps: SecondStepProps = {
    minAge: 18,
    maxAge: 100,
  };

  const thirdStepProps: ThirdStepProps = {
    showSummary: true,
    theme: "light",
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={dialog.openDialog}>Open Step Dialog</button>
        <StepDialog {...dialog.dialogProps}>
          <Step
            id="first"
            title="first step"
            validationSchema={z.object({
              name: z.string().min(4, "Name must be at least 3 characters long"),
            })}
          >
            <FirstStepLayout
              customMessage={firstStepProps.customMessage}
              showHint={firstStepProps.showHint}
            />
          </Step>
          <Step
            id="second"
            title="second step"
            validationSchema={z.object({
              age: z.number().min(4, "Age must be at least 4").default(8),
            })}
          >
            <SecondStepLayout
              minAge={secondStepProps.minAge}
              maxAge={secondStepProps.maxAge}
            />
          </Step>
          <Step
            id="third"
            title="third step"
            validationSchema={z.object({})}
          >
            <ThirdStepLayout
              showSummary={thirdStepProps.showSummary}
              theme={thirdStepProps.theme}
            />
          </Step>
        </StepDialog>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
