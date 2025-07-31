```tsx
import Carousel from "@hw-rui/carousel";
const App = () => {
  return (
    <Carousel itemsPerView={3}>
      <Carousel.Holder>
        {Array.from({ length: 10 }, (_, index) => (
          <Carousel.Item
            key={`carouse-item-key-${index}`}
            value={`item-${index}`}
          >{`carousel-item-${index}`}</Carousel.Item>
        ))}
      </Carousel.Holder>
      <Carousel.Navigator />
    </Carousel>
  );
};

export default App;
```
