import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const SignIn = () => {
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const submit = async () => {
        if (!nationalId || !password) {
            Alert.alert("Error", "กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        try {
            const response = await axios.post('http://10.203.228.166:5000/tokens/login', { nationalId, password });
            await SecureStore.setItemAsync("token", response.data.token);
            navigation.navigate("MainDrawer");
        } catch (error) {
            Alert.alert("Error", error.response.status.tostring());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput style={styles.input} placeholder="เลขประจำตัวประชาชน" value={nationalId} onChangeText={setNationalId} />
            <TextInput style={styles.input} placeholder="รหัสผ่าน" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={submit} color="#007bff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    }
});

export default SignIn;