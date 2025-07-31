```tsx
import Carousel from "@hw-rui/carousel";
const App = () => {
  return (
    <Carousel>
      <Carousel.Holder>
        <Carousel.Item value={"a"}>Item-A</Carousel.Item>
        <Carousel.Item value={"b"}>Item-B</Carousel.Item>
        <Carousel.Item value={"c"}>Item-C</Carousel.Item>
      </Carousel.Holder>
      <Carousel.Navigator />
    </Carousel>
  );
};

export default App;
```
