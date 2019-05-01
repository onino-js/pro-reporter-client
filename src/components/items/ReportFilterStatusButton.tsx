import * as React from "react";
import { ProDropdown, ActionButton } from "../../components/ui/Buttons";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Istatus } from "../../models/app.models";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ProMenuItem } from "../ui/ProMenu";
import { select } from "d3";

interface menuItem {
  title: string;
  icon?: IconProp;
  status: Istatus | null;
}

interface IReportFilterStatusButtonProps {
  filterStatus: (s: Istatus | null) => void;
  selectedStatus: Istatus | null;
}

const menuItems: menuItem[] = [
  {
    title: "Tous les status",
    status: null,
  },
  {
    title: "Nouveau",
    status: "new",
    icon: "kiwi-bird",
  },
  {
    title: "Warnings",
    status: "warning",
    icon: "exclamation-triangle",
  },
  {
    title: "Erreurs",
    status: "error",
    icon: "bug",
  },
  {
    title: "Valides",
    status: "valid",
    icon: "check",
  },
];

export const ReportFilterStatusButton = ({
  filterStatus,
  selectedStatus,
}: IReportFilterStatusButtonProps) => (
  <ProDropdown
    trigger={["click"]}
    overlay={
      <Menu style={{ maxWidth: "300px" }}>
        {menuItems.map((s, index) => (
          <ProMenuItem
            key={"status-choice-" + index}
            onClick={() => filterStatus(s.status)}
          >
            {s.title}
            {s.icon && <FontAwesomeIcon icon={s.icon} />}
          </ProMenuItem>
        ))}
      </Menu>
    }
  >
    <ActionButton
      title={
        selectedStatus
          ? menuItems.find(i => i.status === selectedStatus)!.title
          : "Tous les status"
      }
      icon="chevron-down"
      size="big"
      m="0px 5px"
    />
  </ProDropdown>
);
