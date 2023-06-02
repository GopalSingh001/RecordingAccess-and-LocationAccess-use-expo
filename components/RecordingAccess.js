import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { ScrollView } from 'react-native-gesture-handler';

export default function RecordingAccess() {
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);
    const [message, setMessage] = useState("");

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                setMessage("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        setRecordings(updatedRecordings);
    }

    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }


    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return (

                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
                    <Pressable style={styles.Playbutton} onPress={() => recordingLine.sound.replayAsync()} >
                        <Text style={{ color: 'black' }}>Play</Text>
                    </Pressable>
                    <Pressable style={styles.Sharebutton} onPress={() => Sharing.shareAsync(recordingLine.file)} >
                        <Text style={{ color: 'white' }}>Share</Text>
                    </Pressable>
                </View>

            );
        });
    }



    return (
        <View style={styles.container}>
            <Text>{message}</Text>
            <TouchableHighlight style={styles.mainButton} onPress={recording ? stopRecording : startRecording}>
                <Text style={styles.mainText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>

            </TouchableHighlight>

            <ScrollView><Text>{getRecordingLines()}</Text></ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',



    },
    fill: {
        flex: 1,
        margin: 16,
    },

    Playbutton: {
        margin: 16,
        backgroundColor: 'yellow',
        paddingTop: 4,
        paddingLeft: 10,
        paddingBottom: 4,
        paddingRight: 10,
        borderRadius: 5
    },
    Sharebutton: {
        margin: 16,
        backgroundColor: 'green',
        paddingTop: 4,
        paddingLeft: 10,
        paddingBottom: 4,
        paddingRight: 10,
        borderRadius: 5

    },

    mainButton: {
        backgroundColor: 'gray',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15

    },
    mainText: {
        color: "white"
    }
});