import React, { FC } from "react";
import { MDBContainer, MDBProgress, MDBTooltip } from "mdbreact";

export interface ILineConfig {
  height: string;
  symbol?: string;
  dataKey: string;
  nameKey: string;
}

interface IData {
  [name: string]: string | number;
}

interface IProps {
  data: IData[];
  config: ILineConfig;
}

const LineGraphic: FC<IProps> = ({ data, config }: IProps) => {
  const { height, symbol, dataKey, nameKey } = config;

  let totalAmount = 0;
  for (let i = 0; i < data.length; i++) {
    totalAmount += data[i][dataKey] as number;
  }

  const colours = ["success", "info", "warning", "danger"];

  return (
    <MDBContainer className="text-center">
      {data.map((element: any, index: number) => {
        const value: number = element[dataKey];

        const percentage = `${(value / totalAmount) * 100}`
          .toString()
          .substr(0, 4);

        return (
          <MDBTooltip key={index} placement="top">
            <div
              style={{
                width: `${(value / totalAmount) * 100}%`,
                display: "inline-block"
              }}
            >
              <MDBProgress
                className="rounded-0"
                material
                value={100}
                height={height}
                color={colours[index % 4]}
              >
                {`${(value / totalAmount) * 100}`.toString().substr(0, 4)}%
              </MDBProgress>
            </div>
            <div>
              {/* TODO Add address check for blocky(?) */}
              <p>{`(BLOCKY) ${element[nameKey]}`}</p>
              <p>
                {`${value} ${symbol}`} ({`${percentage}%`})
              </p>
            </div>
          </MDBTooltip>
        );
      })}
    </MDBContainer>
  );
};

export default LineGraphic;
