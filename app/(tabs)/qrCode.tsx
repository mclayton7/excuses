import { useState, useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useCameraPermission } from "react-native-vision-camera";

import { Text, View } from '@/components/Themed';
import { QR_CODE_KEY } from "@/constants/Storage";

export default function QrCodeScreen() {
  const [value, setValue] = useState<string | null>();
  const { getItem, setItem } = useAsyncStorage(QR_CODE_KEY);
  const { hasPermission, requestPermission } = useCameraPermission()

  const readItemFromStorage = async () => {
    const item = await getItem();
    if (item === null)
    {
      writeItemToStorage("2134");
    }
  };

  const writeItemToStorage = async (newValue: string) => {
    await setItem(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code</Text>
      <QRCode size={250} value={value || "123"} />
      <Button title='Scan' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
