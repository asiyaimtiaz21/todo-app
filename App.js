import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View, Platform } from 'react-native';
import { CheckBox } from '@rneui/base';

/*this styles each part of the code, the individual tasks, the title, the field they are in, and where you input the new tasks, */

const styles = StyleSheet.create({
  wrapper: {
flex: 1,
backgroundColor: '#c8a2c8',
paddingTop: Platform.OS === 'android' ? 25 : 0,
paddingHorizontal: 35,
},

  task: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},

  taskTexts: {
fontSize: 20,
marginLeft: 10,
color: 'purple',
},
  
  enterWrapper: {
flexDirection: 'row',
marginBottom: 20,
},

  enterBox: {
borderWidth: 1,
borderColor: '#ccc',
padding: 10,
flex: 1,
marginRight: 10,
},

  removeTaskButton: {
marginLeft: 15,
},

});

/*tasks that are already set and the new task input area*/
  export default function App() {
  const [myTasks, setTasks] = useState([
{ key: '1', description: 'Do Laundry', completed: false },
{ key: '2', description: 'Finish Math Assignment', completed: false },
{ key: '3', description: 'Go to Doctors Appointment', completed: false },
{ key: '4', description: 'Buy Groceries', completed: false },
{ key: '5', description: 'Finish Coding Assignment', completed: false },
{ key: '6', description: 'Clean House', completed: false },
]);
  const [newTask, setNewTask] = useState('');

/*you can cross off if the task if completed or not*/
  const handleTaskIfCOmpleted = (key) => {
setTasks(
myTasks.map((task) =>
task.key === key ? { ...task, completed: !task.completed } : task
)
);
};

/*allows you to add a new task to the existing task list*/
  const addNewTasks = () => {
if (newTask.trim()) {
setTasks([
...myTasks,
{ key: String(myTasks.length + 1), description: newTask, completed: false },
]);
setNewTask('');
}
 };

/*function that allows you to delete tasks*/
  const removeMyTasks = (key) => {
setTasks(myTasks.filter(task => task.key !== key));
};
  
/*this allows the tasks to be dispayed in the flatlist*/
  const renderItem = ({ item }) => (
<View style={styles.task}>
<CheckBox
checked={item.completed}
onPress={() => handleTaskIfCOmpleted(item.key)}
/>

{/*button to delete task*/}
  <Text style={[styles.taskTexts, item.completed && { textDecorationLine: 'line-through' }]}>
  {item.description}
  </Text>
  <Button title="Remove Task" onPress={() => removeMyTasks(item.key)} 
  color="#ffb5c0"/>
  </View>
);
  
{/*shows the task list in a flatlist*/}
  return (
<SafeAreaView style={styles.wrapper}>
<FlatList
  data={myTasks}
  renderItem={renderItem}
  keyExtractor={(item) => item.key}
      />

{/*where you enter the new task and the style for it*/ }
<View style={styles.enterWrapper}>
<TextInput
  style={styles.enterBox}
  placeholder="Enter a new task"
  placeholderTextColor="6e59a8"
  value={newTask}
  onChangeText={setNewTask}
/>

{/* add button and styles for it*/}
<Button title="Add" 
  onPress={addNewTasks}
  color="#ffb5c0"/>
</View>
</SafeAreaView>
);
}