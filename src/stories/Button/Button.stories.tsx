import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Button, ButtonProps } from '.'

export default {
  title: 'Example/Button',
  component: Button,

  // All types will be automatically generated from typescript props
  //   but you can specify the control that you want for a prop.

  // For example, backgroundColor is a string
  //   so by default is has the string control (a string input field)
  //   but you can specify the color control for it (a color picker)
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  // Read more about control annotations at:
  // https://git.io/JTkmq
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Primary: Story<ButtonProps> = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}

export const Secondary: Story<ButtonProps> = Template.bind({})
Secondary.args = {
  label: 'Button',
}

export const Large: Story<ButtonProps> = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small: Story<ButtonProps> = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}
