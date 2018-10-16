import * as React from 'react';
import IconTypeProps from './IconTypesPropsInterface';
import SvgIcon from '../SvgIcon';

export const InfoIcon: React.SFC<IconTypeProps> = ({
  id,
  title,
  color,
  size
}): JSX.Element => (
  <SvgIcon
    id={id}
    color={color}
    size={size}
    viewBox="0 0 25.63 25.63"
    title={title}
    d="M15.26,10.15V7.56H12.74v2.59Zm0,10.29v-7.7H12.74v7.7ZM14,1.18A12.82,12.82,0,1,1,1.18,14,12.79,12.79,0,0,1,14,1.18Z"
    transform="translate(-1.18 -1.18)"
  />
);

export default InfoIcon;
