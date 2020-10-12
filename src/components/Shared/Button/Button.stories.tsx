import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary: Story<ButtonProps> = Template.bind({})
Primary.args = {
  onClick: action('Clicked Primary'),
  children: 'Primary',
  variant: 'primary',
}

export const Secondary: Story<ButtonProps> = Template.bind({})
Secondary.args = {
  onClick: action('Clicked Secondary'),
  children: 'Secondary',
  variant: 'secondary',
}

export const Tertiary: Story<ButtonProps> = Template.bind({})
Tertiary.args = {
  onClick: action('Clicked Tertiary'),
  children: 'Tertiary',
  variant: 'tertiary',
}
