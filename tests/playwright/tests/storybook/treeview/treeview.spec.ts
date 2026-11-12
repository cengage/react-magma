import { expect, Locator, test } from '@playwright/test';

async function expectRowsToTouch(tree: Locator) {
  await expect
    .poll(() => {
      return tree.locator('[data-index]').evaluateAll(rows => {
        if (rows.length < 2) return Number.POSITIVE_INFINITY;

        const bounds = rows.map(row => row.getBoundingClientRect());

        return Math.max(
          ...bounds
            .slice(1)
            .map((box, index) => Math.abs(box.top - bounds[index].bottom))
        );
      });
    })
    .toBeLessThanOrEqual(1);
}

test.describe('TreeView virtualization', () => {
  test('keeps rows measured after collapsing a branch and resizing', async ({
    page,
  }) => {
    await page.goto(
      '/iframe.html?id=treeview--resizable-virtualized-tree&viewMode=story&args=lessonsPerChapter:2'
    );

    const tree = page.getByRole('tree', { name: 'Resizable course outline' });
    const container = page.getByTestId('resizable-tree-container');
    const chapter = tree.locator('[id="chapter-1"]');

    await expect(chapter).toHaveAttribute('aria-expanded', 'true');
    await container.evaluate(element => {
      element.style.width = '720px';
      element.style.height = '640px';
    });
    await expectRowsToTouch(tree);

    await page.getByTestId('chapter-1-expand').click();
    await expect(chapter).toHaveAttribute('aria-expanded', 'false');
    await expectRowsToTouch(tree);

    // Only CSS changes: no React render should be needed to remeasure rows.
    await container.evaluate(element => {
      element.style.width = '692px';
    });
    await expectRowsToTouch(tree);

    for (const width of [200, 720, 360, 692, 270, 720]) {
      await container.evaluate((element, nextWidth) => {
        element.style.width = `${nextWidth}px`;
      }, width);
      await expectRowsToTouch(tree);
    }
  });

  test('keeps wrapped rows together when resizing and scrolling a large tree', async ({
    page,
  }) => {
    const resizeErrors: string[] = [];

    page.on('pageerror', error => {
      if (error.message.includes('ResizeObserver')) {
        resizeErrors.push(error.message);
      }
    });

    await page.goto(
      '/iframe.html?id=treeview--resizable-virtualized-tree&viewMode=story'
    );

    const tree = page.getByRole('tree', { name: 'Resizable course outline' });
    const container = page.getByTestId('resizable-tree-container');

    await expect(tree.locator('[id="lesson-1-1"]')).toBeVisible();
    await expectRowsToTouch(tree);

    for (const [width, height] of [
      [200, 160],
      [720, 640],
      [360, 400],
      [360, 160],
      [360, 640],
      [270, 240],
      [650, 640],
    ]) {
      await container.evaluate(
        (element, size) => {
          element.style.width = `${size.width}px`;
          element.style.height = `${size.height}px`;
        },
        { width, height }
      );
      await expect(tree).toHaveCSS('height', `${height}px`);
      await expectRowsToTouch(tree);

      for (const offset of [1000, 400, 0]) {
        await tree.evaluate((element, nextOffset) => {
          element.scrollTop = nextOffset;
        }, offset);
        await expectRowsToTouch(tree);
      }
    }

    await expect(tree.locator('[id="chapter-1"]')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(await tree.getByRole('treeitem').count()).toBeLessThan(45);
    expect(resizeErrors).toEqual([]);
  });
});
