import { useState } from 'react';
import { Dropzone, DropzoneProps, OnSendFileProps } from './Dropzone';
import { Textarea, Datagrid } from 'react-magma-dom';

function csvJSON(csv: string){
  var lines=csv.split("\n");
  var result = [];
  var headers: Array<string> =lines[0].split(",");

  for(var i=1;i<lines.length;i++){
      var obj: Record<string, string> = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push({id: i, ...obj});
  }

  return [headers.map((header:string) => {return {field: header, header}}), result]; //JavaScript object
  // return JSON.stringify(result); //JSON
}

const onSendFile = (props: OnSendFileProps) => {
  const {onProgress, onError, onFinish, file} = props;
  let percent: number = 1;

  const interval = setInterval(() => {
    percent++;
    onProgress && onProgress({percent, file})

    if(percent >= 100) {
      clearInterval(interval);
      onFinish && onFinish({file})
    }

    // if(Math.random() * 100 > 90) {
    //   clearInterval(interval)
    //   onError && onError({errors:[{code: 'upload-err', header: 'story error', message: "The destination server has returned an error."}], file})
    // }
  }, 100 * Math.random())
};

export default {
  component: Dropzone,
  title: 'Dropzone',
  argTypes: {
    noDrag: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    sendFiles: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    thumbnails: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
  },
};

export const Default = (args: DropzoneProps) => {
  return <div style={{background: args.isInverse ? '#003865' : '#fff', padding: '50px'}} >
    <Dropzone
      {...args}
      accept={['.png', '.jpg', '.svg']}
      maxFiles={5}
      maxSize={1024*1024}
      onSendFile={onSendFile}
      labelText="Upload files"
      helperMessage="Only PNG, JPG, and SVG files with a max size of 1MB"
    />
  </div>
};

export const NoLimits = (args: DropzoneProps) => {
  return <div style={{background: args.isInverse ? '#003865' : '#fff', padding: '50px'}} >
    <Dropzone
      {...args}
      onSendFile={onSendFile}
      labelText="Upload files"
      helperMessage="It's a free for all, upload anything."
    />
  </div>
};


export const Image = () => {
  const [file, setFile] = useState<string>();

    const onSendFile = (props: OnSendFileProps) => {
    const {file, onFinish} = props;
    const reader = new FileReader();
    reader.onload = function(evt) {
      setFile(evt && evt.target && evt.target.result && evt.target.result.toString() || '');
      onFinish && onFinish({file})
    };
    reader.readAsDataURL(file);
  };

  return <div>
    <Dropzone
      onSendFile={onSendFile}
      accept={['image/*']}
      helperMessage="Only PNG files"
      sendFiles
    />
    {file && <img src={file}/>}
  </div>
}

export const Text = () => {
  const [file, setFile] = useState<string>();

    const onSendFile = (props: OnSendFileProps) => {
    const {file, onFinish} = props;
    const reader = new FileReader();
    reader.onload = function(evt) {
      setFile(evt && evt.target && evt.target.result && evt.target.result.toString() || '');
      onFinish && onFinish({file})
    };
    reader.readAsText(file);
  };

  return <div>
    <Dropzone
      onSendFile={onSendFile}
      accept={['.txt', '.csv']}
      helperMessage="Only TXT or CSV files"
      sendFiles
    />
    {file && <Textarea textareaStyle={{height: '250px'}} value={file}/>}
  </div>
}

export const Csv = () => {
  const [file, setFile] = useState<any>();
  const [columns, setColumns] = useState<any>();

  const onSendFile = (props: OnSendFileProps) => {
    const {file, onFinish} = props;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const [columns, rows] = evt && evt.target && evt.target.result && csvJSON(evt.target.result.toString()) || []
      setColumns(columns);
      setFile(rows);
      onFinish && onFinish({file})
    };
    reader.readAsText(file);
  };

  return <div>
    <Dropzone
      onSendFile={onSendFile}
      accept={['.csv']}
      helperMessage="Only CSV files"
      sendFiles
    />
    {file && <Datagrid columns={columns} rows={file} />}
  </div>
}
