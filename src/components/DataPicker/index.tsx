import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Controller, FieldErrors, useWatch } from 'react-hook-form';
import { Platform, Keyboard, StyleSheetProperties } from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import dayjs from '../../helpers/datas';
import {
  Container,
  TextError,
  Touchable,
  TouchableContainer,
  Header,
  ButtonModal,
  ButtonCancelTitle,
  Title,
  TextInput,
} from './styles';

interface DataPickerProps {
  label: string;
  name: string;

  control: any;
  errors: FieldErrors;
  maximumDate?: Date;
  minimumDate?: Date;
  containerStyle?: StyleSheetProperties;
}

type onChangeValueProps = {
  onChange: (value: Date | undefined) => void;
  event?: Event;
  selectedDate: Date | undefined;
};

type handleCloseBottomSheetProps = {
  onChange: (value: Date | undefined) => void;
  state: 'ok' | 'cancel';
};

const DataPicker: React.FC<DataPickerProps> = ({
  label,
  name,
  control,
  errors,
  maximumDate,
  minimumDate,
  containerStyle,
}) => {
  const bottomSheetRef = useRef<RBSheet>(null);
  const dateNow = dayjs().toDate();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date>();
  const [temporary, setTemporary] = useState<Date | null>();
  const handleOpenBottomSheet = (): void => {
    bottomSheetRef?.current?.open();
  };

  const dateValue = useWatch<Date>({
    control,
    name,
  });

  useEffect(() => {
    setDate(dateValue);
  }, [dateValue]);

  const handleCloseBottomSheet = ({
    onChange,
    state,
  }: handleCloseBottomSheetProps): void => {
    if (state === 'ok') {
      const valueDataPicker = temporary || dateNow;
      onChange(valueDataPicker);
      setDate(valueDataPicker);
      setTemporary(null);
      bottomSheetRef?.current?.close();
      return;
    }
    setTemporary(null);
    bottomSheetRef?.current?.close();
  };
  const onChangeValue = ({
    event,
    selectedDate,
    onChange,
  }: onChangeValueProps): void => {
    const currentDate = selectedDate || date;
    if (Platform.OS === 'ios') {
      setTemporary(currentDate);
      return;
    }

    setShow(false);
    onChange(currentDate);
    setDate(currentDate);
  };
  const handleToggleDatePicker = useCallback(() => {
    setShow(state => !state);
  }, []);

  const formatValue = useMemo(() => {
    if (date) {
      return dayjs(date).utc().format('DD/MM/YYYY');
    }
    return '';
  }, [date]);
  return (
    <Container style={containerStyle}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ onChange, onBlur }) => (
          <>
            {Platform.OS === 'ios' ? (
              <RBSheet
                ref={bottomSheetRef}
                customStyles={{
                  container: {
                    justifyContent: 'center',
                    alignItems: 'stretch',
                  },
                }}
              >
                <Header>
                  <ButtonModal
                    onPress={() =>
                      handleCloseBottomSheet({ onChange, state: 'cancel' })
                    }
                  >
                    <ButtonCancelTitle>Cancelar</ButtonCancelTitle>
                  </ButtonModal>

                  <Title>Selecione a data</Title>
                  <ButtonModal
                    onPress={() =>
                      handleCloseBottomSheet({ onChange, state: 'ok' })
                    }
                  >
                    <ButtonCancelTitle>OK</ButtonCancelTitle>
                  </ButtonModal>
                </Header>
                <DateTimePicker
                  value={temporary || date || dateNow}
                  mode="date"
                  maximumDate={maximumDate}
                  minimumDate={minimumDate}
                  is24Hour
                  display="calendar"
                  onChange={(event: any, data: any) =>
                    onChangeValue({ event, selectedDate: data, onChange })
                  }
                />
              </RBSheet>
            ) : (
              <>
                {show && (
                  <DateTimePicker
                    value={date || dateNow}
                    mode="date"
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    is24Hour
                    display="default"
                    onChange={(event, data) =>
                      onChangeValue({ event, selectedDate: data, onChange })
                    }
                  />
                )}
              </>
            )}

            <Touchable
              onPress={() => {
                Keyboard.dismiss();
                if (Platform.OS === 'ios') {
                  handleOpenBottomSheet();
                } else {
                  handleToggleDatePicker();
                }
              }}
            >
              <TouchableContainer>
                <TextInput
                  editable={false}
                  mode="outlined"
                  underlineColor="transparent"
                  selectionColor="#AAA"
                  value={formatValue}
                  color="#6d43a1"
                  label={label}
                  keyboardType="numeric"
                  pointerEvents="none"
                  error={errors[name]}
                  right={() => <TextInput.Icon name="calendar-blank" />}
                  onBlur={onBlur}
                />
              </TouchableContainer>
            </Touchable>
          </>
        )}
      />
      {errors[name] && <TextError>{errors[name].message}</TextError>}
    </Container>
  );
};

export default DataPicker;
