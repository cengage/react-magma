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
  state: SvgIconState = {
    id: this.generateId(this.props.id)
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: this.generateId(this.props.id) });
    }
  }

  generateId(id?: string) {
    return id ? id : uuidv4();
  }

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
