import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { basicData, explicitData } from './test/exampleChartData';
import { Chart } from '.';
import { defaultI18n } from 'react-magma-dom';

const componentProps = {
  xAxis: {
    label: '2019 Annual Sales Figures',
    tickFormat: ['Jan', 'Feb', 'March', 'April', 'May'],
  },
  yAxis: {
    domain: [0, 8],
    label: 'Conversion Rate',
    tickFormat: t => `$${t}0k`,
    tickValues: [1, 2, 3, 4, 5, 6, 7, 8],
  },
};

describe('Line Chart', () => {
  it('should render with basic x/y data', () => {
    const { getByText, getByLabelText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={basicData}
        title="Basic"
      />
    );

    expect(getByText(componentProps.xAxis.label)).toBeInTheDocument();
    expect(getByText(componentProps.yAxis.label)).toBeInTheDocument();
    expect(getByText('Jan')).toBeInTheDocument();
    expect(getByLabelText(basicData[0].data[0].label)).toBeInTheDocument();
  });

  it('should render with explicit data', () => {
    const { getByText, getByLabelText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={explicitData}
        title="Basic"
        x="month"
        y="sales"
      />
    );

    expect(getByText(componentProps.xAxis.label)).toBeInTheDocument();
    expect(getByText(componentProps.yAxis.label)).toBeInTheDocument();
    expect(getByText('Jan')).toBeInTheDocument();
    expect(getByLabelText(explicitData[0].data[0].label)).toBeInTheDocument();
  });

  it('should render point data in a tooltip on focus', () => {
    const { getByText, getByLabelText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={basicData}
        title="Basic"
      />
    );

    const firstScatterPoint = getByLabelText(basicData[0].data[0].label);
    fireEvent.focus(firstScatterPoint);

    expect(getByText(basicData[0].data[0].label)).toBeInTheDocument();
  });

  it('should render point data in a tooltip on hover', () => {
    const { getByText, getByLabelText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={basicData}
        title="Basic"
      />
    );

    const firstScatterPoint = getByLabelText(basicData[0].data[0].label);
    fireEvent.mouseOver(firstScatterPoint);

    expect(getByText(basicData[0].data[0].label)).toBeInTheDocument();
  });

  it('should highlight only hovered line', () => {
    const { container, getByText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={basicData}
        title="Basic"
      />
    );

    userEvent.hover(getByText('Team 2'));

    expect(
      container.querySelectorAll('svg')[3].childNodes[2].querySelector('path')
    ).toHaveStyle('opacity: 1');
    expect(
      container.querySelectorAll('svg')[3].childNodes[3].querySelector('path')
    ).toHaveStyle('opacity: .1');
  });

  it('should unrender line if legend button is clicked', () => {
    const { container, getByText } = render(
      <Chart
        componentProps={componentProps}
        type="line"
        data={basicData}
        title="Basic"
      />
    );

    expect(container.querySelectorAll('svg')[3].childNodes.length).toEqual(10);

    userEvent.click(getByText('Team 2'));

    expect(container.querySelectorAll('svg')[3].childNodes.length).toEqual(8);
  });

  describe('keyboard behavior', () => {
    it('should only tab in to the graph and out, not between lines or scatter points', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(basicData[0].data[0].label)).toHaveFocus();

      userEvent.tab();

      expect(getByLabelText(/team 1/i, { selector: 'input' })).toHaveFocus();
    });

    it('should only shift tab in to the graph and out, not between lines or scatter points', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/team 1/i));

      userEvent.tab({ shift: true });

      expect(getByLabelText(basicData[3].data[4].label)).toHaveFocus();

      userEvent.tab({ shift: true });

      expect(
        getByLabelText(defaultI18n.charts.line.keyboardInstructionsTooltip)
      ).toHaveFocus();
    });

    it('should focus last focused scatter point when tabbing or shift tabbing back in to the chart', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(basicData[0].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowright}');

      expect(getByLabelText(data[0].data[1].label)).toHaveFocus();

      userEvent.tab();
      userEvent.tab({ shift: true });

      expect(getByLabelText(data[0].data[1].label)).toHaveFocus();

      userEvent.tab({ shift: true });
      userEvent.tab();

      expect(getByLabelText(data[0].data[1].label)).toHaveFocus();
    });

    it('should focus last scatter point in the graph when shift tabbing back in to the chart and the last focused scatter point is no longer on the graph', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(basicData[0].data[0].label)).toHaveFocus();

      userEvent.tab();
      userEvent.keyboard('{space}');
      userEvent.tab({ shift: true });

      expect(getByLabelText(data[1].data[1].label)).toHaveFocus();
    });

    it('should use right arrow keys to go through scatter points', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(data[0].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowright}');

      expect(getByLabelText(data[0].data[1].label)).toHaveFocus();

      userEvent.keyboard('{arrowright}');

      expect(getByLabelText(data[1].data[0].label)).toHaveFocus();
    });

    it('should use left arrow keys to go through scatter points', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/team 1/i));
      userEvent.click(getByText(/team 1/i));
      userEvent.tab({ shift: true });

      expect(getByLabelText(data[1].data[1].label)).toHaveFocus();

      userEvent.keyboard('{arrowleft}');

      expect(getByLabelText(data[1].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowleft}');

      expect(getByLabelText(data[0].data[1].label)).toHaveFocus();
    });

    it('should wrap to the last scatter point when the left arrow key is clicked while focusing the first scatter point', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(data[0].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowleft}');

      expect(getByLabelText(data[1].data[1].label)).toHaveFocus();
    });

    it('should wrap to the first scatter point when the right arrow key is clicked while focusing the last scatter point', () => {
      const data = [
        {
          name: 'Team 1',
          data: [
            { x: 1, y: 3.9, label: 'Team 1, January, $39k' },
            { x: 2, y: 2.8, label: 'Team 1, February, $28k' },
          ],
        },
        {
          name: 'Team 2',
          data: [
            { x: 1, y: 2.7, label: 'Team 2, January, $39k' },
            { x: 2, y: 3.3, label: 'Team 2, February, $33k' },
          ],
        },
      ];
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={data}
          title="Basic"
        />
      );

      userEvent.click(getByText(/team 1/i));
      userEvent.click(getByText(/team 1/i));
      userEvent.tab({ shift: true });

      expect(getByLabelText(data[1].data[1].label)).toHaveFocus();

      userEvent.keyboard('{arrowright}');

      expect(getByLabelText(data[0].data[0].label)).toHaveFocus();
    });

    it('should go to the next line when clicking the down arrow key', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(basicData[0].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowdown}');

      expect(getByLabelText(basicData[1].data[0].label)).toHaveFocus();
    });

    it('should go to the previous line when clicking the up arrow key', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/team 1/i));
      userEvent.click(getByText(/team 1/i));
      userEvent.tab({ shift: true });

      expect(getByLabelText(basicData[3].data[4].label)).toHaveFocus();

      userEvent.keyboard('{arrowup}');

      expect(getByLabelText(basicData[2].data[4].label)).toHaveFocus();
    });

    it('should wrap to the last line when clicking the up arrow key while focused on the first line', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/chart/i, { selector: 'button' }));
      userEvent.tab();
      userEvent.tab();

      expect(getByLabelText(basicData[0].data[0].label)).toHaveFocus();

      userEvent.keyboard('{arrowup}');

      expect(getByLabelText(basicData[3].data[0].label)).toHaveFocus();
    });

    it('should wrap to the first line when clicking the down arrow key while focused on the last line', () => {
      const { getByText, getByLabelText } = render(
        <Chart
          componentProps={componentProps}
          type="line"
          data={basicData}
          title="Basic"
        />
      );

      userEvent.click(getByText(/team 1/i));
      userEvent.click(getByText(/team 1/i));
      userEvent.tab({ shift: true });

      expect(getByLabelText(basicData[3].data[4].label)).toHaveFocus();

      userEvent.keyboard('{arrowdown}');

      expect(getByLabelText(basicData[0].data[4].label)).toHaveFocus();
    });
  });
});
