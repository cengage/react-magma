export const formatFileSize = (
  bytes: number | undefined,
  decimalPoint: number = 2,
  bytesLabel: string = 'Bytes'
) => {
  if (bytes === undefined) return;
  if (bytes == 0) return `0 ${bytesLabel}`;
  const k = 1024;
  const sizes = [bytesLabel, 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
  );
};
