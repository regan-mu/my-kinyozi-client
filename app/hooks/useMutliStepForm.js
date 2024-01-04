import { useState } from "react";

const useMultipleStepForm = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const next = () => {
        if (currentStepIndex >= steps.length-1) {
            return currentStepIndex;
        } else {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    }
    const back = () => {
        if (currentStepIndex <= 0) {
            return currentStepIndex;
        } else {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    }

    const goto = (index) => {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        isLast: currentStepIndex === steps.length-1,
        isFirst: currentStepIndex === 0,
        steps,
        next,
        back,
        goto
    }
}

export default useMultipleStepForm;