export const formatFileSize = (bytes: number | undefined, decimalPoint?:number) => {
  if(bytes === undefined) return;
  if(bytes == 0) return '0 Bytes';
  const k = 1024,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}