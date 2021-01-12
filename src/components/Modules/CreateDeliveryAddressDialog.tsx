import { Button, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex, noSpecialChars } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import {
  CREATE_DELIVERY_USER,
  CreateDeliveryUserData,
  CreateDeliveryUserVars
} from 'src/graphql/user/createDeliveryUser';
import useAddress from 'src/hooks/useAddress';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';

import MuiSelect from '../Form/MuiSelect';
import MuiTooltip from '../Form/MuiTooltip';
import LoadingBackdrop from '../Layout/LoadingBackdrop';
import MuiDialog from '../Layout/Modal/MuiDialog';

type FormInputs = {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  ward: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCompleted?: () => void;
};

export default function CreateDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['createDeliveryAddress']);

  const { register, handleSubmit, watch, control, errors, setValue } = useForm<FormInputs>({
    defaultValues: {
      city: '',
      district: '',
      ward: ''
    }
  });

  const chosenCity = watch('city');

  const chosenDistrict = watch('district');

  const { cities, districts, wards } = useAddress({
    cityId: +chosenCity.split('__')[1],
    districtId: +chosenDistrict.split('__')[1],
    wardId: +watch('ward').split('__')[1]
  });

  const [createDeliveryUser, { loading: creatingDeliveryUser }] = useMutationAuth<
    CreateDeliveryUserData,
    CreateDeliveryUserVars
  >(CREATE_DELIVERY_USER, {
    onCompleted: () => {
      toast.success(t('createDeliveryAddress:create_delivery_address_success'));
      props.onCompleted?.();
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { city, district, ward } = data;
    const [cityName, cityId] = city.split('__');
    const [districtName, districtId] = district.split('__');
    const [wardName, wardId] = ward.split('__');

    createDeliveryUser({
      variables: {
        inputs: {
          fullName: data.fullName,
          email: data.email,
          shipping_address: {
            street: data.street,
            city: {
              id: +cityId,
              name: cityName
            },
            district: {
              id: +districtId,
              name: districtName
            },
            ward: {
              id: +wardId,
              name: wardName
            }
          },
          phone: data.phone
        }
      }
    });
  };

  return (
    <MuiDialog
      open={props.open}
      onClose={props.onClose}
      title={t('createDeliveryAddress:dialog_title')}
      maxWidth="md"
      fullWidth
      actionsNode={
        <>
          <Button type="button" variant="contained" onClick={props.onClose}>
            {t('createDeliveryAddress:cancel_button_label')}
          </Button>

          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}>
            {t('createDeliveryAddress:confirm_button_label')}
          </Button>
        </>
      }>
      <LoadingBackdrop open={creatingDeliveryUser} />

      <form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              inputRef={register({
                required: t('createDeliveryAddress:input_fullName_required') as string
              })}
              name="fullName"
              required
              label={t('createDeliveryAddress:input_fullName_label')}
              fullWidth
              variant="outlined"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item md={4} xs={12}>
                <TextField
                  inputRef={register({
                    required: t('createDeliveryAddress:input_phone_required') as string,
                    pattern: {
                      value: viPhoneNumberRegex,
                      message: t('createDeliveryAddress:input_phone_invalid')
                    }
                  })}
                  name="phone"
                  required
                  label={t('createDeliveryAddress:input_phone_label')}
                  fullWidth
                  variant="outlined"
                  error={errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              <Grid item md={8} xs={12}>
                <TextField
                  inputRef={register({
                    pattern: {
                      value: emailRegex,
                      message: t('createDeliveryAddress:input_email_invalid')
                    },
                    validate: {
                      noSpecialChars: (value) =>
                        noSpecialChars.test(value) ||
                        t('createDeliveryAddress:input_email_noSpecialChars') + ''
                    }
                  })}
                  name="email"
                  label={t('createDeliveryAddress:input_email_label')}
                  fullWidth
                  variant="outlined"
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              inputRef={register({
                required: t('createDeliveryAddress:input_street_required') + ''
              })}
              name="street"
              label={t('createDeliveryAddress:input_street_label')}
              fullWidth
              variant="outlined"
              required
              error={!!errors.street}
              helperText={errors?.street?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <MuiSelect
                  control={control}
                  rules={{
                    required: t('createDeliveryAddress:select_city_required') as string
                  }}
                  required
                  variant="outlined"
                  name="city"
                  label={t('createDeliveryAddress:select_city_label')}
                  options={cities.map((city) => ({
                    key: city.id,
                    name: city.name,
                    value: city.name + '__' + city.id
                  }))}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  onChange={() => {
                    setValue('district', '');
                    setValue('ward', '');
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <MuiTooltip
                  arrow
                  title={chosenCity ? '' : t('createDeliveryAddress:select_city_first')}>
                  <div>
                    <MuiSelect
                      control={control}
                      rules={{
                        required: t('createDeliveryAddress:select_district_required') as string
                      }}
                      required
                      variant="outlined"
                      name="district"
                      label={t('createDeliveryAddress:select_district_label')}
                      options={districts.map((district) => ({
                        key: district.id,
                        name: district.name,
                        value: district.name + '__' + district.id
                      }))}
                      error={!!chosenCity && !!errors.district}
                      helperText={chosenCity ? errors.district?.message : ''}
                      disabled={!chosenCity}
                      onChange={() => {
                        setValue('ward', '');
                      }}
                    />
                  </div>
                </MuiTooltip>
              </Grid>

              <Grid item xs={12} md={4}>
                <MuiTooltip
                  arrow
                  title={chosenDistrict ? '' : t('createDeliveryAddress:select_district_first')}>
                  <div>
                    <MuiSelect
                      control={control}
                      rules={{
                        required: t('createDeliveryAddress:select_ward_required') as string
                      }}
                      required
                      variant="outlined"
                      name="ward"
                      label={t('createDeliveryAddress:select_ward_label')}
                      options={wards.map((ward) => ({
                        key: ward.id,
                        name: ward.name,
                        value: ward.name + '__' + ward.id
                      }))}
                      error={!!chosenDistrict && !!errors.ward}
                      helperText={chosenDistrict ? errors.ward?.message : ''}
                      disabled={!chosenDistrict}
                    />
                  </div>
                </MuiTooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MuiDialog>
  );
}
