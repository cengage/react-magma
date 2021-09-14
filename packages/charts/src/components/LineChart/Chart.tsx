import * as React from 'react';
import { styled, ThemeContext } from 'react-magma-dom';

import { LineChart, LineChartProps } from './LineChart';
import { ChartDataTable } from './ChartDataTable';
import {
  Heading,
  Paragraph,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
  TypographyVisualStyle,
} from 'react-magma-dom';

interface BaseChartProps {
  description?: string;
  testId?: string;
  title: string;
  type: string;
}
export interface ChartProps<T extends any>
  extends BaseChartProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    LineChartProps<T> {}

const StyledHeading = styled.p`
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size04.fontSize};
  font-weight: 600;
  line-height: ${props => props.theme.typeScale.size04.lineHeight};
  margin: 0 0 12px 0;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  margin: 0 0 18px 0;
`;

const StyledTabsContainer = styled(TabsContainer)`
  width: 800px;
  ul {
    box-shadow: inset 0 -1px 0 ${props => props.theme.colors.neutral06};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 22px 0;
`;

function BaseChart<T>(
  props: ChartProps<T>,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  const { description, title, testId, type, ...other } = props;
  const firstTabRef = React.useRef<HTMLButtonElement>();
  const theme = React.useContext(ThemeContext);

  return (
    <div ref={ref}>
      <StyledHeading theme={theme}>{title}</StyledHeading>
      {description && (
        <StyledParagraph
          theme={theme}
          visualStyle={TypographyVisualStyle.bodySmall}
        >
          {description}
        </StyledParagraph>
      )}
      <StyledTabsContainer theme={theme}>
        <Tabs aria-label="Line Chart Demo">
          <Tab ref={firstTabRef}>Chart</Tab>
          <Tab>Data</Tab>
        </Tabs>
        <TabPanelsContainer>
          <StyledTabPanel theme={theme}>
            {type === 'line' && (
              <LineChart<T> {...other} tabRef={firstTabRef} />
            )}
          </StyledTabPanel>
          <StyledTabPanel theme={theme}>
            <StyledHeading level={5} theme={theme}>
              {title}
            </StyledHeading>
            {description && (
              <StyledParagraph
                theme={theme}
                visualStyle={TypographyVisualStyle.bodySmall}
              >
                {description}
              </StyledParagraph>
            )}
            <ChartDataTable
              data={other.data}
              xData={{
                keyValue: other.x,
                label: other.componentProps?.xAxis?.label,
                tickFormat: other.componentProps?.xAxis?.tickFormat,
              }}
              yData={{
                keyValue: other.y,
                tickFormat: other.componentProps?.yAxis?.tickFormat,
              }}
            />
          </StyledTabPanel>
        </TabPanelsContainer>
      </StyledTabsContainer>
    </div>
  );
}

export const Chart = React.forwardRef(BaseChart) as <T>(
  props: ChartProps<T> & { ref?: React.MutableRefObject<HTMLDivElement> }
) => ReturnType<typeof BaseChart>;
