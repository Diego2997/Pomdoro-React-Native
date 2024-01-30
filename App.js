import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
    const [isWorking, setIsWorking] = useState(false);
    const [time, setTime] = useState(25 * 60);
    const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (time == 0) {
            setIsActive(false);
            setIsWorking((prev) => !prev);
            setTime(isWorking ? 300 : 1500);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const handleStartStop = () => {
        setIsActive(!isActive);
    };
    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1,
                    backgroundColor: colors[currentTime],
                    paddingHorizontal: 15,
                },
            ]}
        >
            <Text style={styles.text}>Pomodoro</Text>
            <Header
                setTime={setTime}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
            />
            <Timer time={time} />
            <TouchableOpacity style={styles.button} onPress={handleStartStop}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    {isActive ? "STOP" : "START"}
                </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#333333",
        borderRadius: 15,
        marginTop: 15,
        alignItems: "center",
        padding: 15,
    },
});
