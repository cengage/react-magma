const fs = require('fs');

fs.copyFile(
  './CHANGELOG.md',
  '../../website/react-magma-docs/src/pages/api-intro/changelog.mdx',
  err => {
    if (err) throw err;
    console.log('[react-magma-dom] Changelog was copied to destination');

    const file =
      '../../website/react-magma-docs/src/pages/api-intro/changelog.mdx';

    const data = fs.readFileSync(file);
    const fd = fs.openSync(file, 'w+');
    const buffer = window.Buffer.from('---\ntitle: Changelog\norder: 4\n---\n\n');

    let textData = data.toString();

    const newBufferData = window.Buffer.from(textData);

    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    fs.writeSync(fd, newBufferData, 0, newBufferData.length, buffer.length);
    fs.closeSync(fd);
  }
);
