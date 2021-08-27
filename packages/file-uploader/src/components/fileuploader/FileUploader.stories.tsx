import React from 'react';
import { FileUploader, FileUploaderProps, OnSendFileProps } from './FileUploader';
import { Textarea, Datagrid } from 'react-magma-dom';

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push({id: i, ...obj});

  }

  return result; //JavaScript object
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

    if(Math.random() * 100 > 1000) {
      clearInterval(interval)
      onError && onError({errors:[{code: 'upload-err', message: "The destination server has returned an error."}], file})
    }
  }, 100 * Math.random())
};

export default {
  component: FileUploader,
  title: 'FileUploader',
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
      defaultValue: false,
    },
  },
};

export const Default = (args: FileUploaderProps) => {
  return <div style={{background: args.isInverse ? '#003865' : '#fff', padding: '50px'}} >
    <FileUploader
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


export const Image = () => {
  const [file, setFile] = React.useState<string>();

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
    <FileUploader
      onSendFile={onSendFile}
      accept={['image/*']}
      helperMessage="Only PNG files"
      sendFiles
    />
    {file && <img src={file}/>}
  </div>
}

export const Text = () => {
  const [file, setFile] = React.useState<string>();

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
    <FileUploader
      onSendFile={onSendFile}
      accept={['.txt', '.csv']}
      helperMessage="Only TXT or CSV files"
      sendFiles
    />
    {file && <Textarea textareaStyle={{height: '250px'}} value={file}/>}
  </div>
}

export const Csv = () => {
  const [file, setFile] = React.useState<any>();

    const onSendFile = (props: OnSendFileProps) => {
    const {file, onFinish} = props;
    const reader = new FileReader();
    reader.onload = function(evt) {
      setFile(evt && evt.target && evt.target.result && csvJSON(evt.target.result.toString()) || '');
      onFinish && onFinish({file})
    };
    reader.readAsText(file);
  };

  const columns = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
  ];

  return <div>
    <FileUploader
      onSendFile={onSendFile}
      accept={['.csv']}
      helperMessage="Only CSV files"
      sendFiles
    />
    {file && <Datagrid columns={columns} rows={file} />}
  </div>
}
