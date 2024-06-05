import * as React from 'react';
import { css } from '@emotion/react';
import { KeyboardIcon } from 'react-magma-icons';

import { LineChart, LineChartProps } from './LineChart';
import { ChartDataTable } from './ChartDataTable';
import {
  Announce,
  ButtonVariant,
  Card,
  I18nContext,
  IconButton,
  Paragraph,
  Tab,
  TabPanel,
  TabPanelsContainer,
  Tabs,
  TabsContainer,
  ThemeContext,
  Tooltip,
  TypographyVisualStyle,
  useDescendants,
  styled
} from 'react-magma-dom';

interface BaseChartProps {
  /**
   * Description of what the line chart data represents placed above the chart
   */
  description?: string;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Title of the line chart
   */
  title: string;
  /**
   * Type of chart - for now just 'line' is accepted
   */
  type: string;
}
export interface ChartProps<T extends any>
  extends BaseChartProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    LineChartProps<T> {}

const StyledTitle = styled.span`
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size04.fontSize};
  font-weight: 600;
  font-family: ${props => props.theme.bodyFont};
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
    box-shadow: inset 0 -1px 0 ${props => props.theme.colors.neutral300};
  }
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 22px 0;
`;

const KeyboardInstructionsCard = styled(Card)<{
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
}>`
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  right: ${props => props.theme.spaceScale.spacing02};
  max-height: ${props =>
    props.maxHeight ? props.maxHeight : props.theme.dropdown.content.maxHeight};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing05}
    ${props => props.theme.spaceScale.spacing05};
  position: absolute;
  transition: opacity 0.3s;
  white-space: nowrap;
  z-index: 2;

  ${props =>
    props.width &&
    css`
      white-space: normal;
      width: ${props.width};
    `}
`;

function BaseChart<T>(props: ChartProps<T>, ref: React.Ref<HTMLDivElement>) {
  const { description, title, testId, type, ...other } = props;
  const keyboardInstructionsRef = React.useRef<HTMLButtonElement>(null);
  const lastFocusedScatterPoint = React.useRef<SVGPathElement>(null);
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [pointRefArray, registerPoint, unregisterPoint] = useDescendants();

  const [isKeyboardInstructionsOpen, setIsKeyboardInstructionsOpen] =
    React.useState<boolean>(false);

  function handleKeyboardInstructionsButtonBlur() {
    setIsKeyboardInstructionsOpen(false);
  }

  function handleKeyboardInstructionsButtonClick() {
    setIsKeyboardInstructionsOpen(prevOpen => !prevOpen);
  }

  function handleKeyboardInstructionsButtonKeydown(event: { preventDefault?: any; key?: any; shiftKey?: any; }) {
    const { key, shiftKey } = event;

    switch (key) {
      case 'Escape': {
        setIsKeyboardInstructionsOpen(false);
        break;
      }
      case 'Tab': {
        if (
          !shiftKey &&
          lastFocusedScatterPoint &&
          lastFocusedScatterPoint.current &&
          pointRefArray.current.find(
            point => point.current === lastFocusedScatterPoint.current
          )
        ) {
          event.preventDefault();
          lastFocusedScatterPoint.current.focus();
        }
        break;
      }
    }
  }

  return (
    <div ref={ref}>
      <StyledTitle theme={theme}>{title}</StyledTitle>
      {description && (
        <StyledParagraph
          theme={theme}
          visualStyle={TypographyVisualStyle.bodySmall}
        >
          {description}
        </StyledParagraph>
      )}
      <StyledTabsContainer theme={theme}>
        <Tabs>
          <Tab>{i18n.charts.line.chartTabLabel}</Tab>
          <Tab>{i18n.charts.line.dataTabLabel}</Tab>
          <div
            onBlur={handleKeyboardInstructionsButtonBlur}
            style={{
              display: 'inline-block',
              marginLeft: 'auto',
            }}
          >
            <Tooltip
              content={i18n.charts.line.keyboardInstructionsTooltip}
              ref={keyboardInstructionsRef}
            >
              <IconButton
                aria-controls="keyboardInstructions"
                aria-label={i18n.charts.line.keyboardInstructionsTooltip}
                aria-expanded={Boolean(isKeyboardInstructionsOpen)}
                icon={<KeyboardIcon />}
                onClick={handleKeyboardInstructionsButtonClick}
                onKeyDown={handleKeyboardInstructionsButtonKeydown}
                variant={ButtonVariant.link}
              />
            </Tooltip>
            <Announce>
              <KeyboardInstructionsCard
                id="keyboardInstructions"
                isOpen={isKeyboardInstructionsOpen}
                theme={theme}
                width="350px"
              >
                <Paragraph
                  visualStyle={TypographyVisualStyle.headingXSmall}
                  style={{ margin: '0 0 16px' }}
                >
                  {i18n.charts.line.keyboardInstructionsHeader}
                </Paragraph>
                {i18n.charts.line.keyboardInstructions}
              </KeyboardInstructionsCard>
            </Announce>
          </div>
        </Tabs>
        <TabPanelsContainer>
          <StyledTabPanel theme={theme}>
            {type === 'line' && (
              <LineChart<T>
                {...other}
                lastFocusedScatterPoint={lastFocusedScatterPoint}
                pointRefArray={pointRefArray}
                registerPoint={registerPoint}
                tabRef={keyboardInstructionsRef}
                unregisterPoint={unregisterPoint}
              />
            )}
          </StyledTabPanel>
          <StyledTabPanel theme={theme}>
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