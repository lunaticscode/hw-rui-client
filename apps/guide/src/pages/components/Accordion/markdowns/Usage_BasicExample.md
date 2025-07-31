```tsx
import Accordion from "@hw-rui/accordion";
const App = () => {
  return (
    <Accordion>
      <Accordion.Trigger id="section1">Section 1</Accordion.Trigger>
      <Accordion.Region id="section1">
        <p>This is the content of Section 1.</p>
      </Accordion.Region>
      <Accordion.Trigger id="section2">Section 2</Accordion.Trigger>
      <Accordion.Region id="section2">
        <p>This is the content of Section 2.</p>
      </Accordion.Region>
    </Accordion>
  );
};

export default App;
```
