import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function TabTwoScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState("");
  const [camera, setCamera] = useState<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Camera permission</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const handleCapture = async () => {
    if (camera) {
      const result = await camera.takePictureAsync();
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1, width: "100%" }}
        type={type}
        ref={(ref) => setCamera(ref)}
      >
        {image && (
          <Image
            source={{ uri: image }}
            width={100}
            height={100}
            style={{ borderWidth: 1, borderColor: "red" }}
          />
        )}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleCapture}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: 30,
              marginLeft: 95,
            }}
          >
            <View
              style={{
                backgroundColor: "grey",
                borderRadius: 50,
                width: 70,
                height: 70,
                borderWidth: 2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCameraType}
            style={{
              justifyContent: "flex-end",
              marginBottom: 20,
              marginRight: 20,
            }}
          >
            <View
              style={{
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "red",
              }}
            >
              <Text style={{ color: "red" }}>Flip</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
