import React, { ReactNode } from "react";
import "./ErrorContainer.css";

interface Props {
  children: ReactNode;
}

function ErrorContainer({ children }: Props): JSX.Element {
  return <div className="error-container">{children}</div>;
}

export default ErrorContainer;
