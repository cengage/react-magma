import { FileProcessorProps } from '../components/file-uploader/FileProcessor';

export const csvFileProcessor = (props: FileProcessorProps) => {
  const {onError, onProgress, onFinish, file} = props;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      var csv = reader.result;
      
      if(!csv || typeof csv !== 'string') {
        return
      }

      const [header, ...lines] = csv.split("\n");
      const headers = header.split(',');

      lines.map((line: string) => {
        line.split(',').map((value, index) => {
          return {[header[index]]: value}
        }).flatten()
      })

      console.log(header, lines)
      // var result:  = [];
      // var headers=lines[0].split(",");
      // for(var i=1;i<lines.length;i++){
      //   var obj = {};
      //   var currentline=lines[i].split(",");
      //   for(var j=0;j<headers.length;j++){
      //     obj[headers[j]] = currentline[j];
      //   }
      //   result.push(obj);
      //   }  
      //   //return result; //JavaScript object
      //   result= JSON.stringify(result); //JSON
      // console.log(result);
      onFinish && onFinish({file})
    };
    reader.onprogress = (event: ProgressEvent<FileReader>) => {
        const percent: number = Math.floor(event.loaded / event.total * 100)
        onProgress && onProgress({percent, file})
    }
    reader.onerror = () => {
      onError && onError({errors: [{code: 'failed', message: 'failure'}], file});
    };
};