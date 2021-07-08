import * as React from 'react';
import { Card } from 'react-magma-dom';
import { ErrorIcon, DeleteIcon, CrossIcon } from 'react-magma-icons';

import { FilePreview } from './FilePreview';
import styled from '@emotion/styled';

import { 
  Flex,
  FlexBehavior,
  FlexDirection,
  FlexAlignContent,
  FlexAlignItems,
  FlexProps,
  IconButton,
  ButtonColor,
  ButtonVariant ,
  InverseContext,
  Paragraph,
  useIsInverse,
  // I18nContext
} from 'react-magma-dom';


import { FileIcon } from './FileIcon';

export interface PreviewProps extends Omit<FlexProps, 'behavior'>{
  testId?: string;
  isInverse?: boolean;
  files: FilePreview[];
  thumbnails: boolean;
  onRemoveFile?: (file: FilePreview) => void;
  onPreviewClick?: (file: FilePreview) => void;
}

const Thumb = styled.div<{file: FilePreview}>`
  background-image: ${({file}) => `url('${'preview' in file && file.preview}')`};
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
`;

const Errors = styled.div`
  border-top: 1px solid grey;
`;

const StyledCard = styled(Card)<{file: FilePreview}>`
  margin: 10px 0;
  padding: 10px;
  border-width: ${({file}) => file.errors ? '2px' : '1px'};
  border-color: ${({file}) => file.errors ? 'red' : 'grey'};
`;

const ErrorCode = styled.span`
  display: block;
`;

const ErrorMessage = styled.span`
  display: block;
`;

export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(
  (props, ref) => {
    const {
      onRemoveFile,
      testId,
      isInverse: isInverseProp,
      thumbnails,
      onPreviewClick,
      files,
      ...rest
    } = props;
    
    const isInverse = useIsInverse(isInverseProp);
    // const i18n = React.useContext(I18nContext);

    const handleRemoveFile = (file: FilePreview ) => {
      if(onRemoveFile && typeof onRemoveFile === 'function'){
        onRemoveFile(file)
      }
    }

    // const handlePreviewClick = (event: React.MouseEvent<HTMLElement>, file: FilePreview) => {
    //   event.stopPropagation();
    //   if(onPreviewClick && typeof onPreviewClick === 'function') {
    //     onPreviewClick(file)
    //   }
    // }

    return (
      <InverseContext.Provider value={{ isInverse }}>
        {files.map((file: FilePreview ) => {
          return (
          <StyledCard file={file} data-testid={props.testId}>
            <Flex
              behavior={FlexBehavior.container}
              // alignContent={FlexAlignContent.spaceAround}
              alignItems={FlexAlignItems.center}
              {...rest}
            >
              <Flex behavior={FlexBehavior.item}>
                { file.errors? <ErrorIcon size={24} /> :
                  file.preview ? 
                  <Thumb file={file}/> : 
                  <FileIcon file={file}/>
                }
              </Flex>
              <Flex behavior={FlexBehavior.item}>
                {file.name}
              </Flex>
              <Flex style={{marginLeft: 'auto'}} behavior={FlexBehavior.item}>
                100%
              </Flex>
              <Flex behavior={FlexBehavior.item}>
                <IconButton
                  onClick={() => {handleRemoveFile(file)}}
                  variant={ButtonVariant.link}
                  color={ButtonColor.secondary}
                  aria-label="Remove File"
                  icon={file.errors ? <CrossIcon /> : <DeleteIcon />}
                />
              </Flex>
            </Flex>
            {file.errors && <Errors>
              {file.errors.map(error => <>
                <ErrorCode>{error.code}</ErrorCode>
                <ErrorMessage>{error.message}</ErrorMessage>
              </>)}
            </Errors>}
          </StyledCard>
        )}
        )}
      </InverseContext.Provider>
    );
  }
)
// {file.file.<- {file.errors[0].code} - {file.errors[0].message}</div>
