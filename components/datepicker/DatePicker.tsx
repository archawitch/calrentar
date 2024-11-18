import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DatePickerType {
  value: Date;
  minimumDate: Date;
  onChange: ((event: DateTimePickerEvent, date?: Date) => void) | undefined;
}

const DatePicker = (props: DatePickerType) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={props.value}
      mode="date"
      display="inline"
      minimumDate={props.minimumDate}
      onChange={props.onChange}
    />
  );
};

export default DatePicker;
