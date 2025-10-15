import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  console.log(todos);

  const addTask = useMutation(api.todos.createTodo);

  const cleanAllTasks = useMutation(api.todos.clearAllTodos);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle the mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTask({ text: "Go for a swim" })}>
        <Text>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cleanAllTasks()}>
        <Text>Clear Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}
