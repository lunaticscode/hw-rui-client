```tsx
import Select from "@hw-rui/select";
const App = () => {
  return (
    <div>
      <Select>
        <Select.Trigger>
          <Select.SelectedValue />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value={"a"}>item-a</Select.Item>
          <Select.Item value={"b"}>item-b</Select.Item>
          <Select.Item value={"c"}>item-c</Select.Item>
        </Select.Content>
      </Select>
    </div>
  );
};

export default App;
```
