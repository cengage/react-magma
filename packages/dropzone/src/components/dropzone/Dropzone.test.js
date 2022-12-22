import React from 'react';
import { axe } from '../../../axe-helper.js';
import { Dropzone } from '.';
import {
  cleanup,
  render,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { I18nContext, defaultI18n, magma } from 'react-magma-dom';
import userEvent from '@testing-library/user-event';

describe('File Uploader', () => {
  let files;
  let images;
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    files = [createFile('file1.pdf', 1111, 'application/pdf')];
    images = [
      createFile('cats.png', 1234, 'image/png'),
      createFile('dogs.png', 2345, 'image/png'),
    ];
  });

  afterEach(() => {
    jest.useRealTimers();
    window.URL.createObjectURL.mockReset();
    cleanup();
  });

  it('should render the file uploader component', () => {
    const { getByText } = render(<Dropzone />);

    expect(getByText('Browse Files')).toBeInTheDocument();

    expect(
      getByText('Drag and drop or browse files to upload.')
    ).toBeInTheDocument();
  });

  it('should render the file uploader component without drag', () => {
    const { queryByText } = render(<Dropzone noDrag />);

    expect(queryByText('Browse Files')).toBeInTheDocument();
    expect(
      queryByText('Drag and drop or browse files to upload.')
    ).not.toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Dropzone testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    jest.useRealTimers();

    const { container } = render(<Dropzone />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
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

  it('sets {accept} prop on the <input>', () => {
    const accept = 'image/jpeg';
    const { container } = render(<Dropzone accept={accept} />);

    const input = container.querySelector('input');
    expect(input).toHaveAttribute('accept', accept);
  });

  it('sets {multiple} prop on the <input>', () => {
    const { container } = render(<Dropzone multiple />);

    const input = container.querySelector('input');
    expect(input).toHaveAttribute('multiple');
  });

  it('allows adding files via drop', () => {
    const { container } = render(<Dropzone />);

    const dropzone = container.querySelector('div');

    const dropEvt = new Event('drop', { bubbles: true });
    const dropEvtPreventDefaultSpy = jest.spyOn(dropEvt, 'preventDefault');

    fireEvent(dropzone, dropEvt);
    expect(dropEvtPreventDefaultSpy).toHaveBeenCalled();
  });

  it('border color changes for success', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';
    const ui = <Dropzone testId={testId} />;
    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    expect(dropzone).toHaveStyle(
      `border: 1px dashed ${magma.colors.neutral400}`
    );

    fireDragEnter(dropzone, data);
    await flushPromises(rerender, ui);

    expect(dropzone).toHaveStyle(`border: 1px dashed ${magma.colors.success}`);
  });

  it('border color changes for rejection', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';
    const ui = <Dropzone accept="image/*" testId={testId} />;
    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    expect(dropzone).toHaveStyle(
      `border: 1px dashed ${magma.colors.neutral400}`
    );

    fireDragEnter(dropzone, data);
    await flushPromises(rerender, ui);

    expect(dropzone).toHaveStyle(`border: 1px dashed ${magma.colors.danger}`);
  });

  it('calls onSendFiles for a single file added via the input', async () => {
    const onSendFileSpy = jest.fn();
    const ui = <Dropzone sendFiles onSendFile={onSendFileSpy} />;

    const { container, rerender } = render(ui);
    const input = container.querySelector('input');

    Object.defineProperty(input, 'files', { value: files });

    dispatchEvt(input, 'change');
    await flushPromises(rerender, ui);

    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: files[0] })
    );
  });

  it('calls onSendFiles for multiple files added via the input', async () => {
    const onSendFileSpy = jest.fn();
    const ui = <Dropzone sendFiles onSendFile={onSendFileSpy} />;

    const { container, rerender } = render(ui);
    const input = container.querySelector('input');

    Object.defineProperty(input, 'files', { value: images });

    dispatchEvt(input, 'change');
    await flushPromises(rerender, ui);

    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: images[0] })
    );
    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: images[1] })
    );
  });

  it('calls onSendFiles for a single file added via drop', async () => {
    const onSendFileSpy = jest.fn();
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = (
      <Dropzone sendFiles onSendFile={onSendFileSpy} testId={testId} />
    );
    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: files[0] })
    );
  });

  it('calls onSendFiles for a multiple files added via drop', async () => {
    const onSendFileSpy = jest.fn();
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = (
      <Dropzone sendFiles onSendFile={onSendFileSpy} testId={testId} />
    );
    const { getByTestId, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: images[0] })
    );
    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: images[1] })
    );
  });

  it('delays calling onSendFiles until sendFiles is true', async () => {
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

    await flushPromises(rerender, ui(false));

    expect(onSendFileSpy).not.toHaveBeenCalled();

    await flushPromises(rerender, ui(true));

    expect(onSendFileSpy).toHaveBeenCalledWith(
      expect.objectContaining({ file: files[0] })
    );
  });

  it('adds files to the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(getByText(files[0].name)).toBeInTheDocument();
  });

  it('preview for image files in the file list by default', async () => {
    window.URL.createObjectURL.mockReturnValueOnce('/file.png');
    const data = createDtWithFiles([images[0]]);
    const testId = 'testId';

    const ui = <Dropzone accept={['.png']} testId={testId} />;

    const { getByTestId, getByRole, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(getByRole('img')).toBeInTheDocument();
  });

  it('previews for image files can be disabled', async () => {
    window.URL.createObjectURL.mockReturnValueOnce('/file.png');
    const data = createDtWithFiles([images[0]]);
    const testId = 'testId';

    const ui = (
      <Dropzone thumbnails={false} accept={['.png']} testId={testId} />
    );

    const { getByTestId, queryByRole, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows errors on invalid file types in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone accept={['.png']} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(getByText('Invalid File Type')).toBeInTheDocument();
  });

  it('shows errors on too many files in the file list', async () => {
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = <Dropzone maxFiles={1} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(
      getByText('You must upload a maximum of 1 files.')
    ).toBeInTheDocument();
  });

  it('shows errors on too few files in the file list', async () => {
    const data = createDtWithFiles(images);
    const testId = 'testId';

    const ui = <Dropzone minFiles={6} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(
      getByText('You must upload a minimum of 6 files.')
    ).toBeInTheDocument();
  });

  it('shows errors on too large of a file in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone maxSize={1} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(
      getByText('Upload only files with a maximum size of 1 Bytes.')
    ).toBeInTheDocument();
  });

  it('shows errors on too small of a file in the file list', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone minSize={10000} testId={testId} />;

    const { getByTestId, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(
      getByText('Upload only files with a minimum size of 9.77 KB.')
    ).toBeInTheDocument();
  });

  it('adds a Spinner to files in progress', async () => {
    const onSendFile = ({ file, onProgress }) => {
      onProgress({ file, percent: 25 });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);

    expect(getByText(files[0].name)).toBeInTheDocument();
    expect(getByText('25%')).toBeInTheDocument();
    expect(getByLabelText('Loading')).toBeInTheDocument();
  });

  it('shows an error in the file list on error', async () => {
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

    await flushPromises(rerender, ui);

    expect(getByText('error from the processor')).toBeInTheDocument();
  });

  it('changes to delete file on finish', async () => {
    const onSendFile = ({ file, onFinish }) => {
      onFinish({ file });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    act(() => fireDrop(dropzone, data));

    await flushPromises(rerender, ui);
    await act(() => waitFor(() => getByLabelText('Delete file')));

    expect(getByText(files[0].name)).toBeInTheDocument();
    expect(getByLabelText('Delete file')).toBeInTheDocument();
  });

  it('deletes the file when the Delete File icon is clicked', async () => {
    const onSendFile = ({ file, onFinish }) => {
      onFinish({ file });
    };
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone sendFiles onSendFile={onSendFile} testId={testId} />;

    const { getByTestId, getByLabelText, getByText, queryByText, rerender } =
      render(ui);

    const dropzone = getByTestId(testId);
    act(() => fireDrop(dropzone, data));

    await flushPromises(rerender, ui);
    await act(() => waitFor(() => getByLabelText('Delete file')));

    expect(getByText(files[0].name)).toBeInTheDocument();
    const deleteIcon = getByLabelText('Delete file');

    userEvent.click(deleteIcon);

    await flushPromises(rerender, ui);
    expect(queryByText(files[0].name)).not.toBeInTheDocument();
  });

  it('calls onDeleteFile when the Delete File icon is clicked', async () => {
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

    const { getByTestId, getByLabelText, getByText, rerender } =
      render(ui);

    const dropzone = getByTestId(testId);
    act(() => fireDrop(dropzone, data));

    await flushPromises(rerender, ui);
    await act(() => waitFor(() => getByLabelText('Delete file')));

    expect(getByText(files[0].name)).toBeInTheDocument();
    const deleteIcon = getByLabelText('Delete file');

    userEvent.click(deleteIcon);

    await flushPromises(rerender, ui);
    expect(onDeleteFileSpy).toHaveBeenCalledTimes(1);
  });

  it('removes the file when the Remove File icon is clicked', async () => {
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone testId={testId} />;

    const { getByTestId, getByLabelText, queryByText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);
    expect(queryByText(files[0].name)).toBeInTheDocument();
    const removeIcon = getByLabelText('Remove file');

    userEvent.click(removeIcon);

    await flushPromises(rerender, ui);
    expect(queryByText(files[0].name)).not.toBeInTheDocument();
  });

  it('calls onRemoveFile when the Remove File icon is clicked', async () => {
    const onRemoveFileSpy = jest.fn();
    const data = createDtWithFiles(files);
    const testId = 'testId';

    const ui = <Dropzone onRemoveFile={onRemoveFileSpy} testId={testId} />;

    const { getByTestId, getByLabelText, rerender } = render(ui);

    const dropzone = getByTestId(testId);
    fireDrop(dropzone, data);

    await flushPromises(rerender, ui);
    const removeIcon = getByLabelText('Remove file');

    userEvent.click(removeIcon);

    await flushPromises(rerender, ui);
    expect(onRemoveFileSpy).toHaveBeenCalledTimes(1);
  });
});

async function flushPromises(rerender, ui) {
  await act(() => waitFor(() => rerender(ui)));
}

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
