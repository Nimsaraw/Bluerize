import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../App';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type AddTaskNavigationProps = NativeStackNavigationProp<RootParamList, 'AddTask'>;
type AddTaskRouteProps = RouteProp<RootParamList, 'AddTask'>;

interface Task {
  id: string;
  text: string;
}

export function AddTaskScreen() {
  const navigation = useNavigation<AddTaskNavigationProps>();
  const route = useRoute<AddTaskRouteProps>();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const userName = route.params?.userName || 'default';
  const TASKS_KEY = `@task_list_${userName}`;

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };
    loadTasks();
  }, [TASKS_KEY]);

  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks)).catch(console.error);
  }, [tasks, TASKS_KEY]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, tasks]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setTask('');
  };

  const confirmDelete = (id: string) => {
    setTaskToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((t) => t.id !== taskToDelete));
      setTaskToDelete(null);
    }
    setDeleteModalVisible(false);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskLeft}>
        <View style={styles.checkbox} />
        <Text style={styles.taskText}>{item.text}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blurize</Text>
      <Text style={styles.subtitle}>Hello, {userName}! Stay productive.</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Add Task */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          placeholderTextColor="#ccc"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <Text style={styles.taskTitle}>Your Tasks ({tasks.length})</Text>
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Delete Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this task?</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
              <Text style={styles.confirmButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles remain the same as before


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 25,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#3B3B4F',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ffdd57',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1e1e2f',
    fontSize: 16,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#3B3B4F',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00C2FF',
    marginRight: 15,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B3B',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 45,
    marginLeft: 8,
  },
});
