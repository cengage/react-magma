import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from './magma';

export default styled as CreateStyled<ThemeInterface>;


// declare module '@emotion/styled' {
//     import { CreateStyled } from '@emotion/styled/types/index'
//     import { ThemeInterface } from './magma'
  
//     export * from '@emotion/styled/types/index'
//     const customStyled: CreateStyled<ThemeInterface>
//     export default customStyled
//   }