import * as React from 'react';
const uuidv4 = require('uuid/v4');

const defaultSize = 24;

interface Path {
  d: string;
  transform?: string;
}

interface SvgIconProps {
  id: string;
  title: string;
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
  initialState: SvgIconState = {
    id: this.props.id ? this.props.id : uuidv4()
  };
  state: SvgIconState = this.initialState;

  render() {
    const { id } = this.state;
    const { color, size, title, viewBox, paths } = this.props;

    return (
      <svg
        className="icon"
        height={size || defaultSize}
        width={size || defaultSize}
        fill={color || 'currentColor'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        aria-labelledby={id}
      >
        <title id={id}>{title}</title>
        {renderPaths(paths)}
      </svg>
    );
  }
}
