import {
  Divider,
  Box,
  Typography,
  Button,
  styled,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";


const Slide = ({ products = [], title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const randomizedProducts = [...products].sort(() => Math.random() - 0.5);

  return (
    <Component>
      <Deal>
        <DealText>{title}</DealText>
        <ViewAllButton
          variant="contained"
          onClick={() => {
            navigate("/shop");
          }}
        >
          View All
        </ViewAllButton>
      </Deal>
      <Divider />
      {Array.isArray(products) && products.length > 0 ? (
        <div className="ml-10 mr-10">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            centerMode={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={10000}
            keyBoardControl={true}
            showDots={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {randomizedProducts.map((product, index) => {
              const firstImage = product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg';

              return (
                <Link
                  key={index}
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box textAlign="center"  style={{ padding: "25px 15px", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <Image src={firstImage} loading="lazy" alt={product.name} />
                    <TitleText style={{ fontWeight: 1000, color: "#212121" }}>
                      {product.name}
                    </TitleText>
                    <TextContainer>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 500,
                          fontStyle: "bold",
                        }}
                      >
                        ₹{(product.actualPrice * (1 - product.discountPercentage / 100)).toFixed(2)}
                      </Text>
                      <Text style={{ color: "gray",fontSize: "0.6rem", textDecoration: "line-through" }}>
                        ₹{product.actualPrice}
                      </Text>
                      <Text style={{ fontSize: "0.6rem", color: "red" }}>
                        {product.discountPercentage}% off
                      </Text>
                    </TextContainer>
                  </Box>
                </Link>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <Typography variant="h6" align="center">
          No products available
        </Typography>
      )}
    </Component>
  );
};

export default Slide;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;

const Deal = styled(Box)`
  display: flex;
  padding: 15px 20px;
`;

const DealText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  margin-right: 25px;
  color: #d72a2e;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #d72a2e;
  border-radius: 10px;
  font-size: 13px;
  &:hover {
    background-color: #b71b1e;
  }
`;

const Image = styled("img")({
  width: "15rem",
  height: "15rem",
  objectFit: "cover",
});

const TitleText = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled(Typography)`
  font-size: 14px;
  margin: 5px 10px 5px 0px;
`;

const TextContainer = styled(Container)`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;
