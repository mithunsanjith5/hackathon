import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function MoreScreen() {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{t('more')}</Text>
      <Text style={{ marginTop: 8 }}>Settings, language, privacy, and help will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
});
