import * as React from 'react';
import styled from '../../theme/styled';
import { Leaf, LeafProps } from './Leaf';

export interface TreeProps<Leaf extends LeafProps> extends LeafProps {
  children?: TreeProps<Leaf>[] | Leaf[];
}

const StyledTree = styled.div<TreeProps>``;
const Indented = styled.div`
  left: 25px;
`;

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(props => {
  const { tree } = props;

  return (
    <StyledTree tree={tree}>
      <Leaf tree={tree} />
      {tree.children && (
        <Indented>
          {tree.children.map(tree => (
            <Tree tree={tree} />
          ))}
        </Indented>
      )}
    </StyledTree>
  );
});
