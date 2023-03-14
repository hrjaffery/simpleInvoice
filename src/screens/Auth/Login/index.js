import RnButton from '@components/Button';
import RnHeader from '@components/Header';
import RnInputField from '@components/InputField';
import Text from '@components/Text';
import { IMAGE } from '@constants';
import { login, profile } from '@endpoints';
import { useLoginApiMutation, useProfileApiMutation } from '@services';
import { setAccessToken, setIdToken } from '@slices/userSlice';
import { useThemeAwareObject } from '@theme';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import Config from 'react-native-config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EyeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import createStyles from './styles';

export default function Login() {
  const styles = useThemeAwareObject(createStyles);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loginCall, loginResponse] = useLoginApiMutation();
  const [profileCall, profileResponse] = useProfileApiMutation();
  const [secure, setSecure] = useState(true);

  const validationSchema = yup.object().shape({
    username: yup.string(t('username_required')).required(t('username_required')),
    password: yup.string(t('password_required')).required(t('password_required')),
  });

  async function handleLogin(values) {
    //Fetching access token
    let form = {
      client_id: 'oO8BMTesSg9Vl3_jAyKpbOd2fIEa',
      client_secret: '0Exp4dwqmpON_ezyhfm0o_Xkowka',
      grant_type: 'password',
      scope: 'openid',
      username: values.username,
      password: values.password,
    };

    const body = Object.keys(form)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(form[key]))
      .join('&');

    let apiData = {
      url: login,
      data: body,
    };
    try {
      let res = await loginCall(apiData).unwrap();
      handleProfile(res.access_token);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleProfile(value) {
    //Fetching org token
    let apiData = {
      url: profile,
      token: value,
    };
    try {
      let res = await profileCall(apiData).unwrap();
      dispatch(setIdToken(res.data.memberships[0].token));
      dispatch(setAccessToken(value));
    } catch (e) {
      console.log(e);
    }
  }

  function rightIcon() {
    return (
      <EyeIcon
        name={!secure ? 'eye' : 'eye-off'}
        color={styles.eyeColor}
        size={styles.eyeSize}
        onPress={() => setSecure(!secure)}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <RnHeader backgroundColor={styles.headerBackgroundColor} statusbar={styles.statusBar} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.innerContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <Image source={IMAGE.logo} style={styles.logoStyle} resizeMode="contain" />
        <Text style={styles.subText}>{t('user_pass')}</Text>
        <Formik
          initialValues={{
            username: Config.FLAVOR == 'development' ? 'dung+octopus4@101digital.io' : '',
            password: Config.FLAVOR == 'development' ? 'Abc@123456' : '',
          }}
          onSubmit={values => handleLogin(values)}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, values }) => {
            return (
              <View>
                <RnInputField
                  placeholder={t('username')}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  error={errors.username}
                  keyboardType={'email-address'}
                />
                <RnInputField
                  secure={secure}
                  placeholder={t('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  rightIcon={rightIcon}
                />
                <RnButton
                  title1={t('sign_in')}
                  //Will call onSubmit function if all fields are valid
                  onPress={handleSubmit}
                  style={[styles.loginBtn]}
                  loading={loginResponse.isLoading || profileResponse.isLoading}
                />
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}
