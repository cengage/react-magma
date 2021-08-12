import * as React from 'react';
import { Card, Spinner } from 'react-magma-dom';
import { ErrorIcon, DeleteIcon, CloseIcon, CheckCircleIcon} from 'react-magma-icons';
import { FilePreview } from './FilePreview';
import { 
  Flex,
  FlexBehavior,
  FlexAlignItems,
  FlexProps,
  IconButton,
  ButtonColor,
  ButtonVariant ,
  InverseContext,
  styled,
  ThemeContext,
  ThemeInterface,
  Transition,
  useIsInverse,
} from 'react-magma-dom';
import { FileIcon } from './FileIcon';

export interface PreviewProps extends Omit<FlexProps, 'behavior'>{
  testId?: string;
  isInverse?: boolean;
  file: FilePreview;
  thumbnails: boolean;
  onRemoveFile?: (file: FilePreview) => void;
}

const Thumb = styled.div<{file: FilePreview}>`
  background-image: ${({file}) => `url('${'preview' in file && file.preview}')`};
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
`;

const StatusIcons = styled.div`
  display: grid;
  place-items: center;
  grid-template-areas: 'inner-div';
  width: 42px;
  height: 42px;
  & > div {
    display: inline-block;
    right: 0;
    grid-area: inner-div;
  }
`;

const Errors = styled.div`
  border-top: 1px solid ${({theme}) => theme.colors.neutral04};
  padding: 10px;
`;

const StyledFlex = styled(Flex)`
  padding: 10px;
`;

const FileName = styled(Flex)`
  white-space: nowrap;
  overflow: hidden;
`;

const StyledCard = styled(Card)<{file: FilePreview, isInverse: boolean}>`
  margin: 10px 0;
  border-width: ${({file}) => file.errors ? '2px' : '1px'};
  border-color: ${({file, theme, isInverse}) => file.errors ? isInverse ? theme.colors.dangerInverse : theme.colors.danger : theme.colors.neutral06};
  background-color: ${({isInverse, theme}) => isInverse ? theme.colors.foundation02 : theme.colors.neutral08};
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
      file,
      ...rest
    } = props;
    
    const theme:ThemeInterface = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const [actions, setActions] = React.useState(<CloseIcon />);

    const handleRemoveFile = (file: FilePreview ) => {
      if(onRemoveFile && typeof onRemoveFile === 'function'){
        onRemoveFile(file)
      }
    }

    const FinishedActions = ({status='ready'}:{status?:string}) => {
      const [done, setDone] = React.useState(false);

      React.useEffect(() => {
        setTimeout(() => {
          setDone(true);
        }, 500)
      }, [status])

      if(status ===  'error' || status ===  'ready') {
        return <StatusIcons>
          <IconButton
            onClick={() => {handleRemoveFile(file)}}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            aria-label="Remove File"
            icon={<CloseIcon />}
          />
        </StatusIcons>
      }

      if(status === 'pending') {
        return <StatusIcons>
          <Spinner/>
        </StatusIcons>
      }

      return <StatusIcons>
        <Transition isOpen={!done} unmountOnExit nudgeBottom fade>
          <CheckCircleIcon/>
        </Transition>
        <Transition isOpen={done} unmountOnExit nudgeTop fade>
          <IconButton
            onClick={() => {handleRemoveFile(file)}}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            aria-label="Delete File"
            icon={<DeleteIcon />}
          />
        </Transition>
      </StatusIcons>
    }

    React.useEffect(() => {
      setActions(<FinishedActions status={file?.processor?.status}/>);
    }, [file?.processor?.status])

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledCard isInverse={isInverse} theme={theme} file={file} data-testid={props.testId} ref={ref}>
          <StyledFlex
            theme={theme}
            behavior={FlexBehavior.container}
            alignItems={FlexAlignItems.center}
            {...rest}
          >
            <Flex behavior={FlexBehavior.item} >
              { 
                file.errors? <ErrorIcon color={isInverse ? theme.colors.dangerInverse : theme.colors.danger} size={24} /> :
                file.preview && thumbnails && file.type && file.type.startsWith('image')? 
                  <Thumb file={file}/> : 
                  <FileIcon isInverse={isInverse} file={file}/>
              }
            </Flex>
            <FileName xs behavior={FlexBehavior.item}>
              {file.name}
            </FileName>
            <Flex style={{marginLeft: 'auto'}} behavior={FlexBehavior.item}>
              {file.processor && file.processor.percent}
            </Flex>
            <Flex behavior={FlexBehavior.item}>
              {actions}
            </Flex>
          </StyledFlex>
          {file.errors && <Errors theme={theme}>
            {file.errors.map(error => <>
              <ErrorCode>{error.code}</ErrorCode>
              <ErrorMessage>{error.message}</ErrorMessage>
            </>)}
          </Errors>}
        </StyledCard>
      </InverseContext.Provider>
    );
  }
)
