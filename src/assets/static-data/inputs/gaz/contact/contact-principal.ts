export default [
  {
    title: "Titre",
    id: "contact-principal-title",
    sectionId: "section-contact",
    subSectionId: "section-contact-contact-principal",
    type: "single-select",
    mandatory: true,
    value: "",
    options: {
      values: ["Mme", "M"],
    },
  },
  {
    title: "Prénom",
    id: "contact-principal-complete-name",
    sectionId: "section-contact",
    subSectionId: "section-contact-contact-principal",
    type: "string",
    mandatory: true,
    value: "",
  },
  {
    title: "Nom de famille",
    id: "contact-principal-lastname",
    sectionId: "section-contact",
    subSectionId: "section-contact-contact-principal",
    type: "string",
    mandatory: true,
    value: "",
    documentation: "Nom de famille du contact principal",
    options: {
      list: ["Pinard", "Sourdois"],
    },
  },
  {
    title: "Occupation",
    id: "contact-principal-occupation",
    sectionId: "section-contact",
    subSectionId: "section-contact-contact-principal",
    type: "single-select",
    mandatory: true,
    value: "",
    options: {
      values: ["Propriétaire", "Locataire"],
    },
  },
];
