import React, { useImperativeHandle, forwardRef, useRef, useMemo } from 'react';
import { Keyboard } from 'react-native';
import { Controller, FieldErrors } from 'react-hook-form';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  TextError,
  Container,
  TextInput,
  Touchable,
  TouchableContainer,
  IconCareDown,
  TouchableIconDelete,
  IconDelete,
} from './styles';
import BottomSheetSelect from '../BottomSheetSelect';

interface Option {
  id: string;
  name: string;
}

interface SelectProps {
  name: string;
  onChangeValue?: (value: string | string[]) => void;
  iconPassword?: boolean;
  control: any;
  errors: FieldErrors;
  options: Option[];
  menuPlaceholder: string;
  multiple?: boolean;
  canRemoveValue?: boolean;
  mode?: 'flat' | 'outlined';
  label: string;
  disabled: boolean;
}

interface BottomJustificationRef {
  close(): void;
  open(): void;
}

const Select: React.ForwardRefRenderFunction<
  BottomJustificationRef,
  SelectProps
> = (
  {
    name,
    onChangeValue,
    iconPassword,
    control,
    errors,
    options,
    menuPlaceholder,
    multiple,
    canRemoveValue,
    disabled,
    ...rest
  },
  ref,
) => {
  const bottomSheetRef = useRef<any>(null);
  const bottomElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    open() {
      bottomElementRef.current.open();
    },
    close() {
      bottomElementRef.current.focus();
    },
  }));
  const handleOpenBottomSheet = (): void => {
    bottomSheetRef.current.open();
    Keyboard.dismiss();
  };

  const handleCloseBottomSheet = (): void => {
    bottomSheetRef.current.close();
  };

  const handleSearchValue = (value: string): void => {
    if (value) {
      if (!multiple) {
        const option = options.find(item => String(item.id) === String(value));
        if (option) {
          return option.name;
        }
      }
      const optionsSelected = options.filter(option =>
        String(value).includes(option.id),
      );
      const names = optionsSelected.map(item => item.name);
      if (names) {
        return names.join(', ').length <= 40
          ? names.join(', ')
          : `${names.join(', ').substring(0, 40)} ...`;
      }
    }
    return '';
  };

  const alphabeticalOptions = useMemo(() => {
    return options.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }, [options]);
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Touchable disabled={disabled} onPress={handleOpenBottomSheet}>
              <TouchableContainer>
                <TextInput
                  ref={bottomElementRef}
                  secureTextEntry={!!iconPassword}
                  editable={false}
                  mode="outlined"
                  underlineColor="transparent"
                  selectionColor="#AAA"
                  color="#6d43a1"
                  onBlur={onBlur}
                  pointerEvents="none"
                  value={handleSearchValue(value)}
                  error={errors[name]}
                  {...rest}
                />

                {canRemoveValue && value ? (
                  <TouchableIconDelete
                    onPress={() => {
                      if (multiple) {
                        if (onChangeValue) onChangeValue([]);
                        onChange([]);
                      } else {
                        if (onChangeValue) onChangeValue('');
                        onChange('');
                      }
                    }}
                    hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                  >
                    <IconDelete />
                  </TouchableIconDelete>
                ) : (
                  <IconCareDown />
                )}
              </TouchableContainer>
            </Touchable>
            <RBSheet
              ref={bottomSheetRef}
              height={500}
              customStyles={{
                container: {
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  borderRadius: 8,
                },
              }}
            >
              <BottomSheetSelect
                onSelectItem={item => {
                  if (multiple) {
                    if (value.includes(item.id)) {
                      const values = value.filter(
                        (valueItem: string) => valueItem !== item.id,
                      );
                      onChange(values || []);
                      if (onChangeValue) {
                        onChangeValue(values || []);
                      }
                      return;
                    }
                    if (onChangeValue)
                      onChangeValue([...value, String(item.id)]);
                    onChange([...value, item.id]);
                    return;
                  }
                  if (onChangeValue) onChangeValue(item.id.toString());
                  onChange(item.id.toString());
                  handleCloseBottomSheet();
                }}
                title={menuPlaceholder}
                options={alphabeticalOptions}
                value={value}
                multiple={!!multiple}
                onClose={handleCloseBottomSheet}
              />
            </RBSheet>
          </>
        )}
      />
      {errors[name] && <TextError>{errors[name].message}</TextError>}
    </Container>
  );
};

export default forwardRef(Select);
