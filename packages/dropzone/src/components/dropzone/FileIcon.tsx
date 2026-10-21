import React from 'react';

import { magma } from 'react-magma-dom';
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
      color: magma.colors.neutral700,
    },
    inverseStyle: {
      color: magma.colors.neutral300,
    },
  },
  word: {
    Icon: FileWordIcon,
    style: {
      color: magma.colors.blue500,
    },
    inverseStyle: {
      color: magma.colors.blue500,
    },
  },
  excel: {
    Icon: FileExcelIcon,
    style: {
      color: magma.colors.green500,
    },
    inverseStyle: {
      color: magma.colors.green500,
    },
  },
  powerpoint: {
    Icon: FilePowerpointIcon,
    style: {
      color: magma.colors.tangerine600,
    },
    inverseStyle: {
      color: magma.colors.tangerine500,
    },
  },
  pdf: {
    Icon: FilePdfIcon,
    style: {
      color: magma.colors.red600,
    },
    inverseStyle: {
      color: magma.colors.red500,
    },
  },
  image: {
    Icon: ImageIcon,
    style: {
      color: magma.colors.neutral700,
    },
    inverseStyle: {
      color: magma.colors.neutral300,
    },
  },
  video: {
    Icon: VideocamIcon,
    style: {
      color: magma.colors.neutral700,
    },
    inverseStyle: {
      color: magma.colors.neutral300,
    },
  },
  audio: {
    Icon: AudiotrackIcon,
    style: {
      color: magma.colors.neutral700,
    },
    inverseStyle: {
      color: magma.colors.neutral300,
    },
  },
  archive: {
    Icon: FileZipIcon,
    style: {
      color: magma.colors.neutral700,
    },
    inverseStyle: {
      color: magma.colors.neutral300,
    },
  },
};

const iconMapping: {
  [key: string]: {
    Icon: any;
    style: React.CSSProperties;
    inverseStyle: React.CSSProperties;
  };
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
  const { Icon, style, inverseStyle } =
    iconMapping[extension] || iconMapping[category] || iconMapping.default;

  return (
    <Icon
      size={magma.iconSizes.medium}
      style={isInverse ? inverseStyle : style}
    />
  );
};
