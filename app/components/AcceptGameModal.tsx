import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';

interface AcceptGameModalProps {
  playerOfferName: string;
  playerOfferId: string;
  visible: boolean;
}

const AcceptGameModal: React.FC<AcceptGameModalProps> = ({
  playerOfferId,
  playerOfferName,
  visible,
}) => {
  function onAccept() {}

  function onDecline() {}

  return (
    <Modal visible={visible}>
      <Text>Player {playerOfferName} has challenged you. Do you accept?</Text>

      <Button onPress={onDecline} title="Decline" />
      <Button onPress={onAccept} title="Accept" />
    </Modal>
  );
};

export default AcceptGameModal;

const styles = StyleSheet.create({});
