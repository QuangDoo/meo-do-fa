import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import ExampleButton, { ExampleButtonProps } from './Button';

export default {
  title: 'Shared/Button',
  component: ExampleButton
} as Meta;

const Template: Story<ExampleButtonProps> = (args) => <ExampleButton {...args} />;

export const Default: Story<ExampleButtonProps> = Template.bind({});
Default.args = {
  onClick: action('Clicked'),
  children: 'Default Button'
};

export const Outline: Story<ExampleButtonProps> = Template.bind({});
Outline.args = {
  onClick: action('Clicked'),
  children: 'Outlined Button',
  outline: true
};
