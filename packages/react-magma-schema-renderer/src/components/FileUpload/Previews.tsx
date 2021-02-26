import * as React from 'react';
import styled from '@emotion/styled';
import { IconButton, ButtonColor } from 'react-magma-dom';
import { DeleteIcon } from 'react-magma-icons';

const Container = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Preview = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const PreviewThumbnail = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  width: 100px;
`;

const PreviewActions = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const PreviewDetails = styled.div`
  display: flex;
  width: 250px;
`;

const Image = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

export const Previews = (props:{files:Array<any>, onRemoveFile:any}) => <Container>
  {
    props.files.map((file:any) => (
      <Preview key={file.name}>
        <PreviewActions>
          <IconButton onClick={props.onRemoveFile(file)}  color={ButtonColor.danger} aria-label="Remove File" icon={<DeleteIcon />} />
        </PreviewActions>
        <PreviewThumbnail>
          {file.encoded && <Image
            src={file.encoded}
            alt=""
          />}
          <PreviewDetails>
          {file.path} - {file.size} bytes
          </PreviewDetails>
        </PreviewThumbnail>
      </Preview>
    ))
  }
  </Container>;