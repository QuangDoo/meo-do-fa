import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story<ButtonProps> = Template.bind({})
Default.args = {
  onClick: action('Clicked'),
  children: 'Default Button',
}

export const Outline: Story<ButtonProps> = Template.bind({})
Outline.args = {
  onClick: action('Clicked'),
  children: 'Outlined Button',
  outline: true,
}
