```tsx
import Carousel from "@hw-rui/carousel";
import Button from "@hw-rui/button";
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
      <Carousel.Navigator>
        {(prev, next) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              columnGap: "10px",
            }}
          >
            <Button onClick={prev} variant="negative">
              {"<"}
            </Button>
            <Button onClick={next} variant="positive">
              {">"}
            </Button>
          </div>
        )}
      </Carousel.Navigator>
    </Carousel>
  );
};

export default App;
```
