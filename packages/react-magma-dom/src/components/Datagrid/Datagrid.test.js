import React from "react";
import { axe } from "jest-axe";
import { Datagrid } from ".";
import { TableRowColor } from "../Table";
import { render } from "@testing-library/react";
import { magma } from "../../theme/magma";

const columns = [
  { field: "col1", header: "Col 1" },
  { field: "col2", header: "Col 2" },
  { field: "col3", header: "Col 3" },
  { field: "col4", header: "Col 4" },
];

const rows = [
  {
    id: 1,
    col1: "Lorem ipsum dolor sit amet consectetur",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 2,
    col1: "Lorem ipsum dolor sit amet",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
  {
    id: 3,
    col1: "Lorem ipsum dolor",
    col2: "Lorem ipsum dolor",
    col3: "Lorem ipsum dolor",
    col4: "Lorem ipsum",
  },
];

describe("Datagrid", () => {
  it("should find element by testId", () => {
    const testId = "test-id";
    const { getByTestId } = render(
      <Datagrid columns={columns} rows={rows} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it("should allow for colors to be passed to rows", () => {
    const coloredRows = [
      {
        ...rows[0],
        color: TableRowColor.danger,
      },
      rows[1],
      rows[2],
    ];
    const { getByText } = render(
      <Datagrid columns={columns} rows={coloredRows} />
    );

    const coloredRow = getByText(rows[0].col1).parentElement;

    expect(coloredRow).toHaveStyleRule("background", magma.colors.danger);
  });

  it("should allow for selectable rows", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={rows} isSelectable />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    expect(selectableRowCheckbox).toBeInTheDocument();
  });

  it("should allow the disabling of selecting a row", () => {
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={[
          {
            id: 4,
            isSelectableDisabled: true,
            col1: "Lorem ipsum dolor",
            col2: "Lorem ipsum dolor",
            col3: "Lorem ipsum dolor",
            col4: "Lorem ipsum",
          },
          ...rows,
        ]}
        isSelectable
      />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    expect(selectableRowCheckbox).toBeDisabled();
  });

  it("should call passed in onHeaderSelect function when header checkbox is clicked", () => {
    const onHeaderSelect = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        onHeaderSelect={onHeaderSelect}
      />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    headerCheckbox.click();

    expect(onHeaderSelect).toHaveBeenCalled();
  });

  it("should call passed in onRowSelect function with the row id when a row checkbox is clicked", () => {
    const onRowSelect = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        onRowSelect={onRowSelect}
      />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    selectableRowCheckbox.click();

    expect(onRowSelect).toHaveBeenCalledWith(rows[0].id, expect.any(Object));
  });

  it("should allow for the uncontrolled selection of a selectable row", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={rows} isSelectable />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    selectableRowCheckbox.click();

    expect(selectableRowCheckbox).toBeChecked();
  });

  it("should allow for the controlled selection of a selectable row", () => {
    const onSelectedRowsChange = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        selectedRows={[rows[0].id]}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    expect(selectableRowCheckbox).toBeChecked();

    selectableRowCheckbox.click();

    expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
  });

  it("should change the header checkbox to an indeterminate state when some rows are selected", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={rows} isSelectable />
    );

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    selectableRowCheckbox.click();

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).toHaveProperty("indeterminate");
  });

  it("should change the header checkbox to an checked state when all rows are selected", () => {
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        selectedRows={[rows[0].id, rows[1].id, rows[2].id]}
      />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).toBeChecked();
  });

  it("should select all rows when clicking on the header checkbox when no rows are selected in the uncontrolled state", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={rows} isSelectable />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).not.toBeChecked();

    headerCheckbox.click();

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    expect(headerCheckbox).toBeChecked();
    expect(selectableRowCheckbox).toBeChecked();
  });

  it("should call the update selected rows function with all rows selected when clicking on the header checkbox when no rows are selected in the controlled state", () => {
    const onSelectedRowsChange = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        selectedRows={[]}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).not.toBeChecked();

    headerCheckbox.click();

    expect(onSelectedRowsChange).toHaveBeenCalledWith([
      rows[0].id,
      rows[1].id,
      rows[2].id,
    ]);
  });

  it("should deselect all rows when clicking on the header checkbox when one or more rows are selected in the uncontrolled state", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={rows} isSelectable />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    selectableRowCheckbox.click();

    expect(headerCheckbox).toHaveProperty("indeterminate");

    headerCheckbox.click();

    expect(headerCheckbox).not.toBeChecked();
    expect(selectableRowCheckbox).not.toBeChecked();
  });

  it("should call the update selected rows function with an empty array when clicking on the header checkbox when one or more rows are selected in the controlled state", () => {
    const onSelectedRowsChange = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={rows}
        isSelectable
        selectedRows={[rows[0].id]}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).toHaveProperty("indeterminate");

    headerCheckbox.click();

    expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
  });

  it("should deselect all rows when clicking on the header checkbox when all rows are selected in the uncontrolled state", () => {
    const { container } = render(
      <Datagrid columns={columns} rows={[rows[0]]} isSelectable />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    const selectableRowCheckbox = container
      .querySelector("tbody")
      .firstChild.querySelector("input");

    selectableRowCheckbox.click();

    expect(headerCheckbox).toBeChecked();

    headerCheckbox.click();

    expect(headerCheckbox).not.toBeChecked();
    expect(selectableRowCheckbox).not.toBeChecked();
  });

  it("should call the update selected rows function with an empty array when clicking on the header checkbox when all rows are selected in the controlled state", () => {
    const onSelectedRowsChange = jest.fn();
    const { container } = render(
      <Datagrid
        columns={columns}
        rows={[rows[0]]}
        isSelectable
        selectedRows={[rows[0].id]}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    );

    const headerCheckbox = container
      .querySelector("thead")
      .firstChild.querySelector("input");

    expect(headerCheckbox).toBeChecked();

    headerCheckbox.click();

    expect(onSelectedRowsChange).toHaveBeenCalledWith([]);
  });

  it("Does not violate accessibility standards", () => {
    const { container } = render(<Datagrid columns={columns} rows={rows} />);

    return axe(container.innerHTML).then((result) => {
      return expect(result).toHaveNoViolations();
    });
  });
});
