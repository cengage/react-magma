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
    const buffer = Buffer.from(
      '---\ntitle: Changelog\norder: 4\n---\n\n<PageContent componentName="changelog" type="api_intro">\n\n'
    );

    const textData = data.toString();

    const newBufferData = Buffer.from(textData + '\n\n</PageContent>');

    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    fs.writeSync(fd, newBufferData, 0, newBufferData.length, buffer.length);
    fs.closeSync(fd);
  }
);
