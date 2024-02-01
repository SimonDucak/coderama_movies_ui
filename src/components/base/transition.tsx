import { Transition as TailwindTransition } from "@tailwindui/react";

export type TransitionProps = {
  children?: React.ReactNode;
  delay?: number;
  translateBottom?: boolean;
  fade?: boolean;
};

export const Transition = ({
  children,
  delay = 100,
  translateBottom = false,
  fade = true,
}: TransitionProps) => {
  const enterFrom = `${fade ? "opacity-0" : ""} ${
    translateBottom ? "translate-y-3" : ""
  }`.trim();

  const enterTo = `${fade ? "opacity-100" : ""} ${
    translateBottom ? "translate-y-0" : ""
  }`.trim();

  return (
    <TailwindTransition
      show={true}
      enter={`transition-all duration-400 delay-${delay}`}
      enterFrom={enterFrom}
      enterTo={enterTo}
    >
      {children}
    </TailwindTransition>
  );
};
