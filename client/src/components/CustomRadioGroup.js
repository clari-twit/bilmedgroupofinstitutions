import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

// Single radio button
function CustomRadio({ field, value, label }) {
  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          color="primary"
          checked={field.value === value}
          onChange={() => field.onChange({ target: { name: field.name, value } })}
        />
      }
      label={label}
    />
  )
}

// Group radio button
function CustomRadioGroup({ field, label, radios }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...field} sx={{ flexDirection: 'row' }}>
        {radios.map((radio) => (
          <CustomRadio key={radio.value} field={field} {...radio} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroup;
