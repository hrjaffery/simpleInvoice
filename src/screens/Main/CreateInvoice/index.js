import RnButton from '@components/Button';
import Container from '@components/Container';
import RnHeader from '@components/Header';
import RnInputField from '@components/InputField';
import Snackbar from '@components/Snackbar';
import RnText from '@components/Text';
import { IMAGE } from '@constants';
import { createInvoice } from '@endpoints';
import { useCreateApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LeftIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import createStyles from './styles';

const CreateInvoice = props => {
  const styles = useThemeAwareObject(createStyles);
  const accessToken = useSelector(state => state.user.accessToken);
  const idToken = useSelector(state => state.user.idToken);
  const { t } = useTranslation();
  const [invoiceCall, invoiceResponse] = useCreateApiMutation();

  const validationSchema = yup.object().shape({
    reference: yup.string(t('reference_required')).required(t('reference_required')),
    description: yup.string(t('description_required')).required(t('description_required')),
    quantity: yup.string(t('quantity_required')).required(t('quantity_required')),
    amount: yup.string(t('amount_required')).required(t('amount_required')),
  });

  async function handleInvoice(values) {
    let form = {
      invoiceReference: values.reference.substring(1),
      description: values.description,
      quantity: values.quantity,
      amount: values.amount.substring(1),
    };

    let apiData = {
      url: createInvoice,
      data: JSON.stringify(form),
      accessToken,
      idToken,
    };
    try {
      let res = await invoiceCall(apiData).unwrap();
      console.log('res', res);
    } catch (e) {
      console.log('e', e.data.errors);
      Snackbar('Server error', true);
    }
  }

  return (
    <Container>
      <RnHeader
        centerComponent={
          <Image source={IMAGE.logo} style={styles.logoStyle} resizeMode="contain" />
        }
        leftComponent={
          <LeftIcon
            name={'arrow-left'}
            color={styles.arrowColor}
            size={styles.arrowSize}
            onPress={() => props.navigation.pop()}
          />
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <RnText style={styles.subText}>{t('create_invoice')}</RnText>
        <Formik
          initialValues={{
            reference: `#${parseInt(Math.random() * 100000)}`,
            description: '',
            quantity: '',
            amount: `£${parseFloat(Math.random() * 10000).toFixed(2)}`,
          }}
          onSubmit={values => handleInvoice(values)}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <>
                <RnInputField
                  placeholder={t('reference')}
                  value={values.reference}
                  onChangeText={handleChange('reference')}
                  error={errors.reference}
                  editable={false}
                />
                <RnInputField
                  placeholder={t('description')}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  error={errors.description}
                />
                <RnInputField
                  placeholder={t('quantity')}
                  value={values.quantity}
                  onChangeText={handleChange('quantity')}
                  error={errors.quantity}
                  keyboardType={'number-pad'}
                />
                <RnInputField
                  placeholder={t('amount')}
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  error={errors.amount}
                  editable={false}
                />
                <RnButton
                  title1={t('create')}
                  onPress={handleSubmit}
                  style={[styles.createBtn]}
                  loading={invoiceResponse.isLoading}
                />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CreateInvoice;
