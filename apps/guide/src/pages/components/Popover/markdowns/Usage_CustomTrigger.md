```tsx
import Popover from "@hw-rui/popover";
import Button from "@hw-rui/button";
const App = () => {
  return (
    <div>
      <Popover>
        <Popover.Trigger>
          {(triggerRef) => (
            <Button ref={triggerRef} variant="positive">
              custom-trigger
            </Button>
          )}
        </Popover.Trigger>
        <Popover.Content>popover-content</Popover.Content>
      </Popover>
    </div>
  );
};

export default App;
```
