import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
    title: 'Application/Dashboard',
    component: Dashboard,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {};

export const DarkMode: Story = {
    parameters: {
        themes: {
            defaultTheme: 'dark',
        },
    },
};
