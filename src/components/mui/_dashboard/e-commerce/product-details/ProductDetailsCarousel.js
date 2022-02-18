import Slider from 'react-slick';
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// redux
import { useSelector } from 'react-redux';
//
import { CarouselControlsArrowsIndex } from 'src/allTemplateComponents/carousel/controls';
import LightboxModal from '../../../LightboxModal';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled('div')(({ theme }) => ({
  '& .slick-slide': {
    float: theme.direction === 'rtl' ? 'right' : 'left',
    '&:focus': { outline: 'none' },
  },
}));

const ThumbWrapperStyle = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  width: THUMB_SIZE,
  overflow: 'hidden',
  height: THUMB_SIZE,
  position: 'relative',
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity'),
  },
  '& .isActive': {
    top: 0,
    zIndex: 9,
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 3px ${theme.palette.primary.main}`,
    backgroundColor: alpha(theme.palette.grey[900], 0.48),
  },
}));

const LargeImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const ThumbImgStyle = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.string,
  onOpenLightbox: PropTypes.func,
};

function LargeItem({ item, onOpenLightbox }) {
  return (
    <Box sx={{ cursor: 'zoom-in', paddingTop: '100%', position: 'relative' }}>
      <LargeImgStyle
        alt="large image"
        src={item}
        onClick={() => onOpenLightbox(item)}
      />
    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.string,
};

function ThumbnailItem({ item }) {
  return (
    <ThumbWrapperStyle>
      <Box className="isActive" />
      <ThumbImgStyle alt="thumb image" src={item} />
    </ThumbWrapperStyle>
  );
}

export default function ProductDetailsCarousel(props) {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const { product } = useSelector((state) => state.product);
  const carVariant = product.variant;

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [currentIndex]);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  const imgArray = [];
  const img1 =
    carVariant.car_imgSrcUrl_1 === null ? null : carVariant.car_imgSrcUrl_1;
  const img2 =
    carVariant.car_imgSrcUrl_2 === null ? null : carVariant.car_imgSrcUrl_2;
  const img3 =
    carVariant.car_imgSrcUrl_3 === null ? null : carVariant.car_imgSrcUrl_3;
  const img4 =
    carVariant.car_imgSrcUrl_4 === null ? null : carVariant.car_imgSrcUrl_4;
  const img5 =
    carVariant.car_imgSrcUrl_5 === null ? null : carVariant.car_imgSrcUrl_5;
  const img6 =
    carVariant.car_imgSrcUrl_6 === null ? null : carVariant.car_imgSrcUrl_6;

  img1 !== null && imgArray.push(img1);
  img2 !== null && imgArray.push(img2);
  img3 !== null && imgArray.push(img3);
  img4 !== null && imgArray.push(img4);
  img5 !== null && imgArray.push(img5);
  img6 !== null && imgArray.push(img6);

  const imagesLightbox = imgArray.map((_image) => _image);
  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: imgArray.length > 3 ? 3 : imgArray.length,
  };
  return (
    <RootStyle>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            zIndex: 0,
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Slider {...settings1} asNavFor={nav2} ref={slider1}>
            {imgArray.map((item) => (
              <LargeItem
                // key={item.id}
                item={item}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
            {/* {carVariant.images.map((item) => (
              <LargeItem
                key={item.id}
                item={item.url}
                onOpenLightbox={handleOpenLightbox}
              />
            ))} */}
          </Slider>
          <CarouselControlsArrowsIndex
            index={currentIndex}
            total={imgArray.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </Box>
      </Box>

      <Box
        sx={{
          my: 3,
          mx: 'auto',
          '& .slick-current .isActive': { opacity: 1 },
          ...(imgArray.length === 1 && {
            maxWidth: THUMB_SIZE * 1 + 16,
          }),

          ...(imgArray.length === 2 && {
            maxWidth: THUMB_SIZE * 2 + 32,
          }),
          ...(imgArray.length === 3 && {
            maxWidth: THUMB_SIZE * 3 + 48,
          }),
          // ...(carVariant.images.length === 4 && {
          //   maxWidth: THUMB_SIZE * 3 + 48,
          // }),
          // ...(carVariant.images.length >= 5 && {
          //   maxWidth: THUMB_SIZE * 6,
          // }),

          ...(imgArray.length > 2 && {
            position: 'relative',
            '&:before, &:after': {
              top: 0,
              zIndex: 9,
              content: "''",
              height: '100%',
              position: 'absolute',
              width: (THUMB_SIZE * 2) / 3,
              backgroundImage: (theme) =>
                `linear-gradient(to left, ${alpha(
                  theme.palette.background.paper,
                  0
                )} 0%, ${theme.palette.background.paper} 100%)`,
            },
            '&:after': { right: 0, transform: 'scaleX(-1)' },
          }),
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {imgArray.map((item) => (
            <ThumbnailItem
              // key={item.id}
              item={item}
            />
          ))}
          {/* {carVariant.images.map((item) => (
            <ThumbnailItem key={item.id} item={item.url} />
          ))} */}
        </Slider>
      </Box>

      <LightboxModal
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </RootStyle>
  );
}
