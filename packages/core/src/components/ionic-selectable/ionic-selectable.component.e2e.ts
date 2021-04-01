import { newE2EPage } from '@stencil/core/testing';

describe('ionic-selectable', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ionic-selectable></ionic-selectable>');
    const element = await page.find('ionic-selectable');
    expect(element).toHaveClass('hydrated');
  });
});
