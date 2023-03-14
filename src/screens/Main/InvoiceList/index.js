import Container from '@components/Container';
import RnHeader from '@components/Header';
import Text from '@components/Text';
import { IMAGE } from '@constants';
import { getInvoice } from '@endpoints';
import { useIsFocused } from '@react-navigation/native';
import { useGetApiMutation } from '@services';
import { useThemeAwareObject } from '@theme';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import createStyles from './styles';

const InvoiceList = props => {
  const styles = useThemeAwareObject(createStyles);
  const accessToken = useSelector(state => state.user.accessToken);
  const idToken = useSelector(state => state.user.idToken);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [invoiceCall] = useGetApiMutation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiCalling, setApiCalling] = useState(false);
  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      //Fetch the invoices whenever this screen loads
      handleInvoices(page);
    }
    if (!focus) {
      //Resets data whenever navigate from this screen
      setLoading(true);
      setData([]);
      setPage(1);
    }
  }, [focus]);

  async function handleInvoices(page) {
    console.log('page', page);
    setApiCalling(false);
    //Page number is required
    let apiData = {
      url: getInvoice,
      param: `pageNum=${page}&pageSize=10`,
      accessToken,
      idToken,
    };
    try {
      let res = await invoiceCall(apiData).unwrap();
      //If there is more data, then the api will be called again when reached the end of list.
      if (res.data.length == 10) {
        setApiCalling(true);
      } else {
        setApiCalling(false);
      }
      setData([...data, ...res.data]);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <Container>
      <RnHeader
        centerComponent={
          <Image source={IMAGE.logo} style={styles.logoStyle} resizeMode="contain" />
        }
        rightComponent={
          <PlusIcon
            name={'plus-circle-outline'}
            color={styles.plusColor}
            size={styles.plusSize}
            onPress={() => props.navigation.navigate('CreateInvoice')}
          />
        }
      />
      {loading ? (
        <View style={styles.centerView}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.innerContainer}>
                <View style={styles.rowContainer}>
                  <Text>{t('reference')}</Text>
                  <Text>{item?.referenceNo}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text>{t('customer_name')}</Text>
                  <Text>{item?.customer?.name}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text>{t('total_amount')}</Text>
                  <Text>£ {item?.totalAmount}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text>{t('total_discount')}</Text>
                  <Text>£ {item?.totalDiscount}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text>{t('total_tax')}</Text>
                  <Text>£ {item?.totalTax}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <Text>{t('total_paid')}</Text>
                  <Text>£ {item?.totalPaid}</Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => null}
          ListFooterComponentStyle={styles.footerStyle}
          ListEmptyComponent={() => (
            <View style={styles.centerView}>
              <Text>{t('empty_invoice')}</Text>
            </View>
          )}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            //Pagination is applied here
            //Will only be triggered if there is more data available
            if (apiCalling) {
              let tempPage = page + 1;
              setPage(tempPage);
              handleInvoices(tempPage);
            }
          }}
        />
      )}
    </Container>
  );
};

export default InvoiceList;
