import React from "react";
import { Masthead } from "../components/Masthead";
import { NetlifyFooter } from "../components/NetlifyFooter";

const GeneralLayout = ({ children, ...info }) => {
  return (
    <div>
      <Masthead />
      <main>
        <div>{children}</div>
      </main>

      <NetlifyFooter />
    </div>
  );
};

export default GeneralLayout;