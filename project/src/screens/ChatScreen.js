import { SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'สวัสดีครับ!',
      type: 'user',
      group: 'General', // กำหนดหัวข้อของแชท
    },
    {
      id: '2',
      text: 'สวัสดีค่ะ มีอะไรให้ช่วยไหม?',
      type: 'admin',
      group: 'General',
    },
    {
      id: '3',
      text: 'เรื่องการส่งงานจะเป็นอย่างไรบ้าง?',
      type: 'user',
      group: 'Work',
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [newGroup, setNewGroup] = useState('General');  // เลือกกลุ่มในการส่งข้อความ

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: (messages.length + 1).toString(), text: newMessage, type: 'user', group: newGroup }
      ]);
      setNewMessage('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.type === 'user' ? styles.userMessage : styles.adminMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // จัดกลุ่มข้อความตามหัวข้อ
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.group]) {
      acc[message.group] = [];
    }
    acc[message.group].push(message);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>แชท</Text>
        </View>

        {/* Message Groups */}
        {Object.keys(groupedMessages).map((group) => (
          <View key={group} style={styles.groupContainer}>
            <Text style={styles.groupHeader}>{group}</Text>
            <FlatList
              data={groupedMessages[group]}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.messageList}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        ))}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="พิมพ์ข้อความ..."
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>ส่ง</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginVertical: 5,
    color: '#4CAF50',
  },
  messageList: {
    paddingLeft: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#d1f7c4',  // สีข้อความของผู้ใช้
    alignSelf: 'flex-start',
  },
  adminMessage: {
    backgroundColor: '#f1f1f1',  // สีข้อความของแอดมิน
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
