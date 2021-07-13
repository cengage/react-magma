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
  // I18nContext
} from 'react-magma-dom';


import { FileIcon } from './FileIcon';

export interface PreviewProps extends Omit<FlexProps, 'behavior'>{
  testId?: string;
  isInverse?: boolean;
  file: FilePreview;
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
  padding: 10px;
`;

const StyledFlex = styled(Flex)`
  padding: 10px;
`;

const StyledCard = styled(Card)<{file: FilePreview}>`
  margin: 10px 0;
  border-width: ${({file}) => file.errors ? '2px' : '1px'};
  border-color: ${({file, theme}) => file.errors ? theme.colors.danger : theme.colors.neutral06};
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
    // const i18n = React.useContext(I18nContext);

    const handleRemoveFile = (file: FilePreview ) => {
      if(onRemoveFile && typeof onRemoveFile === 'function'){
        onRemoveFile(file)
      }
    }

    const FinishedActions = ({status}:{status:string}) => {
      const [done, setDone] = React.useState(false);

      React.useEffect(() => {
        setTimeout(() => {
          setDone(true);
        }, 2000)
      }, [status])

      if(status ===  'error' || status ===  'ready') {
        return <IconButton
          onClick={() => {handleRemoveFile(file)}}
          variant={ButtonVariant.link}
          color={ButtonColor.secondary}
          aria-label="Remove File"
          icon={<CloseIcon />}
        />
      }

      if(status === 'pending') {
        return <Spinner/>
      }

      return <div>
        <Transition style={{float: 'right'}} isOpen={!done} unmountOnExit nudgeBottom fade>
          <CheckCircleIcon/>
        </Transition>
        <Transition style={{float: 'right'}} isOpen={done} unmountOnExit nudgeTop fade>
          <IconButton
            onClick={() => {handleRemoveFile(file)}}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            aria-label="Delete File"
            icon={<DeleteIcon />}
          />
        </Transition>
      </div>
    }

    // const actionMapper:any = {
    //   pending: <Spinner/>,
    //   complete: <DeleteIcon/>,
    //   ready: <CloseIcon/>,
    //   finished: <FinishedActions/>
    // }

    React.useEffect(() => {
      setActions(<FinishedActions status={file?.processor?.status || 'ready'}/>);
      // setActions(actionMapper[file?.processor?.status || 'ready'])
      //  === 'pending' ? <Spinner/> : 
      //   file?.processor?.status === 'pending' ? <Spinner/> : <CloseIcon />)
      // file.processor && file.processor.status !== 'complete' ? <Spinner/> : <IconButton
      //   onClick={() => {handleRemoveFile(file)}}
      //   variant={ButtonVariant.link}
      //   color={ButtonColor.secondary}
      //   aria-label="Remove File"
      //   icon={file.errors ? <CloseIcon /> : <DeleteIcon />}
      // />
    }, [file?.processor?.status])

    return (
      <InverseContext.Provider value={{ isInverse }}>
          <StyledCard theme={theme} file={file} data-testid={props.testId}>
            <StyledFlex
              theme={theme}
              behavior={FlexBehavior.container}
              alignItems={FlexAlignItems.center}
              {...rest}
            >
              <Flex behavior={FlexBehavior.item}>
                { 
                  file.errors? <ErrorIcon color={theme.colors.danger} size={24} /> :
                  file.preview &&  file.type && file.type.startsWith('image')? 
                  <Thumb file={file}/> : 
                  <FileIcon file={file}/>
                }
              </Flex>
              <Flex behavior={FlexBehavior.item}>
                {file.name} {JSON.stringify(file.processor)}
              </Flex>
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
