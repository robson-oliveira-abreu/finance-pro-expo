export const handleActions = () => {
  return [
    { icon: "plus", onPress: () => console.log("Pressed add") },
    {
      icon: "star",
      label: "Star",
      onPress: () => console.log("Pressed star"),
    },
    {
      icon: "email",
      label: "Email",
      onPress: () => console.log("Pressed email"),
    },
    {
      icon: "bell",
      label: "Remind",
      onPress: () => console.log("Pressed notifications"),
    },
  ];
};
