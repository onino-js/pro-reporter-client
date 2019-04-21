import * as React from "react";
import { Flex } from "../../components/ui/Flex";

export const NoReport = () => (
  <Flex dir="c" alignH="center" alignV="center" flex={1}>
    <p style={{ fontSize: "1.2em" }}>Aucun rapprort </p>
    <p>
      Veuillez créer un nouveau document en cliquant sur la touche "+" en bas à
      gauche de l'écran.
    </p>
    <p>Ou bien charger un ou plusieurs documents dans le menu "fichiers"</p>
  </Flex>
);
