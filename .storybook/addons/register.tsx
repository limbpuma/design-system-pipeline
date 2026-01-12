/**
 * Custom Storybook Addons Registration
 *
 * Registers enhanced accessibility feedback panel
 */

import React from 'react';
import { addons, types } from '@storybook/manager-api';
import A11yFeedbackPanel from './a11y-feedback-panel';

const ADDON_ID = 'design-system/a11y-feedback';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: '♿ A11y Feedback',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => <A11yFeedbackPanel active={active ?? false} />,
  });
});
