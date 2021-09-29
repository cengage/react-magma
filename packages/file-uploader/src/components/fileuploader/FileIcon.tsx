import * as React from 'react';
import {
  InsertDriveFileIcon,
  ImageIcon,
  AudiotrackIcon,
  VideocamIcon,
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
  isInverse?: boolean;
}

const icons = {
  default: {
    Icon: InsertDriveFileIcon,
    style: {
      color: '#707070',
    },
  },
  word: {
    Icon: FileWordIcon,
    style: {
      color: '#006298',
    },
  },
  excel: {
    Icon: FileExcelIcon,
    style: {
      color: '#3A8200',
    },
  },
  powerpoint: {
    Icon: FilePowerpointIcon,
    style: {
      color: '#FC4C02',
    },
  },
  pdf: {
    Icon: FilePdfIcon,
    style: {
      color: '#C61D23',
    },
  },
  image: {
    Icon: ImageIcon,
    style: {
      color: '#707070',
    },
  },
  video: {
    Icon: VideocamIcon,
    style: {
      color: '#707070',
    },
  },
  audio: {
    Icon: AudiotrackIcon,
    style: {
      color: '#707070',
    },
  },
  archive: {
    Icon: FileZipIcon,
    style: {
      color: '#707070',
    },
  },
};

const iconMapping: {
  [key: string]: { Icon: any; style: React.CSSProperties };
} = {
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
};

export const FileIcon = ({ file, isInverse }: FileIconProps) => {
  const { path = '', type = '' } = file;
  const category = type.split('/')[0];
  const extension = path.split('.').pop() || 'default';
  const { Icon, style } =
    iconMapping[extension] || iconMapping[category] || iconMapping.default;

  return <Icon size={24} style={isInverse ? {} : style} />;
};
