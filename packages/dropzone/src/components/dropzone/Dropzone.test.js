import React from 'react';

import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nContext, defaultI18n, magma } from 'react-magma-dom';

import { axe } from '../../../axe-helper.js';

import { Dropzone } from '.';

describe('File Uploader', () => {
  let files;
  let images;
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  beforeEach(() => {
    files = [createFile('file1.pdf', 1111, 'application/pdf')];
    images = [
      createFile('cats.png', 1234, 'image/png'),
      createFile('dogs.png', 2345, 'image/png'),
    ];
  });

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    cleanup();
  });

  xit('should render the file uploader component', () => {
    const { getByText } = render(<Dropzone />);

    expect(getByText('Browse Files')).toBeInTheDocument();

    expect(
      getByText('Drag and drop or browse files to upload.')
    ).toBeInTheDocument();
  });

  xit('should render the file uploader component without drag', () => {
    const { queryByText } = render(<Dropzone noDrag />);

    expect(queryByText('Browse Files')).toBeInTheDocument();
    expect(
      queryByText('Drag and drop or browse files to upload.')
    ).not.toBeInTheDocument();
  });

  xit('should find element by testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(<Dropzone testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  xit('browse file should open on button click', async () => {
    const { getByRole, getByTestId } = render(<Dropzone testId="testId" />);

    const fileInputClickFn = jest.fn();
    const fileInput = getByTestId('file-input');

    fileInput.click = fileInputClickFn;

    await userEvent.click(getByRole('button'));

    expect(fileInputClickFn).toHaveBeenCalled();
  });

  xit('Does not violate accessibility standards', () => {
    const { container } = render(<Dropzone />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  xit('Supports i18n', () => {
    const browseFiles = 'find those files';

    const { getByText } = render(
      <I18nContext.Provider
        value={{
          ...defaultI18n,
          dropzone: {
            ...defaultI18n.dropzone,
            browseFiles,
          },
        }}
      >
        <Dropzone />
      </I18nContext.Provider>
    );

    expect(getByText(browseFiles)).toBeInTheDocument();
  });

  xit('sets {accept} prop on the <input>', () => {
    const accept = 'image/jpeg';

    const { container } = render(<Dropzone accept={accept} />);

    const input = container.querySelector('input');

    expect(input).toHaveAttribute('accept', accept);
  });

  xit('sets {multiple} prop on the <input>', () => {
    const { container } = render(<Dropzone multiple />);

    const input = container.querySelector('input');

    expect(input).toHaveAttribute('multiple');
  });

  xit('allows adding files via drop', () => {
    const { container } = render(<Dropzone />);

    const dropzone = container.querySelector('div');
    const dropEvt = new Event('drop', { bubbles: true });
    const dropEvtPreventDefaultSpy = jest.spyOn(dropEvt, 'preventDefault');

    fireEvent(dropzone, dropEvt);

    expect(dropEvtPreventDefaultSpy).toHaveBeenCalled();
  });

  xit('border color changes for success', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone testId={testId} />;

    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    expect(dropzone).toHaveStyle(
      `border: 1px dashed ${magma.colors.neutral400}`
    );

    fireDragEnter(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(dropzone).toHaveStyle(
        `border: 1px dashed ${magma.colors.success}`
      );
    });
  });

  xit('border color changes for rejection', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone accept="image/*" testId={testId} />;

    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    expect(dropzone).toHaveStyle(
      `border: 1px dashed ${magma.colors.neutral400}`
    );

    fireDragEnter(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(dropzone).toHaveStyle(`border: 1px dashed ${magma.colors.danger}`);
    });
  });

  xit('calls onSendFiles for a single file added via the input', async () => {
    const onSendFileSpy = jest.fn();

    const ui = <Dropzone sendFiles onSendFile={onSendFileSpy} />;

    const { container, rerender } = render(ui);
    const input = container.querySelector('input');

    Object.defineProperty(input, 'files', { value: files });

    dispatchEvt(input, 'change');

    rerender(ui);

    await waitFor(() => {
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: files[0] })
      );
    });
  });

  xit('calls onSendFiles for multiple files added via the input', async () => {
    const onSendFileSpy = jest.fn();

    const ui = <Dropzone sendFiles onSendFile={onSendFileSpy} />;

    const { container, rerender } = render(ui);
    const input = container.querySelector('input');

    Object.defineProperty(input, 'files', { value: images });

    dispatchEvt(input, 'change');

    rerender(ui);

    await waitFor(() => {
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: images[0] })
      );
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: images[1] })
      );
    });
  });

  xit('calls onSendFiles for a single file added via drop', async () => {
    const onSendFileSpy = jest.fn();
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = (
      <Dropzone sendFiles onSendFile={onSendFileSpy} testId={testId} />
    );

    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: files[0] })
      );
    });
  });

  xit('calls onSendFiles for a multiple files added via drop', async () => {
    const onSendFileSpy = jest.fn();
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = (
      <Dropzone sendFiles onSendFile={onSendFileSpy} testId={testId} />
    );

    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: images[0] })
      );
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: images[1] })
      );
    });
  });

  xit('delays calling onSendFiles until sendFiles is true', async () => {
    const onSendFileSpy = jest.fn();
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = sendFiles => (
      <Dropzone
        sendFiles={sendFiles}
        onSendFile={onSendFileSpy}
        testId={testId}
      />
    );

    const { getByTestId, rerender } = render(ui(false));

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui(false));

    await waitFor(() => {
      expect(onSendFileSpy).not.toHaveBeenCalled();
    });

    rerender(ui(true));

    await waitFor(() => {
      expect(onSendFileSpy).toHaveBeenCalledWith(
        expect.objectContaining({ file: files[0] })
      );
    });
  });

  xit('adds files to the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText(files[0].name)).toBeInTheDocument();
    });
  });

  xit('preview for image files in the file list by default', async () => {
    window.URL.createObjectURL.mockReturnValueOnce('/file.png');
    const data = createDtWithFiles([images[0]]);
    const testId = 'testId';

    const ui = <Dropzone accept={['.png']} testId={testId} />;

    const { getByTestId, getByRole, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByRole('img')).toBeInTheDocument();
    });
  });

  xit('previews for image files can be disabled', async () => {
    window.URL.createObjectURL.mockReturnValueOnce('/file.png');
    const data = createDtWithFiles([images[0]]);
    const testId = 'testId';

    const ui = (
      <Dropzone thumbnails={false} accept={['.png']} testId={testId} />
    );

    const { getByTestId, queryByRole, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(queryByRole('img')).not.toBeInTheDocument();
    });
  });

  xit('shows errors on invalid file types in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone accept={['.png']} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText('Invalid File Type')).toBeInTheDocument();
    });
  });

  xit('shows errors on too many files in the file list', async () => {
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = <Dropzone maxFiles={1} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(
        getByText('You must upload a maximum of 1 files.')
      ).toBeInTheDocument();
    });
  });

  xit('shows errors on too few files in the file list', async () => {
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = <Dropzone minFiles={6} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(
        getByText('You must upload a minimum of 6 files.')
      ).toBeInTheDocument();
    });
  });

  xit('shows errors on too large of a file in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone maxSize={1} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(
        getByText('Upload only files with a maximum size of 1 Bytes.')
      ).toBeInTheDocument();
    });
  });

  xit('shows errors on too small of a file in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone minSize={10000} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(
        getByText('Upload only files with a minimum size of 9.77 KB.')
      ).toBeInTheDocument();
    });
  });

  xit('adds a Spinner to files in progress', async () => {
    const onSendFile = ({ file, onProgress }) => {
      onProgress({ file, percent: 25 });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText(files[0].name)).toBeInTheDocument();
      expect(getByText('25%')).toBeInTheDocument();
      expect(getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  xit('shows an error in the file list on error', async () => {
    const onSendFile = ({ file, onError }) => {
      onError({
        file,
        errors: [
          {
            message: 'error from the processor',
            header: 'test-error',
            code: 'error',
          },
        ],
      });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText('error from the processor')).toBeInTheDocument();
    });
  });

  // TODO: Fix test (Delete file doesn't exist in the document (Remove file exists))
  xit('changes to delete file on finish', async () => {
    const onSendFile = ({ file, onFinish }) => {
      onFinish({ file });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText(files[0].name)).toBeInTheDocument();
      expect(getByLabelText('Delete file')).toBeInTheDocument();
    });
  });

  // TODO: Fix test (Delete file doesn't exist in the document (Remove file exists))
  xit('deletes the file when the Delete File icon is clicked', async () => {
    const onSendFile = ({ file, onFinish }) => {
      onFinish({ file });
    };

    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, queryByText, rerender } =
      render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText(files[0].name)).toBeInTheDocument();
    });

    const deleteIcon = getByLabelText('Delete file');

    await userEvent.click(deleteIcon);

    rerender(ui);

    await waitFor(() => {
      expect(queryByText(files[0].name)).not.toBeInTheDocument();
    });
  });

  // TODO: Fix test (Delete file doesn't exist in the document (Remove file exists))
  xit('calls onDeleteFile when the Delete File icon is clicked', async () => {
    const onDeleteFileSpy = jest.fn();
    const onSendFile = ({ file, onFinish }) => {
      onFinish({ file });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = (
      <Dropzone
        sendFiles
        onDeleteFile={onDeleteFileSpy}
        onSendFile={onSendFile}
        testId={testId}
      />
    );

    const { getByTestId, getByLabelText, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(getByText(files[0].name)).toBeInTheDocument();
    });

    const deleteIcon = getByLabelText('Delete file');

    await userEvent.click(deleteIcon);

    rerender(ui);

    await waitFor(() => {
      expect(onDeleteFileSpy).toHaveBeenCalledTimes(1);
    });
  });

  xit('removes the file when the Remove File icon is clicked', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone testId={testId} />;

    const { getByTestId, getByLabelText, queryByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    await waitFor(() => {
      expect(queryByText(files[0].name)).toBeInTheDocument();
    });

    const removeIcon = getByLabelText('Remove file');

    await userEvent.click(removeIcon);

    rerender(ui);

    await waitFor(() => {
      expect(queryByText(files[0].name)).not.toBeInTheDocument();
    });
  });

  xit('calls onRemoveFile when the Remove File icon is clicked', async () => {
    const onRemoveFileSpy = jest.fn();
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone onRemoveFile={onRemoveFileSpy} testId={testId} />;

    const { getByTestId, findByLabelText, rerender } = render(ui);

    const dropzone = getByTestId(testId);

    fireDrop(dropzone, data);

    rerender(ui);

    const removeIcon = await findByLabelText('Remove file');

    await userEvent.click(removeIcon);

    rerender(ui);

    await waitFor(() => {
      expect(onRemoveFileSpy).toHaveBeenCalledTimes(1);
    });
  });

  xit('dropzoneOptions should be passed to Dropzone', async () => {
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = <Dropzone testId={testId} dropzoneOptions={{ maxFiles: 1 }} />;

    const { getByTestId, getAllByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(
      getAllByText(/You must upload a maximum of/i)[0]
    ).toBeInTheDocument();
  });
});

function createDtWithFiles(files = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        size: file.size,
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}

function fireDragEnter(node, data) {
  dispatchEvt(node, 'dragenter', data);
}

// function fireDragOver(node, data) {
//   dispatchEvt(node, 'dragover', data);
// }

// function fireDragLeave(node, data) {
//   dispatchEvt(node, 'dragleave', data);
// }

function fireDrop(node, data) {
  dispatchEvt(node, 'drop', data);
}

function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true });
  if (data) {
    Object.assign(event, data);
  }
  fireEvent(node, event);
}

function createFile(name, size, type) {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get() {
      return size;
    },
  });
  return file;
}
