import React, { useState, useEffect } from 'react';
import { VictoryAxisProps } from 'victory';

import { Card, Datagrid, Spinner } from 'react-magma-dom';

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z 0-9]/gi, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, index) =>
      index === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
    )
    .replace(/\s+/g, '');
}

export interface DataTableProps {
  data?: any[];
  xData: {
    keyValue?: string | number | symbol;
    label?: VictoryAxisProps['label'];
    tickFormat?: Partial<VictoryAxisProps['tickFormat']>;
    tickValues?: VictoryAxisProps['tickValues'];
  };
  yData: {
    keyValue?: string | number | symbol;
    tickFormat?: Partial<VictoryAxisProps['tickFormat']>;
  };
}

export const ChartDataTable = (props: DataTableProps) => {
  const {
    data = [],
    xData: {
      keyValue: xKeyValue,
      label: xAxisLabel,
      tickFormat: xTickFormat,
      tickValues: xTickValues,
    },
    yData: { keyValue: yKeyValue, tickFormat: yTickFormat },
  } = props;
  const [dataForTable, setDataForTable] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    setDataForTable(convertData());
  }, [data]);

  function convertData() {
    const xField = toCamelCase((xKeyValue || xAxisLabel || 'x') as string);
    const xTickValuesArray = data.reduce((valuesArray, { data: dataset }) => {
      dataset.forEach((datum: any) => {
        const value = datum.x || (xKeyValue && datum[xKeyValue]);
        !valuesArray.includes(value) && valuesArray.push(value);
      });

      return valuesArray;
    }, []);

    let baseTableData = {
      columns:
        xTickValuesArray.length > 0
          ? [
              {
                field: xField,
                header: xAxisLabel || xKeyValue || 'X',
                isRowHeader: true,
              },
            ]
          : [],
      rows: xTickValuesArray.reduce(
        (agg: any[], tick: number, index: number) => {
          const tickValue =
            xTickValues &&
            typeof tick === 'number' &&
            xTickValues.length === xTickValuesArray.length
              ? xTickFormat && typeof xTickFormat === 'function'
                ? xTickFormat(xTickValues[tick - 1])
                : xTickValues[tick - 1]
              : xTickFormat && Array.isArray(xTickFormat)
              ? xTickFormat[tick - 1]
              : xTickFormat && typeof xTickFormat === 'function'
              ? xTickFormat(tick)
              : tick;
          agg.push({
            [xField]: tickValue,
            id: index,
          });

          return agg;
        },
        []
      ),
    };

    return data.reduce((tableData, datum) => {
      const { name: header, data: dataset } = datum;
      const field = toCamelCase(header);

      tableData.columns.push({
        field,
        header,
      });

      dataset.forEach((d: any, i: number) => {
        const yValue =
          d.y || d.y === 0 ? d.y : undefined || (yKeyValue && d[yKeyValue]);
        tableData.rows[i] = {
          ...tableData.rows[i],
          id: baseTableData.rows.length > 0 ? i + 1 : i,
          [field]:
            yTickFormat && typeof yTickFormat === 'function'
              ? yTickFormat(yValue)
              : yValue,
        };
      });

      return tableData;
    }, baseTableData);
  }

  return (
    <Card>
      {dataForTable.rows.length > 0 ? (
        <Datagrid
          hasPagination={false}
          columns={dataForTable.columns}
          rows={dataForTable.rows}
        />
      ) : (
        <Spinner />
      )}
    </Card>
  );
};
