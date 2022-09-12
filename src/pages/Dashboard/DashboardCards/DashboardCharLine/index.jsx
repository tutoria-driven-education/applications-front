import React from "react";
import { ChartLine } from "../../../../components/Charts/Line";
import { DashboardCard } from "../DashboardCard";
import {
  ColumnChart,
  Label,
  LabelIndicator,
  LabelInfo,
  LineLabels,
} from "./style";

export const DashboardCharLine = ({
  infos,
  labels,
  title,
  minWidth,
  minHeight,
}) => {
  return (
    <DashboardCard
      minWidth={minWidth}
      minHeight={minHeight}
      title={title}
      theme={"light"}
    >
      <ColumnChart>
        <ChartLine infos={infos} labels={labels} />
        <LineLabels>
          {infos.map(({ name, color }) => (
            <Label key={name}>
              <LabelIndicator background={color} />
              <LabelInfo>{name}</LabelInfo>
            </Label>
          ))}
        </LineLabels>
      </ColumnChart>
    </DashboardCard>
  );
};
