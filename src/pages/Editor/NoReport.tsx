import * as React from "react";
import { Flex } from "../../components/ui/Flex";

export const NoReport = () => (
  <Flex dir="c" alignH="center" alignV="center">
    <p style={{ fontSize: "1.2em" }}>Aucun rapprort </p>
    <p>
      Veuillez créer un rapport en cliquant sur la touche "+" en bas à gauche de
      l'écran{" "}
    </p>
  </Flex>
);
