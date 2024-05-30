import React, { useState, useEffect } from 'react';
import { Alert, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomDropdown from './CustomDropdown';
import pb from './Pb';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const EditedTask = ({ route, navigation }) => {
    const taskId = route.params.data;
    const [username, setUsername] = useState("");
    const [details, setDetails] = useState("");
    const [location, setLocation] = useState(null);
    const [worker, setWorker] = useState(null);
    const [listworker, setListworker] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleWorkerSelect = (option) => {
        setWorker(option);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const resultList = await pb.collection('worker').getList();
                const workerUsernames = resultList.items.map(worker => worker.username);
                setListworker(workerUsernames);
            } catch (error) {
                console.log(error.originalError);
            }
        }

        fetchData();
    }, []);

    const handleTask = async () => {
        try {
            const data = {
                "field": username,
                "field2": details,
            };

            const record = await pb.collection('task').update(taskId, data);
            const resultList = await pb.collection('worker').getList();
            const akramUser = resultList.items.find(user => user.username === worker);

            const updatedList = akramUser.task;
            const updatedListé = updatedList.concat(record.id);

            await pb.collection('worker').update(akramUser.id, {
                'task': updatedListé,
            });

            Alert.alert("Success", "Task sent successfully");

        } catch (error) {
            console.log(error);
        }
    };

  
    return (
        <SafeAreaView style={styles.container}>
        <View style={{top:70,left:-28}}>
            <Text style={styles.title1}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your Title here...'
                value={username}
                onChangeText={setUsername}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Text style={styles.title1}>Details</Text>
            <TextInput
                style={styles.input2}
                placeholderTextColor="#999"
                placeholder="Enter your description here..."
                value={details}
                onChangeText={setDetails}
                autoCorrect={false}
                autoCapitalize='none'
                numberOfLines={4}
                multiline={true}
                textAlignVertical="top"
            />
            <Text style={styles.title1}>Choose worker</Text>
            <CustomDropdown options={listworker} onSelect={handleWorkerSelect} />

            <TouchableOpacity style={styles.sendButton} onPress={handleTask}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title1: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        width: '100%',
        borderColor: "#4CAF50",
        borderWidth: 1,
        borderRadius: 7,
        color: "black",
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    input2: {
        height: 150,
        paddingHorizontal: 20,
        width: '100%',
        borderColor: "#4CAF50",
        borderWidth: 1,
        borderRadius: 7,
        color: "black",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 20,
    },
    sendButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default EditedTask;
