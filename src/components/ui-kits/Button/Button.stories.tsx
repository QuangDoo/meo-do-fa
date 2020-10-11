import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const WithText: Story<ButtonProps> = Template.bind({})
WithText.args = {
  onClick: action('Hello Button'),
  children: 'Hello Button',
}

export const WithEmoji: Story<ButtonProps> = Template.bind({})
WithEmoji.args = {
  onClick: action('Hello emoji'),
  children: (
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  ),
}
