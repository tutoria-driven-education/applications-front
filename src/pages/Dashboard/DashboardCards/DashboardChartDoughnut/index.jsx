import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { ChartDoughnut } from "../../../../components/Charts/Doughnut";
import { DashboardCard } from "../DashboardCard";
import {
  ColumnChart,
  Label,
  LabelIndicator,
  LabelInfo,
  LineLabels,
} from "./style";

export const DashboardChartDoughnut = ({
  infos,
  labels,
  colors,
  title,
  minWidth,
  minHeight,
}) => {
  return (
    <DashboardCard
      minHeight={minHeight}
      minWidth={minWidth}
      title={title}
      theme={"light"}
    >
      <ColumnChart>
        <ChartDoughnut infos={infos} labels={labels} colors={colors} />
        <LineLabels>
          {labels.map((name, index) => {
            return (
              <Label key={name}>
                <LabelIndicator background={colors[index]} />
                <LabelInfo>
                  <b>{name}</b>
                  <BsArrowRight color="#000" />
                  {infos[index]}
                </LabelInfo>
              </Label>
            );
          })}
        </LineLabels>
      </ColumnChart>
    </DashboardCard>
  );
};
