import { type ComponentProps } from 'react'
import Select from 'react-select'

type Props = ComponentProps<typeof Select> & {
  color: string
}

function CustomSelect({ color, ...props }: Props) {
  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: color, // focused border, selected options
      primary75: '#f36d94', // lighter hover background
      primary50: '#f9a9c0', // even lighter
      primary25: '#fde2eb', // background on option hover
    },
  })

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? color : base.borderColor,
      boxShadow: state.isFocused ? `0 0 0 1px ${color}` : base.boxShadow,
      '&:hover': {
        borderColor: color,
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? color
        : state.isFocused
          ? '#fde2eb'
          : 'white',
      color: state.isSelected ? 'white' : color,
    }),
  }

  return (
    <Select
      className="w-full"
      components={{
        IndicatorSeparator: () => null,
      }}
      theme={customTheme}
      styles={customStyles}
      {...props}
    />
  )
}

export default CustomSelect
