import * as React from "react";
import { Flex } from "../../components/ui/Flex";

export const NoTemplate: React.SFC = () => (
  <Flex dir="c" alignH="center" alignV="center" flex={1}>
    <p style={{ fontSize: "1.2em" }}>Aucun template selectionné </p>
    <p>
      Veuillez sélectionner un template dans le menu en haut à gauche de la
      fenêtre l'écran
    </p>
    <p>Ou bien charger un ou plusieurs documents dans le menu "fichiers"</p>
  </Flex>
);
