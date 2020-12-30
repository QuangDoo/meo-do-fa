import { useMutation } from '@apollo/client';
import { Box, Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { useTranslation } from 'i18n';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { emailRegex } from 'src/assets/regex/email';
import { viPhoneNumberRegex } from 'src/assets/regex/viPhoneNumber';
import {
  CREATE_DELIVERY_USER,
  CreateDeliveryUserData,
  CreateDeliveryUserVars
} from 'src/graphql/user/createDeliveryUser';
import useAddress from 'src/hooks/useAddress';

import SelectWithLabel from '../Form/SelectWithLabel';
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
};

export default function CreateDeliveryAddressDialog(props: Props) {
  const { t } = useTranslation(['createDeliveryAddress', 'createDeliveryAddress']);

  const { register, handleSubmit, watch } = useForm();

  const { cities, districts, wards } = useAddress({
    cityId: +watch('city')?.split('__')[1],
    districtId: +watch('district')?.split('__')[1],
    wardId: +watch('ward')?.split('__')[1]
  });

  const [createDeliveryUser, { loading: creatingDeliveryUser }] = useMutation<
    CreateDeliveryUserData,
    CreateDeliveryUserVars
  >(CREATE_DELIVERY_USER);

  const onError = (errors) => {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

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
          phone: data.phone,
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
          }
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
      cancelButton={{
        label: t('createDeliveryAddress:cancel_button_label'),
        onClick: props.onClose
      }}
      confirmButton={{
        label: t('createDeliveryAddress:confirm_button_label'),
        onClick: handleSubmit(onSubmit, onError)
      }}>
      <LoadingBackdrop open={creatingDeliveryUser} />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Box marginBottom={3}>
          <TextField
            inputRef={register({
              required: t('createDeliveryAddress:input_fullName_required') as string
            })}
            name="fullName"
            required
            label={t('createDeliveryAddress:input_fullName_label')}
            fullWidth
            variant="outlined"
          />
        </Box>

        <Box marginBottom={3}>
          <Grid container spacing={3}>
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
              />
            </Grid>

            <Grid item md={8} xs={12}>
              <TextField
                inputRef={register({
                  pattern: {
                    value: emailRegex,
                    message: t('createDeliveryAddress:input_email_invalid')
                  }
                })}
                name="email"
                label={t('createDeliveryAddress:input_email_label')}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        <Box marginBottom={3}>
          <TextField
            inputRef={register({
              required: t('createDeliveryAddress:input_street_required') + ''
            })}
            name="street"
            label={t('createDeliveryAddress:input_street_label')}
            fullWidth
            variant="outlined"
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Select
              displayEmpty
              fullWidth
              variant="outlined"
              inputRef={register({
                required: t('createDeliveryAddress:select_city_required') + ''
              })}
              label={t('createDeliveryAddress:select_city_label')}>
              <MenuItem value="">{t('createDeliveryAddress:select_city_placeholder')}</MenuItem>

              {cities.map((city) => (
                <MenuItem key={city.id} value={city.name + '__' + city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <div className="row">
          <SelectWithLabel
            name="city"
            ref={register({
              required: t('createDeliveryAddress:select_city_required') + ''
            })}
            label={t('createDeliveryAddress:select_city_label')}
            containerClass="col-md-4"
            required>
            <option value="">{t('createDeliveryAddress:select_city_placeholder')}</option>

            {/* Map cities from api */}
            {cities.map((city) => (
              <option key={city.id} value={city.name + '__' + city.id}>
                {city.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select district */}
          <SelectWithLabel
            name="district"
            ref={register({
              required: t('createDeliveryAddress:select_district_required') + ''
            })}
            label={t('createDeliveryAddress:select_district_label')}
            labelClass="required"
            containerClass="col-md-4"
            disabled={!districts.length}>
            <option value="">{t('createDeliveryAddress:select_district_placeholder')}</option>

            {/* Map districts from chosen city */}
            {districts.map((district) => (
              <option key={district.id} value={district.name + '__' + district.id}>
                {district.name}
              </option>
            ))}
          </SelectWithLabel>

          {/* Select ward */}
          <SelectWithLabel
            name="ward"
            ref={register({
              required: t('createDeliveryAddress:select_ward_required') + ''
            })}
            label={t('createDeliveryAddress:select_ward_label')}
            labelClass="required"
            containerClass="col-md-4"
            disabled={!wards.length}>
            <option value="">{t('createDeliveryAddress:select_ward_placeholder')}</option>

            {/* Map wards from chosen district */}
            {wards.map((ward) => (
              <option key={ward.id} value={ward.name + '__' + ward.id}>
                {ward.name}
              </option>
            ))}
          </SelectWithLabel>
        </div>
      </form>
    </MuiDialog>
  );
}
