import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import ConsentLetterForm from "./stepsForm/ConsentLetterForm";
import { LeadResponseType } from "@/types/lead";
import EFDMSForm from "./stepsForm/EFDMSForm";
import OnBoardingForm from "./stepsForm/OnBoardingForm";

const onBoardingStage = ["Consent Letter", "EFDMS", "OnBoarding"];

const OnBoardingTab = ({
  lead,
  resetFormKey,
}: {
  lead: LeadResponseType | undefined;
  resetFormKey: any;
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  React.useEffect(() => {
    if (lead) {
      setActiveStep(
        onBoardingStage.indexOf(lead.onBoardingStage || "Consent Letter")
      );
    }
  }, [lead]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="my-5">
            <ConsentLetterForm lead={lead!} resetFormKey={resetFormKey} />
          </div>
        );
      case 1:
        return (
          <div className="my-5">
            <EFDMSForm lead={lead!} />
          </div>
        );
      case 2:
        return (
          <div className="my-5">
            <OnBoardingForm lead={lead!} />
          </div>
        );
      default:
    }
  };

  return (
    <div className="flex flex-col w-full col-span-3">
      <Stepper
        activeStep={activeStep}
        sx={{
          width: "100%",
        }}
      >
        {onBoardingStage.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderSteps(activeStep)}

      <div className="flex flex-row pt-2">
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === onBoardingStage.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default OnBoardingTab;
