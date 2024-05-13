import React, { PropsWithChildren } from "react";
import { providers } from "./constants";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      {providers.reduceRight(
        (prevProviders, Provider) => (
          <Provider>{prevProviders}</Provider>
        ),
        children
      )}
    </>
  );
}
