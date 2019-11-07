import * as React from 'react';
import { generateId } from '../utils';

const defaultSize = 24;

interface Path {
  d: string;
  transform?: string;
}

interface SvgIconProps {
  id: string;
  testId?: string;
  title?: string;
  viewBox: string;
  paths: Path[];
  color?: string;
  size?: number;
}

interface SvgIconState {
  id?: string;
}

function renderPaths(paths) {
  return paths.map(({ d, transform }, index) => (
    <path key={index} d={d} transform={transform} />
  ));
}

export class SvgIcon extends React.Component<SvgIconProps, SvgIconState> {
  state: SvgIconState = {
    id: generateId(this.props.id)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  render() {
    const { id } = this.state;
    const { color, size, title, testId, viewBox, paths } = this.props;

    return (
      <svg
        className="icon"
        height={size || defaultSize}
        width={size || defaultSize}
        fill={color || 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        aria-labelledby={title ? id : null}
        data-testid={testId}
      >
        {title && <title id={id}>{title}</title>}
        {renderPaths(paths)}
      </svg>
    );
  }
}
