import * as React from 'react';
import { 
  FilePresentIcon,
  ImageIcon,
  AudiotrackIcon,
  VideoCameraBackIcon,
  FileExcelIcon,
  FilePdfIcon,
  FilePowerpointIcon,
  FileWordIcon,
  FileZipIcon,
  IconProps,
} from 'react-magma-icons';
  
import { FilePreview } from './FilePreview';

export interface FileIconProps extends IconProps { 
  file: FilePreview;
  xs?: boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const icons = {
  default: {
    Icon: FilePresentIcon,
    style: {
      color: 'red'
    }
  },
  word: {
    Icon: FileWordIcon,
    style: {
      color: 'orange'
    }
  },
  excel: {
    Icon: FileExcelIcon,
    style: {
      color: 'yellow'
    }
  },
  powerpoint: {
    Icon: FilePowerpointIcon,
    style: {
      color: 'green'
    }
  },
  pdf: {
    Icon: FilePdfIcon,
    style: {
      color: 'blue'
    }
  },
  image: {
    Icon: ImageIcon,
    style: {
      color: 'indigo'
    }
  },
  video: {
    Icon: VideoCameraBackIcon,
    style: {
      color: 'violet'
    }
  },
  audio: {
    Icon: AudiotrackIcon,
    style: {
      color: 'grey'
    }
  },
  archive: {
    Icon: FileZipIcon,
    style: {
      color: 'black'
    }
  },
}

const iconMapping:{[key:string]: {Icon: any, style: React.CSSProperties}}  = {
  default: icons.default,
  xlsx: icons.excel,
  xlsm: icons.excel,
  xlsb: icons.excel,
  xltx: icons.excel,
  xls: icons.excel,
  xlt: icons.excel,
  doc: icons.word,
  docx: icons.word,
  docm: icons.word,
  dotx: icons.word,
  dotm: icons.word,
  docb: icons.word,
  pptx: icons.powerpoint,
  pptm: icons.powerpoint,
  ppt: icons.powerpoint,
  pdf: icons.pdf,
  png: icons.image,
  svg: icons.image,
  image: icons.image,
  audio: icons.audio,
  video: icons.video,
  zip: icons.archive,
}

export const FileIcon = (props: FileIconProps) => {
  const { path='', type='',} = props.file;
  const category = type.split('/')[0];
  const extension = path.split('.').pop() || 'default';
  console.log(props);
  const {Icon, style } = iconMapping[extension] || iconMapping[category] || iconMapping.default;

  return <Icon size={24} style={style}/>
}