import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorialStep {
  title: string;
  description: string;
  targetId?: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface TutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export const Tutorial = ({ steps, onComplete, onSkip }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentTutorialStep = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (currentTutorialStep.targetId) {
      const element = document.getElementById(currentTutorialStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
        // Scroll element into view
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep, currentTutorialStep.targetId]);

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getCardPosition = () => {
    if (!targetRect) {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      };
    }

    const position = currentTutorialStep.position || "bottom";
    const cardWidth = 400;
    const cardHeight = 250;
    const spacing = 20;

    switch (position) {
      case "top":
        return {
          top: `${targetRect.top - cardHeight - spacing}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          transform: "translateX(-50%)"
        };
      case "bottom":
        return {
          top: `${targetRect.bottom + spacing}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          transform: "translateX(-50%)"
        };
      case "left":
        return {
          top: `${targetRect.top + targetRect.height / 2}px`,
          left: `${targetRect.left - cardWidth - spacing}px`,
          transform: "translateY(-50%)"
        };
      case "right":
        return {
          top: `${targetRect.top + targetRect.height / 2}px`,
          left: `${targetRect.right + spacing}px`,
          transform: "translateY(-50%)"
        };
      default:
        return {
          top: `${targetRect.bottom + spacing}px`,
          left: `${targetRect.left + targetRect.width / 2}px`,
          transform: "translateX(-50%)"
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      {/* Overlay with cutout for highlighted element */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm">
        {targetRect && (
          <>
            {/* Spotlight effect */}
            <div
              className="absolute bg-transparent border-4 border-primary rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] animate-pulse transition-all duration-300"
              style={{
                top: `${targetRect.top - 8}px`,
                left: `${targetRect.left - 8}px`,
                width: `${targetRect.width + 16}px`,
                height: `${targetRect.height + 16}px`,
              }}
            />
          </>
        )}
      </div>

      {/* Tutorial Card */}
      <Card 
        className={cn(
          "fixed w-[400px] shadow-elegant animate-scale-in",
          !targetRect && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        style={targetRect ? getCardPosition() : undefined}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">{currentTutorialStep.title}</CardTitle>
              <CardDescription>
                Step {currentStep + 1} of {steps.length}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {currentTutorialStep.description}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              size="sm"
            >
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
