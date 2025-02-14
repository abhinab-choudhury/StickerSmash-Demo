import { GestureHandlerRootView } from 'react-native-gesture-handler';  
import { View, StyleSheet, Platform } from "react-native";
import ImageViewer from "../components/ImageViewer";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import IconButton from "../components/IconButton";
import CircleButton from "../components/CircleButton";
import { type ImageSource } from 'expo-image';
import EmojiPicker from "../components/EmojiPicker";
import EmojiSticker from "../components/EmojiSticker";
import EmojiList from "../components/EmojiList";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const imageRef = useRef<View>(null);
  const [selectImage, setSeletedImage] = useState<string | undefined>(
    undefined,
  );
  const [showEditButton, setShowEditButton] = useState<boolean>(false);
  const [isEmojiSelectorVisible, setIsEmojiSelectorVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  const PickImageAcync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSeletedImage(result.assets[0].uri);
      setShowEditButton(true);
    } else {
      alert("You did not select any Image");
    }
  };

  const onReset = () => {
    setShowEditButton(false);
  }

  const addSticker = () => {
    setIsEmojiSelectorVisible(true);
  }

  const closeEmojiSelector = () => {
    setIsEmojiSelectorVisible(false);
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} seletedImage={selectImage} />
          { pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> }
        </View>
      </View>
      {showEditButton ? (
        <View style={styles.editButtonContainer}>
          <View style={styles.editButtonRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton icon="add" onPress={addSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a Image"
            theme="primary"
            onPress={PickImageAcync}
          />
          <Button
            label="Use this Photo"
            onPress={() => setShowEditButton(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isEmojiSelectorVisible} onClose={closeEmojiSelector}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={closeEmojiSelector} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 80,
  },
  editButtonRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
